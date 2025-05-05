import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { db } from '../../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getSelectedPond } from './getSelectedPond';

const AddBillModal = ({ visible, onSubmit, onClose }) => {
  const [billDate, setBillDate] = useState('');
  const [category, setCategory] = useState('Rent');
  const [billTitle, setBillTitle] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [splitMode, setSplitMode] = useState('even');
  const [membersList, setMembersList] = useState([]);
  const [customSplit, setCustomSplit] = useState([]);

  useEffect(() => {
    if (visible) {
      const today = new Date();
      const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
      const day = String(today.getDate()).padStart(2, '0');
      const month = months[today.getMonth()];
      const year = today.getFullYear();
      setBillDate(`${month} ${day}, ${year}`);

      (async () => {
        const user = getAuth().currentUser;
        if (!user) return;
        const pond = await getSelectedPond(user.uid);
        if (!pond) return;
        setMembersList(pond.members);
        setCustomSplit(pond.members.map(uid => ({ uid, percent: 0 })));
      })();
    }
  }, [visible]);

  const resetFields = () => {
    setBillTitle('');
    setBillAmount('');
    setCategory('Rent');
    setSplitMode('even');
  };

  const handleEvenSplit = async () => {
    const amount = parseFloat(billAmount) || 0;
    const members = membersList.length || 1;
    const splitAmount = amount / members;
    const percentPaid = amount / amount;
    if (!billTitle.trim()) {
      alert('Please enter a title.');
      return;
    }
    if (!billAmount.trim() || isNaN(parseFloat(billAmount))) {
      alert('Please enter a valid total amount.');
      return;
    }

    const bill = {
      title: billTitle,
      date: billDate,
      category,
      amount,
      members,
      split,
      paid: splitAmount.toFixed(2),
      percentPaid: percentPaid.toFixed(2),
      total: amount.toFixed(2),
      createdAt: new Date(),
    };

    try {
      const user = getAuth().currentUser;
      if (!user) return;
      const pond = await getSelectedPond(user.uid);
      if (!pond) return;

      await addDoc(collection(db, `ponds/${pond.id}/bills`), bill);
      onSubmit && onSubmit(bill);
      resetFields();
      onClose();
    } catch (error) {
      console.error('Error adding bill:', error);
      alert('Failed to add bill.');
    }
  };

  const handleCustomSplit = async () => {
    const totalPercent = customSplit.reduce((sum, m) => sum + m.percent, 0);
    if (!billTitle.trim()) {
      alert('Please enter a title.');
      return;
    }
    if (!billAmount.trim() || isNaN(parseFloat(billAmount))) {
      alert('Please enter a valid total amount.');
      return;
    }
    if (totalPercent !== 100) {
      alert('Split must add up to 100%');
      return;
    }
  
    const amount = parseFloat(billAmount) || 0;
    const members = membersList.length || 1;
  
    try {
      const user = getAuth().currentUser;
      if (!user) return;
  
      const userSplit = customSplit.find(m => m.uid === user.uid);
      if (!userSplit) {
        alert('Could not find your split.');
        return;
      }
  
      const paidAmount = (amount * (userSplit.percent / 100));
      const percentPaid = userSplit.percent / 100;
  
      const bill = {
        title: billTitle,
        date: billDate,
        category,
        amount,
        members,
        customSplit,
        paid: paidAmount.toFixed(2),
        percentPaid: percentPaid.toFixed(2),
        total: amount.toFixed(2),
        createdAt: new Date(),
      };
  
      const pond = await getSelectedPond(user.uid);
      if (!pond) return;
  
      await addDoc(collection(db, `ponds/${pond.id}/bills`), bill);
      onSubmit && onSubmit(bill);
      resetFields();
      onClose();
    } catch (error) {
      console.error('Error adding custom split bill:', error);
      alert('Failed to add bill.');
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.inputContainer}>
            <View style={styles.dateSection}>
              <Text style={styles.date}>{billDate}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ color: 'black' }}>✖</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categorySection}>
              <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
                <Picker.Item label="Rent" value="Rent" />
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Utilities" value="Utilities" />
                <Picker.Item label="Entertainment" value="Entertainment" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>

            <TextInput
              style={styles.titleInput}
              placeholder="Title here..."
              value={billTitle}
              onChangeText={setBillTitle}
            />

            <View style={styles.membersSection}>
              <Text>{membersList.join(' ') || 'Members'}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text>Total: $</Text>
              <TextInput
                style={styles.totalInput}
                value={billAmount}
                onChangeText={setBillAmount}
                keyboardType="numeric"
              />
            </View>

            {splitMode === 'custom' && customSplit.map((m, i) => (
              <View key={m.uid} style={{ marginBottom: 10 }}>
                <Text>{m.uid}</Text>
                <Slider
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={m.percent}
                  onValueChange={(val) => {
                    const updated = [...customSplit];
                    updated[i] = { ...updated[i], percent: val };
                    setCustomSplit(updated);
                  }}
                />
                <Text>{m.percent}%</Text>
              </View>
            ))}

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleEvenSplit} style={styles.button}>
                <Text style={styles.buttonText}>Even Split</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSplitMode('custom')} style={styles.button}>
                <Text style={styles.buttonText}>Custom Split</Text>
              </TouchableOpacity>
              {splitMode === 'custom' && (
                <TouchableOpacity onPress={handleCustomSplit} style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
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
    minWidth: 300,
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
    width: '20%',
  },
  membersSection: {
    backgroundColor: '#b2e196',
    marginBottom: 10,
    height: 25,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    flexWrap: 'wrap',
    gap: 5,
  },
  button: {
    backgroundColor: '#85bb65',
    borderColor: '#4f723a',
    borderWidth: 2,
    borderRadius: 8,
    padding: 6,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
  },
  closeButton: {
    paddingLeft: 5,
  },
});

export default AddBillModal;
