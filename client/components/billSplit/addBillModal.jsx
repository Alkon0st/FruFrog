import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { getSelectedPond } from './getSelectedPond';


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

  // Reset fields after create bill
  const resetFields = () => {
    setBillTitle('');
    setBillAmount('');
    setCategory('Rent');
  };

  // Even split and create bill
  const handleAddBill = async () => {
    const amount = parseFloat(billAmount) || 0
    const members = 2
  
    const total = amount
    const splitAmount = total / members
    const percentPaid = amount / total
  
    const bill = {
      title: billTitle,
      date: billDate,
      category,
      amount,
      members,
      paid: splitAmount.toFixed(2),
      percentPaid: percentPaid.toFixed(2),
      total: total.toFixed(2),
      createdAt: new Date()
    }
  
    try {
      const user = getAuth().currentUser;
      if (!user) return;
      const pond = await getSelectedPond(user.uid);
      if (!pond) return;
      await addDoc(collection(db, `ponds/${pond.id}/bills`), bill);
      onSubmit && onSubmit(bill)
      resetFields()
      onClose()
    } catch (error) {
      console.error('Error adding bill:', error)
      alert('Failed to add bill.')
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
            <TouchableOpacity onPress={handleAddBill} style={styles.button}>
            <Text style={styles.buttonText}>Add Bill</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{color: 'white'}}>✖</Text>
        </TouchableOpacity>
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
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  }
});

export default AddBillModal;
