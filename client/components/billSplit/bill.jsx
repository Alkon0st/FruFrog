import React from 'react';
import styles from "./bill.style";
import { View, Text } from 'react-native';

// Bill Component
const Bill = ({ title, date, paid, total }) => {
  return (
    <View style={styles.billContainer}>
      <View style={styles.billTitleSection}>
        <Text style={styles.billTitle}>{title}</Text>
        <Text style={styles.billDate}>{date}</Text>
      </View>

      <View style={styles.billPaidSection}>
        <Text style={styles.billPaid}>${paid}</Text>
        <Text style={styles.billPercent}>{Math.round((parseFloat(paid) / parseFloat(total)) * 100)}% Paid</Text>
      </View>

      <View style={{
        borderBottomWidth: 1,
        width: '100%',
        borderColor: '#9e9e9e',
        marginBottom: 10,
      }} />

      <View style={styles.billMembersSection}>
        <Text style={styles.billMembers}>O O O O</Text>
      </View>
      
      <View style={styles.billTotalSection}>
        <Text style={styles.billTotal}>Total: ${total}</Text>
      </View>
    </View>
  );
};

export default Bill;
