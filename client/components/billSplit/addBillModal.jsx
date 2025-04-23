import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Bill Modal Component
const AddBillModal = ({ visible, onSubmit, onClose }) => {
  useEffect(() => {
    if (visible) {
      const today = new Date();
      const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
      const day = String(today.getDate()).padStart(2, '0');
      const month = months[today.getMonth()];
      const year = today.getFullYear();
      const formattedDate = `${month} ${day}, ${year}`;
      setBillDate(formattedDate);
    }
  }, [visible]);

  // Bill values
  const [billDate, setBillDate] = React.useState('');
  const [category, setCategory] = useState('Rent');
  const [billTitle, setBillTitle] = React.useState('');
  const [billAmount, setBillAmount] = React.useState('');
  const [billTax, setBillTax] = useState('');

  // Tax split switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  // Reset fields after create bill
  const resetFields = () => {
    setBillTitle('');
    setBillAmount('');
    setBillTax('');
    setCategory('Rent');
    setIsEnabled(false);
  };

  // Even split and create bill
  const handleEvenSplit = async () => {
    const amount = parseFloat(billAmount) || 0;
    const tax = parseFloat(billTax) || 0;
    const members = 2;
  
    const total = isEnabled ? amount + tax : amount;
    const splitAmount = total / members;
    const percentPaid = amount / total;
  
    const bill = {
      title: billTitle,
      date: billDate,
      category,
      amount,
      tax,
      splitTax: isEnabled,
      members,
      paid: splitAmount.toFixed(2),
      percentPaid: percentPaid.toFixed(2),
      total: total.toFixed(2),
    };

    try {
      const response = await fetch('http://localhost:5000/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bill),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        onSubmit && onSubmit(data.bill);
        resetFields();
        onClose();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {/* Main Section */}
        <View style={styles.inputContainer}>
          {/* Date */}
          <View style={styles.dateSection}>
          <Text style={styles.date}>{billDate}</Text>
          </View>
          {/* TODO: Stylize category dropdown /*}
          {/* Category */}
          <View style={styles.categorySection}>
            <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
              <Picker.Item label="Rent" value="Rent" />
              <Picker.Item label="Food" value="Food" />
              <Picker.Item label="Utilities" value="Utilities" />
              <Picker.Item label="Entertainment" value="Entertainment" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>
          {/* Title */}
          <TextInput
            style={styles.titleInput}
            placeholder="Title here..."
            value={billTitle}
            onChangeText={setBillTitle}
          />
          {/* TODO: Implement members /*}
          {/* Members */}
          <View style={styles.membersSection}>
          <Text>O O O O</Text>
          </View>
          {/* Total */}
          <View style={{flexDirection: 'row'}}>
          <Text>Total: $</Text>
          <TextInput
            style={styles.totalInput}
            value={billAmount}
            onChangeText={setBillAmount}
            keyboardType="numeric"
          />
          </View>
          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Custom Split</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEvenSplit} style={styles.button}>
            <Text style={styles.buttonText}>Even Split</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TODO: Implement tax section /*}
        {/* Tax Section */}
        <View style={styles.taxContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'white'}}>$</Text>
          <TextInput
            style={styles.taxInput}
            value={billTax}
            onChangeText={setBillTax}
            keyboardType="numeric"
          />
          </View>
          <Text style={styles.taxText}>Split Tax</Text>
          <Switch
            trackColor={{ false: '#ffffff', true: '#ffffff' }}
            thumbColor={isEnabled ? '#4f723a' : '#4f723a'}
            value={isEnabled}
            onValueChange={toggleSwitch}
          />
        </View>
      </View>
    </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#4f723a',
    borderRadius: 10,
    flexDirection: 'row',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  categorySection: {
    alignItems: 'left',
    marginBottom: 10,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  date: {
    color: '#989898',
  },
  titleInput: {
    marginBottom: 5,
    placeholderTextColor: 'cecece',
    backgroundColor: '#f4f4f4',
    fontSize: 13,
    borderRadius: 5,
    padding: 5,
    width: '75%',
  },
  totalInput: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 10,
    placeholderTextColor: 'cecece',
    width: '20%',
    marginBottom: 10,
  },
  taxInput: {
    borderBottomWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    width: 35,
    color: 'white',
  },
  membersSection: {
    backgroundColor: '#b2e196',
    marginBottom: 10,
    height: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  button: {
    backgroundColor: "#85bb65",
    borderColor: "#4f723a",
    borderWidth: 2,
    borderRadius: 8,
    padding: 1,
  },
  buttonText: {
    color: 'white',
  },
  taxContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taxText: {
    color: 'white',
  },
});

export default AddBillModal;
