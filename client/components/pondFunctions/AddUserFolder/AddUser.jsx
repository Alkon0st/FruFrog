import React, {useState} from 'react';
import {Alert, Modal, Text, View, TouchableOpacity, Image } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered
import { TextInput } from 'react-native-gesture-handler';
import styles from './AddUser.style';

function AddCodeFunction() {
  const [otp, setOtp] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(null);
  // State to control OTP box visibility
  const [showOtpBox, setShowOtpBox] = useState(false);

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
    setIsValid(null);
    // Show the OTP box after generating OTP
    setShowOtpBox(true);
    setIsGenerated(true); //makes it so only one code can be generated per render
    }
  };

  // Function to validate the entered OTP
  const validateOtp = () => {
      if (userInput === otp) {
          setIsValid(true);
      } else {
          setIsValid(false);
      }
  };

  return (
    <View>
      <Text style={styles.textStyle}> Code Generator </Text>
      <TouchableOpacity style={styles.button}
        onPress={generateOtp}>
        <Text style={styles.textButton}> Generate Code </Text>
      </TouchableOpacity>
      {showOtpBox && (
        // Conditionally render the OTP box
        <View>
          <Text style={{color: 'black', fontSize: 18}}> Generated Code: {otp} </Text>
        </View>
      )}
      <Text style={[styles.textStyle, {marginTop: 10}]}>Code Validator (test)</Text>
      <TextInput
        style={[styles.textInputStyle, {fontSize: 18}]}
        placeholder="Enter Pond Code"
        value={userInput}
        onChangeText={setUserInput}
      />
      <TouchableOpacity style={styles.button}
        onPress={validateOtp}>
        <Text style={styles.textButton}> Validate Code </Text>
      </TouchableOpacity>
      {/* Display messages based on the validity status */}
      {isValid === true &&
        <Text style={styles.validText}> Valid Code </Text>
        }
      {isValid === false &&
        <Text style={styles.warningText}> Invalid Code </Text>
        }
    </View>
  );
}

const AddUser = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView> 
        {/*Popup for OPTIONS ----------------------------------------------*/}
        <Modal 
          animationType="none"
          transparent = {true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed.');
            setModalVisible(!modalVisible); //changes variable to not visible
          }}>
          {/* The popup itself */}
          <View style={styles.mainView}>
            <View style={styles.modalView}>
            {/* Header */}
            <View style={styles.row}>
              <View style={styles.buttonClose}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textClose}>◀</Text>
                </TouchableOpacity>
              </View>      
              <View style={styles.header}>
                <Text style={styles.headingStyle}>Add by Code</Text>
              </View>
            </View>

              {/* Main Portion */}
              <View>
                <AddCodeFunction />
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