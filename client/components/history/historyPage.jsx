import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import styles from "./historyPage.style";
import HeaderNav from '../nav/HeaderNav';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";

const HistoryData = () => {
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editAmount, setEditAmount] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                // Firestore: Budgets
                const q = query(collection(db, "events"), where("user_uid", '==', user.uid));
                const response = await getDocs(q);
                const firestoreData = response.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setExpenseData(firestoreData);
                setCategories(firestoreData.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index));
            } catch (error) {
                console.error("Error fetching merged data:", error);
            }
        };

        fetchExpenseData();
    }, []);



    const filteredData = expenseData.filter(item => {
        const matchesSearch = 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEdit = async (item) => {
        try {
            const updated = parseFloat(editAmount);
            if (isNaN(updated)) return;

            if (item.source === "api") {
                await fetch(`http://localhost:5000/api/bills/${item.fullBill._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        { ...item.fullBill, 
                            total: updated }),
                });
            }

            const newData = expenseData.map(expense => {
                if (expense.id === item.id) {
                    return { ...expense, amount: updated };
                }
                return expense;
            });
            setExpenseData(newData);
            setEditAmount("");
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };
        


    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.expenseRow}>
                <Icon name={item.icon} size={20} color="#008000" style={styles.icon} />
                <View style={styles.expenseDetails}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                    <Text style={styles.nameText}>{item.name}</Text>
                    
                    <TouchableOpacity
                        style={styles.buttonText}
                        onPress={() => navigation.navigate('BillSplit', { bill: item.fullBill})}
                    >
                        <Text style={styles.buttonTextStyle}>View Bill</Text>
                    </TouchableOpacity>
                </View>
                
                {editingId === item.id ? (
                    <TextInput
                        style={{ width: 60, backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, padding: 5 }}
                        keyboardType="numeric"
                        value={editAmount}
                        onChangeText={setEditAmount}
                        onBlur={() => handleEdit(item)}
                    />
                ) : (
                    <TouchableOpacity onLongPress={() => {
                        setEditingId(item.id);
                        setEditAmount(item.amount.toString());
                    }}>
                        <Text style={styles.amountText}>${item.amount}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <LinearGradient
            locations={[0, 0.47, 1]}
            colors={['#F1FFFF', '#FEFFF5', '#B1F1EF']}
            style={styles.LinearGradient}
        >
            <HeaderNav navigation={navigation} title="History" />
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Expense Records</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Keywords Here..."
                    placeholderTextColor="#A9A9A9"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                {categories.map(category => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.filterButton,
                            selectedCategory === category && styles.filterButtonActive
                        ]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={[
                            styles.filterText,
                            selectedCategory === category && styles.filterTextActive
                        ]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* History List */}
            <ScrollView style={styles.scrollView}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>January 2025</Text>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                />
            </ScrollView>
        </LinearGradient>
    );
};
export default HistoryData;