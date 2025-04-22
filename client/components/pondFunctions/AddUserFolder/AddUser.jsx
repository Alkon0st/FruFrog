import React, {useState} from 'react';
import {Alert, Modal, Text, Pressable, View, Button, TouchableOpacity, Image } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import Select from 'react-select';
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
      <Text style={styles.headingStyle}>Add by Code</Text>
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
    </View>
  );
}

function AddUserFunction() {
  //for sample options
  let friends = [
      {value: 'AAAA', label: 'AAAA'},
      {value: 'Blip@', label: 'Blip@'},
      {value: 'John_Doe1332', label: 'John_Doe1332'},
      {value: 'musclemanRS', label: 'musclemanRS'},
      {value: 'NaNahopley', label: 'NaNahopley'},
      {value: 'OH_BOI', label: 'OH_BOI'},
      {value: 'SadLad', label: 'SadLad'},
      {value: 'SolarFlareX9', label: 'SolarFlareX9'},
      {value: 'SpendJ5@', label: 'SpendJ5@'},
      {value: 'TEE_HEE', label: 'TEE_HEE'},
      {value: 'Trix_Xx', label: 'Trix_Xx'},
      {value: 'xXMafiaBossXx', label: 'xXMafiaBossXx'},
  ]

  //for form
  const {
      control, 
      handleSubmit,
      formState: {errors},
  } = useForm()

  //takes input data and puts it in console
  const onSubmit = (data) => console.log(data)

  return (
    <View>
      <Text style={styles.headingStyle}>Add to Pond</Text> 
      
      <Text style ={styles.textStyle}>Choose User:</Text>
      <Controller
          control={control}
          rules={{required: true,}}
          name="requested_users"
          render= {({ field: {onChange, onBlur, value} }) => (
              <Select
                placeholder={'Search...'}
                options={friends}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                isMulti={true}
                isSearchable={true}
                maxMenuHeight = {125}
              />
      )} 
      />
      {errors.thumbnail && <Text style = {styles.warningText}> This is required.</Text>} 

      <Button style={styles.buttonOpen} textInputStyle={styles.textButton} title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const AddUser = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userVisible, setUserVisible] = useState(false);
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
              {/* To go back to home */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textButton}>Hide</Text>
              </Pressable>
              {/* To add selection */}
              <View style={styles.fixToText}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setCodeVisible(true)}>
                  <Text style={styles.textButton}>Add User by Code</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setUserVisible(true)}>
                  <Text style={styles.textButton}>Add User by User</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/*Popup for add by User ----------------------------------------------*/}
        <Modal 
          animationType="none"
          transparent = {true}
          visible={userVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed.');
            setUserVisible(!userVisible); //changes variable to not visible
          }}>
          {/* The popup itself */}
          <View style={styles.mainView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setUserVisible(!userVisible)}>
                <Text style={styles.textButton}>Hide</Text>
              </Pressable>
              <AddUserFunction />
            </View>
          </View>
        </Modal>

        {/*Popup for add by CODE ----------------------------------------------*/}
        <Modal 
          animationType="none"
          transparent = {true}
          visible={codeVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed.');
            setCodeVisible(!codeVisible); //changes variable to not visible
          }}>
          {/* The popup itself */}
          <View style={styles.mainView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setCodeVisible(!codeVisible)}>
                <Text style={styles.textButton}>Hide</Text>
              </Pressable>
              <AddCodeFunction />
            </View>
          </View>
        </Modal>

        {/*Add User button ----------------------------------------------*/}
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <View style={styles.row}>
            <Image 
              source={require('../../img/add_user.png')}
              resizeMode='contain'
              style={styles.img} />
          </View>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AddUser;