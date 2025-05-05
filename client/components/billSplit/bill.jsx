import React from 'react';
import styles from "./bill.style";
import { View, Text } from 'react-native';

// Bill Component
const Bill = ({ title, date, paid, total, customSplit, members }) => {
  const renderMembers = () => {
    if (customSplit && customSplit.length > 0) {
      return customSplit.map(member => (
        <Text key={member.uid} style={styles.billMembers}>
          {member.uid}: {member.percent}%
        </Text>
      ));
    } else if (members && members.length > 0) {
      const evenPercent = (100 / members.length).toFixed(2);
      return members.map(uid => (
        <Text key={uid} style={styles.billMembers}>
          {uid}: {evenPercent}%
        </Text>
      ));
    } else {
      return <Text style={styles.billMembers}>Evenly split</Text>;
    }
  };

  return (
    <View style={styles.billContainer}>
      {/* Existing bill UI */}
      <View style={styles.billTitleSection}>
        <Text style={styles.billTitle}>{title}</Text>
        <Text style={styles.billDate}>{date}</Text>
      </View>

      <View style={styles.billPaidSection}>
        <Text style={styles.billPaid}>${paid}</Text>
        <Text style={styles.billPercent}>
          {Math.round((parseFloat(paid) / parseFloat(total)) * 100)}% Paid
        </Text>
      </View>

      <View style={{
        borderBottomWidth: 1,
        width: '100%',
        borderColor: '#9e9e9e',
        marginBottom: 10,
      }} />

      <View style={styles.billMembersSection}>
        {renderMembers()}
      </View>

      <View style={styles.billTotalSection}>
        <Text style={styles.billTotal}>Total: ${total}</Text>
      </View>
    </View>
  );
};

export default Bill;