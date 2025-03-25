import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Bill Modal Component
const AddBillModal = ({ visible, onSubmit, onClose }) => {
  const [billTitle, setBillTitle] = React.useState('');
  const [billDate, setBillDate] = React.useState('');
  const [billPaid, setBillPaid] = React.useState('');
  const [billTotal, setBillTotal] = React.useState('');
  const [category, setCategory] = useState('Rent');
  const [tax, setTax] = useState('0');

  const handleSubmit = () => {
    if (!billTitle || !billDate || !billTotal) return;

    const newBill = {
      title: billTitle,
      date: billDate,
      paid: parseFloat(billPaid) || 0,
      total: parseFloat(billTotal),
      tax: parseFloat(tax),
    };

    onSubmit(newBill);
    setBillCategory('');
    setBillTitle('');
    setBillDate('');
    setBillPaid('');
    setBillTotal('');
    setCategory('Rent');
    setBillDate('');
  }

  useEffect(() => {
    if (visible) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setBillDate(formattedDate);
    }
  }, [visible]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

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
            style={styles.totalInput}
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
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'white'}}>$</Text>
          {/* <TextInput
            style={styles.taxInput}
            value={tax}
            onChangeText={setTax}
            keyboardType="numeric"
          /> */}
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
    padding: 10,
  },
  dateSection: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  date: {
    color: '#989898',
  },
  titleInput: {
    marginBottom: 10,
    placeholderTextColor: 'cecece',
    backgroundColor: '#f4f4f4',
    fontSize: 13,
    marginBottom: 20,
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
    width: '20%',
    color: 'white',
  },
  membersSection: {
    backgroundColor: '#b2e196',
    marginBottom: 10,
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
