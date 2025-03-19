import React from 'react';
import styles from "./billSplitPage.style";
import { View, Text } from 'react-native';

// Bill Component
const Bill = ({ title, date, paid, total }) => {
  return (
    <View style={styles.billContainer}>
      <View style={styles.billTitleSection}>
        <text style={styles.billTitle}>{title}</text>
        <Text style={styles.billDate}>{date}</Text>
      </View>

      <View style={styles.billPaidSection}>
        <Text style={styles.billPaid}>{paid}</Text>
      </View>

      <View style={styles.billMembersSection}>
        <Text style={styles.billMembers}>1 2 3</Text>
      </View>
      
      <View style={styles.billTotalSection}>
        <Text style={styles.billTotal}>{total}</Text>
      </View>
    </View>
  );
};

export default Bill;
