import { Text, TextInput, ScrollView, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { getDocs, collectionGroup, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import Bill from "../billSplit/bill";
import styles from "./historyPage.style";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNav from "../nav/HeaderNav";
import AddEventModal from "./addEventModal";
import { parse } from "@babel/core";

function HistoryData() {
    const [userBills, setUserBills] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [amountFilter, setAmountFilter] = useState('All');
    const [filterVisible, setFilterVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editAmountOwe, setEditAmountOwe] = useState("");
    const [editAmountTotal, setEditAmountTotal] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const fetchExpenseData = async () => {
        try {
            const user = getAuth().currentUser;
            if (!user) return;

            const billsRef = await getDocs(collectionGroup(db, "bills"));
            const allBills = billsRef.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const userRelatedBills = allBills.filter(bill => {
                const inCustom = bill.split?.some(m => m.uid === user.uid);
                return inCustom;
            });
            setUserBills(userRelatedBills);
        } catch (error) {
            console.error("Error fetching merged data:", error);
        }
    };

    useEffect(() => {
        fetchExpenseData();
    }, []);

    const filteredData = userBills.filter(item => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchQuery.toLowerCase());
        const amount = parseFloat(item.paid) || 0;
        const matchesAmount = amountFilter === 'All' ||
            (amountFilter === '$0-99' && amount >= 0 && amount <= 99) ||
            (amountFilter === '$100-499' && amount >= 100 && amount <= 499) ||
            (amountFilter === '$500-749' && amount >= 500 && amount <= 749) ||
            (amountFilter === '$750-999' && amount >= 750 && amount <= 999) ||
            (amountFilter === '>$1000' && amount > 1000);
        return matchesSearch && matchesAmount;
    });

    const dates = [...new Set(filteredData.map(item => item.date))].sort((a, b) => new Date(b) - new Date(a));

    const markAsPaid = async (billId, pondId) => {
        const user = getAuth().currentUser;
        if (!user) return;

        try {
            await updateDoc(doc(db, `ponds/${pondId}/bills`, billId), {
                paidBy: arrayUnion(user.uid),
            });
            setUserBills(prevBills => prevBills.filter(bill => bill.id !== billId));
        } catch (error) {
            console.error("Error marking as paid:", error);
        }
    };

    const saveEdits = async (billId, pondId) => {
        const user = getAuth().currentUser;
        if (!user) return;

        try {
            const billRef = doc(db, `ponds/${pondId}/bills`, billId);
            const currentBill = userBills.find(b => b.id === billId);
            if (!currentBill) {
                console.error("Current bill not found for ID:", billId);
                return;
            }

            const updatedTitle = editTitle || currentBill.title;
            const newPaid = editAmountOwe ? parseFloat(editAmountOwe) : parseFloat(currentBill.paid);
            const newTotal = editAmountTotal ? parseFloat(editAmountTotal) : parseFloat(currentBill.total);

            if (isNaN(newPaid) || isNaN(newTotal)) {
                console.error("Invalid number for paid or total:", { newPaid, newTotal });
                return;
            }

            const updatedData = {
                title: updatedTitle,
                paid: newPaid,
                total: newTotal,
            };

            // Only update split if it exists and matches the expected structure
            if (currentBill.split && Array.isArray(currentBill.split)) {
                updatedData.split = currentBill.split.map(m => 
                    m.uid === user.uid ? { ...m, percent: 100 } : m
                );
            }

            console.log("Updating document with:", updatedData); // Debug log
            await updateDoc(billRef, updatedData);
            setEditingId(null);
            setEditAmountOwe("");
            setEditAmountTotal("");
            setEditTitle("");
            await fetchExpenseData();
            console.log("Document updated successfully");
        } catch (error) {
            console.error("Error saving edits:", error);
        }
        
    };

    return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={['#F1FEFE', '#B2F0EF']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            <HeaderNav />

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.headBanner}>
                <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)}>
                    <Text style={styles.chevron}>▼</Text>
                    <Text style={styles.filterText}>Amount</Text>
                </TouchableOpacity>
                <Text style={styles.headBannerTitle}>My Bill History</Text>
            </View>
            {filterVisible && (
                <View style={styles.filterDropdown}>
                    {["All", "$0-99", "$100-499", "$500-749", "$750-999", ">$1000"].map((range) => (
                        <TouchableOpacity key={range} onPress={() => {
                            setAmountFilter(range);
                            setFilterVisible(false);
                        }}>
                            <Text style={styles.filterText}>{range}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {dates.map(date => (
                <View key={date}>
                    <View style={styles.subBanner}>
                        <Text style={styles.dateText}>{date}</Text>
                        <TouchableOpacity
                            style={styles.buttonText}
                            onPress={() => navigation.navigate('BillSplit')}
                        >
                            <Text style={styles.buttonTextStyle}>View Bill</Text>
                        </TouchableOpacity>
                    </View>

                    {filteredData.filter(item => item.date === date).map(bill => (
                        <View key={bill.id}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => {
                                    if (editingId === bill.id) {
                                        setEditingId(null);
                                        setEditAmountOwe("");
                                        setEditAmountTotal("");
                                        setEditTitle("");
                                    } else {
                                        setEditingId(bill.id);
                                        setEditTitle(bill.title);
                                        setEditAmountOwe(bill.paid.toString());
                                        setEditAmountTotal(bill.total.toString());
                                    }
                                }}
                            >
                                <Text style={styles.editButtonText}>Edit</Text>
                            </TouchableOpacity>

                            {editingId === bill.id ? (
                                <View style={styles.expenseRow}>
                                    <TextInput
                                        style={styles.editTitle}
                                        value={editTitle}
                                        onChangeText={setEditTitle}
                                    />
                                    <View style={styles.amountContainer}>
                                        <Text style={styles.amountText}>You Owe: $</Text>
                                        <TextInput
                                            style={styles.editAmount}
                                            value={editAmountOwe}
                                            onChangeText={setEditAmountOwe}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <View style={styles.amountContainer}>
                                        <Text style={styles.amountText}>Total: $</Text>
                                        <TextInput
                                            style={styles.editAmount}
                                            value={editAmountTotal}
                                            onChangeText={setEditAmountTotal}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={styles.saveButton}
                                        onPress={() => saveEdits(bill.id, bill.pondId)}
                                    >
                                        <Text style={styles.editButtonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.markAsPaidButton}
                                        onPress={() => markAsPaid(bill.id, bill.pondId)}
                                    >
                                        <Text style={styles.markAsPaidText}>Mark as Paid</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <Bill
                                    title={bill.title}
                                    date={bill.date}
                                    paid={bill.paid}
                                    total={bill.total}
                                    split={bill.split}
                                    paidBy={bill.paidBy || []}
                                    id={bill.id}
                                    pondId={bill.pondId}
                                    navigation={navigation}
                                />
                            )}
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>

        <TouchableOpacity
            style={styles.addEventButton}
            onPress={() => setModalVisible(true)}
        >
            <Text style={styles.addEventButtonText}>+</Text>
            <Text style={styles.addEventButtonSubtext}>New Event</Text>
        </TouchableOpacity>
        
        <AddEventModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={fetchExpenseData}
            pondId={userBills[0]?.pondId}
        />
        </LinearGradient>
        </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default HistoryData;