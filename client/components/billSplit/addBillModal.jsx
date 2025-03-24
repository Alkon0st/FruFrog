import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';

// Bill Modal Component
const AddBillModal = ({ visible, onSubmit, onClose }) => {
  const [billCategory, setBillCategory] = React.useState('');
  const [billTitle, setBillTitle] = React.useState('');
  const [billDate, setBillDate] = React.useState('');
  const [billPaid, setBillPaid] = React.useState('');
  const [billTotal, setBillTotal] = React.useState('');

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
          <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder="Category"
            value={billCategory}
            onChangeText={setBillCategory}
          />

          <TextInput
            style={styles.input}
            placeholder="Bill Title"
            value={billTitle}
            onChangeText={setBillTitle}
          />
          <TextInput style={styles.input} value={billDate} editable={false} />
          <TextInput
            style={styles.input}
            placeholder="Paid Amount"
            value={billPaid}
            onChangeText={setBillPaid}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Total Amount"
            value={billTotal}
            onChangeText={setBillTotal}
            keyboardType="numeric"
          />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text>Custom Split</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
            </TouchableOpacity>
          </View>
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
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
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    // borderBottomWidth: 1,
    // borderColor: 'lightgrey',
    padding: 8,
    marginBottom: 10,
  },
  taxContainer: {
    padding: 20,
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
    borderRadius: 5,
    padding: 1,
  },
});

export default AddBillModal;
