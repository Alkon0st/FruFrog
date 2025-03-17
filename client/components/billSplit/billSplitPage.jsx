import { View, Text, Button, TouchableOpacity } from "react-native";
import styles from "./billSplitPage.style";
import Bill from './bill';
import AddBillModal from './addBillModal';
import React, { useState } from 'react';

const BillSplitPage = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.pageContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+ Add Bill</Text>
            </TouchableOpacity>
            <AddBillModal visible={modalVisible} onClose={() => setModalVisible(false)} />

            <Bill title="Bill 1" date="01/01/2021" paid="Paid" total="$100"/>
            <Bill title="Bill 2" date="02/01/2021" paid="Not Paid" total="$200"/>
            <Bill title="Bill 3" date="03/01/2021" paid="Paid" total="$300"/>
        </View>
    )
}

export default BillSplitPage;