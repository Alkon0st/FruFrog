import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Bill Modal Component
const AddBillModal = ({ visible, onSubmit, onClose }) => {
  const [billCategory, setBillCategory] = React.useState('');
  const [billTitle, setBillTitle] = React.useState('');
  const [billDate, setBillDate] = React.useState('');
  const [billPaid, setBillPaid] = React.useState('');
  const [billTotal, setBillTotal] = React.useState('');
  const [category, setCategory] = useState('Rent');

  const handleSubmit = () => {
    if (!billTitle || !billDate || !billTotal) return;

    const newBill = {
      title: billTitle,
      date: billDate,
      paid: parseFloat(billPaid) || 0,
      total: parseFloat(billTotal),
    };

    onSubmit(newBill);
    setBillCategory('');
    setBillTitle('');
    setBillDate('');
    setBillPaid('');
    setBillTotal('');
    setCategory('Rent');
  }

  useEffect(() => {
    if (visible) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setBillDate(formattedDate);
    }
  }, [visible]);

  return (
    <View style={styles.modalBackground}>
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
          {/* TODO: Stylize category dropdown /*}
          {/* Category */}
          <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
            <Picker.Item label="Rent" value="Rent" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Utilities" value="Utilities" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
          {/* Title */}
          <TextInput
            style={styles.input}
            placeholder="Title here..."
            value={billTitle}
            onChangeText={setBillTitle}
          />
          {/* Date */}
          <View style={styles.dateSection}>
          <Text style={styles.date}>{billDate}</Text>
          </View>
          {/* TODO: Implement members /*}
          {/* Members */}
          <View style={styles.membersSection}>
          <Text>O O O O</Text>
          </View>
          {/* Total */}
          <View style={{flexDirection: 'row'}}>
          <Text>Total: $</Text>
          <TextInput
            style={styles.input}
            value={billTotal}
            onChangeText={setBillTotal}
            keyboardType="numeric"
          />
          </View>
          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Custom Split</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Even Split</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* TODO: Implement tax section /*}
        {/* Tax Section */}
        <View style={styles.taxContainer}>
        <Text>Tax</Text>
        </View> 
      </View>
    </View>

    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#4f723a',
    width: '25%',
    borderRadius: 10,
    flexDirection: 'row',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'left',
    padding: 10,
    position: 'relative',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 10,
    placeholderTextColor: 'cecece',
    backgroundColor: '#f4f4f4',
  },
  dateSection: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  date: {
    color: '#989898',
  },
  membersSection: {
    backgroundColor: '#b2e196',
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default AddBillModal;
