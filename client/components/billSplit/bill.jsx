import React from 'react';
import styles from "./billSplitPage.style";
import { View, Text, StyleSheet } from 'react-native';

const Bill = ({ title, date, paid, total }) => {
  return (
    <View style={styles.billContainer}>
      <Text style={styles.billTitle}>{title}</Text>
      <Text style={styles.billDate}>{date}</Text>
      <Text style={styles.billPaid}>{paid}</Text>
      <Text style={styles.billTotal}>{total}</Text>
    </View>
  );
};

export default Bill;