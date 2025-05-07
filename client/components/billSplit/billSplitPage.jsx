import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { collection, query, orderBy, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import HeaderNav from '../nav/HeaderNav';
import Bill from './bill';
import AddBillModal from './addBillModal';
import styles from './billSplitPage.style';

const BillSplitPage = () => {
  const [bills, setBills] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPondId, setCurrentPondId] = useState(null);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;

    const unsub = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (!docSnap.exists()) return;
      const data = docSnap.data();
      const newPondId = data.currentPondId;

      if (newPondId && newPondId !== currentPondId) {
        setCurrentPondId(newPondId);
      }
    });

    return () => unsub();
  }, []); // Only runs once on mount

  useEffect(() => {
    if (!currentPondId) return;

    const q = query(
      collection(db, `ponds/${currentPondId}/bills`),
      orderBy('createdAt', 'desc')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const billsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBills(billsData);
    });

    return () => unsub();
  }, [currentPondId]);

  const addBill = () => {
    setModalVisible(false); // Live listener handles the rest
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
              bills.map((bill) => (
                <Bill key={bill.id} {...bill} id={bill.id} pondId={currentPondId} />
              ))
            ) : (
              <Text>No bills yet</Text>
            )}
          </View>

          <AddBillModal
            visible={modalVisible}
            onSubmit={addBill}
            onClose={() => setModalVisible(false)}
            pondId={currentPondId}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BillSplitPage;