import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const AddEventModal = ({ visible, onClose, onSubmit, pondId }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventAmountOwe, setEventAmountOwe] = useState('');
  const [eventAmountTotal, setEventAmountTotal] = useState('');
  const [eventDate, setEventDate] = useState('');

  useEffect(() => {
    if (visible) {
      const today = new Date();
      const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
      const day = String(today.getDate()).padStart(2, '0');
      const month = months[today.getMonth()];
      const year = today.getFullYear();
      setEventDate(`${month} ${day}, ${year}`);
    }
  }, [visible]);

  const handleAddEvent = async () => {
    if (!eventTitle.trim() || !eventAmountOwe.trim() || !eventAmountTotal.trim()) {
      alert('Please fill all fields.');
      return;
    }

    const amountOwe = parseFloat(eventAmountOwe) || 0;
    const amountTotal = parseFloat(eventAmountTotal) || 0;

    try {
      const user = getAuth().currentUser;
      if (!user || !pondId) {
        alert("No pond selected or user not authenticated.");
        return;
      }

      const event = {
        title: eventTitle,
        date: eventDate,
        paid: amountOwe.toFixed(2),
        total: amountTotal.toFixed(2),
        createdAt: new Date(),
        split: [{ uid: user.uid, percent: 100 }],
        paidBy: [],
      };

      await addDoc(collection(db, `ponds/${pondId}/bills`), event);

      onSubmit();
      onClose();
      setEventTitle('');
      setEventAmountOwe('');
      setEventAmountTotal('');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event.');
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.titleInput}
            placeholder="Title..."
            value={eventTitle}
            onChangeText={setEventTitle}
          />
          <View style={styles.amountContainer}>
            <Text>You Owe: $</Text>
            <TextInput
              style={styles.amountInput}
              value={eventAmountOwe}
              onChangeText={setEventAmountOwe}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.amountContainer}>
            <Text>Total: $</Text>
            <TextInput
              style={styles.amountInput}
              value={eventAmountTotal}
              onChangeText={setEventAmountTotal}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity onPress={handleAddEvent} style={styles.button}>
            <Text style={styles.buttonText}>Add Event</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ color: 'black' }}>✖</Text>
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
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  titleInput: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 10,
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amountInput: {
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    width: 100,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#85BB65',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default AddEventModal;