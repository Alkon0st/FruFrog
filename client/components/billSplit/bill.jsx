import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from "./bill.style";
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { getAuth } from 'firebase/auth';

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

const Bill = ({ title, date, paid, total, split, paidBy = [], id, pondId }) => {
  const [profileMap, setProfileMap] = useState({});
  const [hasPaid, setHasPaid] = useState(false);
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'profiles'));
        const map = {};
  
        snapshot.forEach(doc => {
          const { members, profile_id } = doc.data();
          members.forEach(uid => {
            map[uid] = profile_id;
          });
        });
  
        setProfileMap(map);
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };
  
    fetchProfiles();
  
    if (user && paidBy.includes(user.uid)) {
      setHasPaid(true);
    }
  }, [paidBy]);

  const markAsPaid = async () => {
    if (!user || hasPaid) return;
  
    try {
      await updateDoc(doc(db, `ponds/${pondId}/bills`, id), {
        paidBy: arrayUnion(user.uid),
      });
      setHasPaid(true);
    } catch (error) {
      console.error("Error updating paidBy:", error);
    }
  };

  const renderMembers = () => {
    if (split && split.length > 0) {
      return split.map(member => {
        const profileId = profileMap[member.uid];
        const imageSource = profileImages[profileId] || profileImages[1];

        return (
          <View key={member.uid} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
            <Image
              source={imageSource}
              style={{ width: 24, height: 24, marginRight: 8, borderRadius: 12 }}
              resizeMode="contain"
            />
            <Text style={styles.billMembers}>{member.percent}%</Text>
          </View>
        );
      });
    }

    return <Text style={styles.billMembers}>No members listed</Text>;
  };

  return (
    <View style={styles.billContainer}>
      <View style={styles.billTitleSection}>
        <Text style={styles.billTitle}>{title}</Text>
        <Text style={styles.billDate}>{date}</Text>
      </View>

      <View style={styles.billPaidSection}>
        <Text style={styles.billPaid}>${paid}</Text>
        <Text style={styles.billPercent}>
          {split && split.length > 0
            ? Math.round((paidBy.length / split.length) * 100)
            : 0
          }% Paid
        </Text>
        {!hasPaid ? (
          <TouchableOpacity onPress={markAsPaid} style={{ marginTop: 5 }}>
            <Text style={{ color: '#4f723a' }}>✅ Mark as Paid</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ color: 'green', marginTop: 5 }}>✔ You marked as paid</Text>
        )}
      </View>

      <View style={{
        borderBottomWidth: 1,
        width: '100%',
        borderColor: '#9e9e9e',
        marginBottom: 10,
      }} />

      <View style={styles.billMembersSection}>
        {renderMembers()}
      </View>

      <View style={styles.billTotalSection}>
        <Text style={styles.billTotal}>Total: ${total}</Text>
      </View>
    </View>
  );
};

export default Bill;
