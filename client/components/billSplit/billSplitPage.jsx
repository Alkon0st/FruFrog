import { View, Text, TouchableOpacity } from "react-native";
import styles from "./billSplitPage.style";
import Bill from './bill';
import AddBillModal from './addBillModal';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderNav from '../nav/HeaderNav';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getSelectedPond } from './getSelectedPond';
import { getAuth } from 'firebase/auth';

// Main Bill Split Page
const BillSplitPage = () => {
    const [bills, setBills] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
  
    useEffect(() => {
      const fetchBills = async () => {
        try {
          const user = getAuth().currentUser;
          if (!user) return;
          const pond = await getSelectedPond(user.uid);
          if (!pond) return;
          const q = query(collection(db, `ponds/${pond.id}/bills`), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q)
          const billsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          setBills(billsData)
        } catch (err) {
          console.error('Failed to fetch bills:', err)
        }
      }
    
      fetchBills()
    }, []);

    const addBill = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) return;
        const pond = await getSelectedPond(user.uid);
        if (!pond) return;
    
        const q = query(collection(db, `ponds/${pond.id}/bills`), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const billsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBills(billsData);
      } catch (err) {
        console.error('Failed to refresh bills after add:', err);
      }
      setModalVisible(false);
    };

    console.log(bills)
    return (
        // Page Container
        <LinearGradient colors={['#FFFFFF', '#d6faf9']}>
        <View style={styles.page}>
        <View style={styles.pageContainer}>
        <HeaderNav />

        {/* Header */}
        <View style={styles.billHeader}>
            {/* Title */}
            <View>
            <Text style={styles.billHeaderTitle}>Bills</Text>
            </View>
            {/* Add Bill Button */}
            <View>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <AddBillModal visible={modalVisible} onSubmit={addBill} onClose={() => setModalVisible(false)} />
            <Text style={styles.addButtonSubtext}>Add Bill</Text>
            </View>
        </View>

        {/* Bill Listing */}
        <View style={styles.billList}>
            {bills.map((bill, index) => (
            <Bill key={index} {...bill} />
            ))}
        </View>
        
        </View>
        </View>
        </LinearGradient>
    )
}

export default BillSplitPage;
