import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, orderBy, doc, onSnapshot  } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getSelectedPond } from './getSelectedPond';

import HeaderNav from '../nav/HeaderNav';
import Bill from './bill';
import AddBillModal from './addBillModal';
import styles from './billSplitPage.style';

const BillSplitPage = () => {
  const [bills, setBills] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPondId, setCurrentPondId] = useState(null);

  const fetchBills = async () => {
    try {
      const user = getAuth().currentUser;
      if (!user) return;
      const pond = await getSelectedPond(user.uid);
      if (!pond) return;

      setCurrentPondId(pond.id);

      const q = query(collection(db, `ponds/${pond.id}/bills`), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const billsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBills(billsData);
    } catch (err) {
      console.error('Failed to fetch bills:', err);
    }
  };

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;
  
    const unsub = onSnapshot(doc(db, "users", user.uid), async (docSnap) => {
      if (!docSnap.exists()) return;
      const data = docSnap.data();
      const newPondId = data.currentPondId;
  
      if (newPondId && newPondId !== currentPondId) {
        await fetchBills();
      }
    });
  
    return () => unsub();
  }, [currentPondId]);

  const addBill = async () => {
    await fetchBills();
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#F1FEFE', '#B2F0EF']} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <HeaderNav />

          {/* Header */}
          <View style={styles.billHeader}>
            <Text style={styles.billHeaderTitle}>Bills</Text>
            <View>
              <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.addButtonSubtext}>Add Bill</Text>
            </View>
          </View>

          {/* Bill List */}
          <View style={styles.billList}>
            {bills.length > 0 ? (
              bills.map((bill, index) => <Bill key={index} {...bill} />)
            ) : (
              <Text>No bills yet</Text>
            )}
          </View>

          <AddBillModal visible={modalVisible} onSubmit={addBill} onClose={() => setModalVisible(false)} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BillSplitPage;
