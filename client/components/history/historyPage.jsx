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

function HistoryData() {
    const [userBills, setUserBills] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [amountFilter, setAmountFilter] = useState('All');
    const [editingId, setEditingId] = useState(null);
    const [editAmountOwe, setEditAmountOwe] = useState("");
    const [editAmountTotal, setEditAmountTotal] = useState("");
    const [editTitle, setEditTitle] = useState("");
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
                const inEven = bill.split?.some(m => m.uid === user.uid);
                return inCustom || inEven;
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
            await updateDoc(billRef, {
                title: editTitle || userBills.find(b => b.id === billId).title,
                paid: editAmountOwe || userBills.find(b => b.id === billId).paid,
                total: editAmountTotal || userBills.find(b => b.id === billId).total,
            });
            setEditingId(null);
            setEditAmountOwe("");
            setEditAmountTotal("");
            setEditTitle("");
            fetchExpenseData(); // Refresh data
        } catch (error) {
            console.error("Error saving edits:", error);
        }
    };

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors={['#F1FEFE', '#B2F0EF']} style={{ flex: 1 }}>
        <ScrollView style={{display: 'flex'}}>
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
                <TouchableOpacity onPress={() => {
                    setAmountFilter(prev => {
                        const options = ['All', '$0-99', '$100-499', '$500-749', '$750-999', '>$1000'];
                        const currentIndex = options.indexOf(prev);
                        return options[(currentIndex + 1) % options.length];
                    });
                }}>
                    <Text style={styles.chevron}>▼</Text>
                </TouchableOpacity>
                <Text style={styles.headBannerTitle}>My Bill History</Text>
            </View>
            {dates.map(date => (
                <View key={date} style={styles.subBanner}>
                    <Text style={styles.dateText}>{date}</Text>
                    {filteredData.filter(item => item.date === date).map(bill => (
                        <Bill
                            key={bill.id}
                            title={editingId === bill.id ? (editTitle || bill.title) : bill.title}
                            date={bill.date}
                            paid={editingId === bill.id ? (editAmountOwe || bill.paid) : bill.paid}
                            total={editingId === bill.id ? (editAmountTotal || bill.total) : bill.total}
                            split={bill.split}
                            paidBy={bill.paidBy || []}
                            id={bill.id}
                            pondId={bill.pondId}
                            isEditing={editingId === bill.id}
                            onEdit={() => {
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
                            onSave={() => saveEdits(bill.id, bill.pondId)}
                            onMarkAsPaid={() => markAsPaid(bill.id, bill.pondId)}
                            navigation={navigation}
                        />
                    ))}
                </View>
            ))}
        </ScrollView>
        <TouchableOpacity
            style={styles.addEventButton}
            onPress={() => setModalVisible(true)}
        >
            <Text style={styles.addEventButtonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.addEventButtonSubtext}>Add Event</Text>
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
};
export default HistoryData;