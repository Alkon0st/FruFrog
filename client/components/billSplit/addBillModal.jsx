import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

// Bill Modal Component
const AddBillModal = ({ visible, onSubmit, onClose }) => {
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
          <Text style={styles.modalTitle}>Add New Bill</Text>

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
            <Button title="Cancel" onPress={onClose} color="red" />
            <Button title="Done" onPress={handleSubmit} />
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
    backgroundColor: 'white',
    padding: 20,
    width: '25%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 8,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
});

export default AddBillModal;
