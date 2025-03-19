import { View, Text, TouchableOpacity } from "react-native";
import styles from "./billSplitPage.style";
import Bill from './bill';
import AddBillModal from './addBillModal';
import React, { useState } from 'react';

const BillSplitPage = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.page}>
        <View style={styles.pageContainer}>

        <View style={styles.billHeader}>
            <View>
            <Text style={styles.billHeaderTitle}>Bills</Text>
            </View>

            <View>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <AddBillModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            <Text style={styles.addButtonSubtext}>Add Bill</Text>
            </View>
        </View>
            

        <View style={styles.billList}>
            <Bill title="Bill 1" date="01/01/2021" paid="Paid" total="$100"/>
            <Bill title="Bill 2" date="02/01/2021" paid="Not Paid" total="$200"/>
            <Bill title="Bill 3" date="03/01/2021" paid="Paid" total="$300"/>
            <Bill title="Bill 4" date="03/01/2021" paid="Paid" total="$300"/>
            <Bill title="Bill 5" date="03/01/2021" paid="Paid" total="$300"/>
            <Bill title="Bill 6" date="03/01/2021" paid="Paid" total="$300"/>
        </View>
        
        </View>
        </View>
    )
}

export default BillSplitPage;
