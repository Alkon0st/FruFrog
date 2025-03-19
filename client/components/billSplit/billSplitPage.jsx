import { View, Text, TouchableOpacity } from "react-native";
import styles from "./billSplitPage.style";
import Bill from './bill';
import AddBillModal from './addBillModal';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// Main Bill Split Page
const BillSplitPage = () => {
    // Functions
    // Add Bill Button Modal
    const [modalVisible, setModalVisible] = useState(false);
    //  Default Bills List
    const [bills, setBills] = useState([
        { title: "Foo Rent", date: 'March 01, 2025', paid: 0, total: 56.67 },
      ]);

    // Variables
    const addBill = (newBill) => {
        setBills([newBill, ...bills]);
        setModalVisible(false);
      };

    return (
        // Page Container
        <LinearGradient colors={['#FFFFFF', '#d6faf9']}>
        <View style={styles.page}>
        <View style={styles.pageContainer}>

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
