import React, {useState, useEffect} from 'react';
import {Alert, Modal, Text, View, TouchableOpacity, Image } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';


import GenerateCode from './GenerateCode';
import styles from './AddUser.style';

const AddUser = ( {pondName} ) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [pondId, setPondId] = useState(null);

  // Function to generate a random OTP
  const generateOtp = async () => {
    let generatedOtp = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    if (!isGenerated) {
      for (let i = 0; i < 6; i++) {
      generatedOtp += characters
        .charAt(Math
          .floor(Math.random() * characters.length));
      }
    // Set the generated OTP and reset the validity status
    setOtp(generatedOtp);
    setIsGenerated(true); //makes it so only one code can be generated per render

    if (pondId) {
      try {
        const pondRef = doc(db, 'ponds', pondId)
        const expiresAt = Date.now() + 2 * 24 * 60 * 60 * 1000 //2 days in milliseconds

        await updateDoc(pondRef, {
          join_code: {
            code: generatedOtp,
            expiresAt
          }
        })
      } catch (error) {
        console.error('Failed to update join code in Firestore:', error)
      }
    }
    }
  };

  useEffect( () => {
    if (modalVisible) {
      fetchSelectedPond()
    }
  }, [modalVisible]);

  const fetchSelectedPond = async () => {
    const auth = getAuth()
    const user = auth.currentUser
    if (!user) return;

    try {
      const q = query(collection(db, 'ponds'), where('selected', 'array-contains', user.uid))
      const querySnapshot = await getDocs(q)
      const selectedPond = querySnapshot.docs[0]
      if (selectedPond) {
        setPondId(selectedPond.id)

        const joinCodeData = selectedPond.data().join_code
        const now = Date.now()

        // checks if join_code exists and is still valid
        if (
          joinCodeData &&
          joinCodeData.code &&
          joinCodeData.expiresAt &&
          now < joinCodeData.expiresAt
        ) {
          setOtp(joinCodeData.code)
          setIsGenerated(true)
        } else {
          await generateOtp();
        }
      }
    } catch (error) {
      console.error('Error finding selected pond: ', error)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView> 
        {/*Popup*/}
        <Modal 
          animationType="none"
          transparent = {true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed.');
            setModalVisible(false);
          }}>
          {/* The popup itself */}
          <View style={styles.mainView}>
            <View style={styles.modalView}>
            {/* Top */}
            <View style={styles.buttonClose}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textClose}>◀</Text>
              </TouchableOpacity>

              {/* Main Text */}
              <View style={styles.header}>
                <Text style={styles.headerText1}>Invite a member to</Text>
                <Text style={styles.headerText2}> {pondName} </Text>
              </View>

              {/* Main Content */}
              <GenerateCode otp={otp}/>
            </View>

            </View>
          </View>
        </Modal>

        {/*Add User button ----------------------------------------------*/}
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setModalVisible(true)
            setOtp('')
            setIsGenerated(false)
            }}
        >
          <View style={styles.row}>
            <Image 
              source={require('../../img/add_user.png')}
              resizeMode='contain'
              style={styles.img} />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AddUser;