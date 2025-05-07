import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {getDocs, collectionGroup} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import Bill from "../billSplit/bill";

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

        <ScrollView style={{padding:20}}>
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
    );
};
export default HistoryData;