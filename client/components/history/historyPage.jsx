import { Text, ScrollView, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {getDocs, collectionGroup} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import Bill from "../billSplit/bill";

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNav from "../nav/HeaderNav";


function HistoryData() {
    const [userBills, setUserBills] = useState([]);
    //const [expenseData, setExpenseData] = useState([]);
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
                    const inCustom = bill.split?.some(m => m.uid === user.uid);
                    const inEven = bill.split?.some(m => m.uid === user.uid);
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

        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors = {['#F1FEFE', '#B2F0EF']} style={{ flex: 1 }}>
        <ScrollView style={{display: 'flex'}}>
            <HeaderNav /> 
            {/* History List */}
            <Text style={{fontSize: 24, marginBottom: 10}}>My Bill History</Text>
            {userBills.length > 0 ? (
                userBills.map(bill=> (
                    <Bill key={bill.id} {...bill} />
                ))
            ) : (
                <Text>No bills found</Text>
            )}
        </ScrollView>
        </LinearGradient>
        </SafeAreaView>
        </SafeAreaProvider>
    );
};
export default HistoryData;