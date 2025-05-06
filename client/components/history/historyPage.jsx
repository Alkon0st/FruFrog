import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import styles from "./historyPage.style";
import HeaderNav from '../nav/HeaderNav';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, query, where, getDocs, collectionGroup} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import Bill from "../billSplit/bill";

function HistoryData() {
    const [userBills, setUserBills] = useState([]);
    //const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    //const [editingId, setEditingId] = useState(null);
    //const [editAmount, setEditAmount] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const user = getAuth().currentUser;
                if (!user) return;
                
                const billsRef = await getDocs(collectionGroup(db, "bills"));
                //const allBills = query(billsRef, where("user_uid", '==', user.uid));

                const allBills = billsRef.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const userRelatedBills = allBills.filter(bill => {
                    const inCustom = bill.customSplit?.some(m => m.uid === user.uid);
                    const inEven = bill.customSplit?.includes(user.uid);
                    return inCustom || inEven;
                });
                setUserBills(userRelatedBills);
            } catch (error) {
                console.error("Error fetching merged data:", error);
            }
        };

        fetchExpenseData();
    }, []);



    

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
            <ScrollView style={{padding:20}}>
                <Text style={{fontSize: 24, marginBottom: 10}}>Bill History</Text>
                {userBills.length > 0 ? (
                    userBills.map(bill=> (
                        <Bill key={bill.id} {...bill} />
                    ))
                ) : (
                    <Text>No bills found</Text>
                )}
            </ScrollView>
        </LinearGradient>
    );
};
export default HistoryData;