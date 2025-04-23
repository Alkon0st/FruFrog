import React, {useState, useEffect} from 'react';
import {Alert, Modal, Text, View, TouchableOpacity, Image } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered
import { TextInput } from 'react-native-gesture-handler';

import GenerateCode from './GenerateCode';
import styles from './AddUser.style';

const AddUser = ( {pondName} ) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  // Function to generate a random OTP
  const generateOtp = () => {
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
    }
  };

  useEffect( () => {
    if (modalVisible) {
      generateOtp();
    }
  }, [modalVisible]);

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
          onPress={() => setModalVisible(true)}>
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