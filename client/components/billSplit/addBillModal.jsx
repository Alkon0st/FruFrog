import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { db } from '../../firebase/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getSelectedPond } from './getSelectedPond';

const profileImages = {
  1: require('../profile/img/1.png'),
  2: require('../profile/img/2.png'),
  3: require('../profile/img/3.png'),
  4: require('../profile/img/4.png'),
  5: require('../profile/img/5.png'),
  6: require('../profile/img/6.png'),
  7: require('../profile/img/7.png'),
  8: require('../profile/img/8.png'),
  9: require('../profile/img/9.png'),
  10: require('../profile/img/10.png'),
  11: require('../profile/img/11.png'),
  12: require('../profile/img/12.png'),
  13: require('../profile/img/13.png'),
  14: require('../profile/img/14.png'),
  15: require('../profile/img/15.png'),
  16: require('../profile/img/16.png'),
};

const AddBillModal = ({ visible, onSubmit, onClose, pondId }) => {
  const [billDate, setBillDate] = useState('');
  const [category, setCategory] = useState('');
  const [billTitle, setBillTitle] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [splitMode, setSplitMode] = useState('even');
  const [membersList, setMembersList] = useState([]);
  const [customSplit, setCustomSplit] = useState([]);
  const [profileMap, setProfileMap] = useState({});
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [categories, setCategories] = useState([]);

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
        if (!user || !pondId) return;
      
        const pondSnap = await getDocs(collection(db, 'ponds'));
        const pond = pondSnap.docs.find(doc => doc.id === pondId);
        if (!pond) return;
      
        const pondData = pond.data();
        const members = pondData.members || [];
      
        setMembersList(members);
        setCustomSplit(members.map(uid => ({ uid, percent: 0 })));
        setSelectedMembers(members);
      
        const snapshot = await getDocs(collection(db, 'profiles'));
        const map = {};
        snapshot.forEach(doc => {
          const { members, profile_id } = doc.data();
          members.forEach(uid => {
            map[uid] = profile_id;
          });
        });
        setProfileMap(map);
      
        // 🔽 fetch categories
        const categoriesSnapshot = await getDocs(collection(db, `ponds/${pondId}/budgetCategories`));
        const categoryList = categoriesSnapshot.docs.map(doc => doc.id);
        setCategories(categoryList);
        if (categoryList.length > 0) {
          setCategory(categoryList[0]);
        }
      })();
    }
  }, [visible]);

  const resetFields = () => {
    setBillTitle('');
    setBillAmount('');
    setSplitMode('even');
  };

  const handleEvenSplit = async () => {
    if (!billTitle.trim()) {
      alert('Please enter a title.');
      return;
    }
    if (!billAmount.trim() || isNaN(parseFloat(billAmount))) {
      alert('Please enter a valid total amount.');
      return;
    }
  
    const amount = parseFloat(billAmount) || 0;
  
    try {
      const user = getAuth().currentUser;
      if (!user) return;
      if (!pondId) {
        alert("No pond selected.");
        return;
      }
  
      const members = selectedMembers || [];
      const percent = 100 / members.length;
  
      const split = members.map(uid => ({
        uid,
        percent: parseFloat(percent.toFixed(2)),
      }));
  
      const userSplit = split.find(m => m.uid === user.uid);
      const paidAmount = (amount * (userSplit.percent / 100));
      const percentPaid = userSplit.percent / 100;
  
      const bill = {
        title: billTitle,
        date: billDate,
        category,
        amount,
        total: amount.toFixed(2),
        createdAt: new Date(),
        members: members.length,
        split,
        paid: paidAmount.toFixed(2),
        percentPaid: percentPaid.toFixed(2),
      };
  
      await addDoc(collection(db, `ponds/${pondId}/bills`), bill);
  
      onSubmit && onSubmit(bill);
      resetFields();
      onClose();
    } catch (error) {
      console.error('Error adding even split bill:', error);
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
    const members = selectedMembers || [];
  
    try {
      const user = getAuth().currentUser;
      if (!user) return;
      if (!pondId) {
        alert("No pond selected.");
        return;
      }
  
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
        split: customSplit,
        paid: paidAmount.toFixed(2),
        percentPaid: percentPaid.toFixed(2),
        total: amount.toFixed(2),
        createdAt: new Date(),
      };
  
      await addDoc(collection(db, `ponds/${pondId}/bills`), bill);
  
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
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <Picker.Item key={index} label={cat} value={cat} />
                ))
              ) : (
                <Picker.Item label="No categories" value="" />
              )}
            </Picker>
            </View>

            <TextInput
              style={styles.titleInput}
              placeholder="Title here..."
              value={billTitle}
              onChangeText={setBillTitle}
            />

            <View style={[styles.membersSection, { flexDirection: 'row', flexWrap: 'wrap', padding: 5 }]}>
              {membersList.map(uid => {
                const profileId = profileMap[uid];
                const imgSrc = profileImages[profileId] || profileImages[1];
                const isSelected = selectedMembers.includes(uid);

                return (
                  <TouchableOpacity
                    key={uid}
                    onPress={() => {
                      setSelectedMembers(prev => {
                        const isSelected = prev.includes(uid);
                        let updated = [];
                    
                        if (isSelected) {
                          updated = prev.filter(id => id !== uid);
                        } else {
                          updated = [...prev, uid];
                        }
                    
                        // Sync customSplit with selected members
                        const newCustomSplit = updated.map(id => {
                          const existing = customSplit.find(m => m.uid === id);
                          return existing || { uid: id, percent: 0 };
                        });
                    
                        setCustomSplit(newCustomSplit);
                        return updated;
                      });
                    }}
                    style={{
                      margin: 4,
                      borderRadius: 24,
                      borderWidth: 2,
                      borderColor: isSelected ? '#4f723a' : 'transparent',
                    }}
                  >
                    <Image source={imgSrc} style={{ width: 48, height: 48, borderRadius: 24 }} />
                  </TouchableOpacity>
                );
              })}
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
    width: "90%",
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
