import React from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const AddBillModal = ({ visible, onClose }) => {
  const [billTitle, setBillTitle] = React.useState('');
  const [billDate, setBillDate] = React.useState('');
  const [billPaid, setBillPaid] = React.useState('');
  const [billTotal, setBillTotal] = React.useState('');

  return (
    <Modal
      animationType="slide"
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
          <TextInput
            style={styles.input}
            placeholder="Due Date"
            value={billDate}
            onChangeText={setBillDate}
          />
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
            <Button title="Done" onPress={onClose} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
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