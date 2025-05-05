import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs, updateDoc, arrayUnion, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'; // Ensure this is correctly implemented
import styles from './LoginPage.style';

const SuccessMessage = ({visible}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
        >
        <View style={styles.successContainer}>
            <View style={styles.successView}>
                <Text style={styles.successText}> Account created! </Text>
                <Image 
                    source={require('../img/checkmark.png')}
                    resizeMode='contain'
                    style={styles.successCheckmark}
                />
            </View>
        </View>
        </Modal>
    )
}

function CreateAccount() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onBlur'
  })
  const [successVisible, setSuccessVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const password = watch('password') || '';

  const onsubmit = async (data) => {
    console.log('Form data:', data); //testing
    console.log('typeof username:', typeof data.username)
    console.log('username value:', data.username)

    // testing username input
    if (!data.username) {
      console.error("Username is missing!");
      return;
    }

    try {
      // Use Firebase Authentication to create a new user (and add to users collection)
      const userCredential = await doCreateUserWithEmailAndPassword(data.username, data.email, data.password);
      const user = userCredential.user;
      
      console.log('User registered successfully & profile set to 1:', user);
      
      //show success msg
      setSuccessVisible(true)

      // Navigate to the Login page after success message dissapears
      setTimeout(() => {
        setSuccessVisible(false)
        navigation.navigate('Login')
      }, 2000) //2 seconds

    } catch (error) {
      console.error('Error creating account:', error.message);
    }
  };

  return (
    <LinearGradient
      locations={[0, 0.47, 1]}
      colors={['#FFFFFF', '#FEFFF5', '#E0FDD9']}
      style={styles.LinearGradient}
    >
      {/* Header (REMOVED BC WE HAVE RETURN TO SIGN IN BUTTON*/}
      {/* <View>
          <TouchableOpacity 
              style={styles.logOutButton}
              onPress={() => {navigation.dispatch(
                  CommonActions.reset({
                      index:0,
                      routes: [{name:'Login'}],
                  })
              );
          }}
          >
              <Text> ◀ </Text>
          </TouchableOpacity>
      </View> */}
    
    {/* Scrollview is so the content doesnt get cut off when error messages */}
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.viewStyle}>
        <Image
          source={require('./img/frufrog_icon.png')}
          resizeMode="contain"
          style={styles.img}
        />

        <View style={styles.safeArea}>
          <View style={[styles.container]}>
            <Controller
              control={control}
              rules={{
                required: "Username is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.textStyle}>Username</Text>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter your username"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    minLength={1}
                  />
                  {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                </>
              )}
              name="username"
            />
            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.textStyle}>Email</Text>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="Enter your email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="email-address"
                  />
                  {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </>
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.textStyle}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder="Enter your password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                      style={styles.showHideContainer}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                      <Text style={styles.showHideText}>{passwordVisible ? "Hide" : "Show"}</Text>
                    </TouchableOpacity>
                  </View>
                  {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </>
              )}
              name="password"
            />
            <Controller
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={styles.textStyle}>Confirm Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder="Confirm password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!confirmPasswordVisible}
                    />
                    <TouchableOpacity
                      style={styles.showHideContainer}
                      onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      <Text style={styles.showHideText}>{confirmPasswordVisible ? "Hide" : "Show"}</Text>
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                  )}
                </>
              )}
              name="confirmPassword"
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={handleSubmit(onsubmit)}
            >
              <Text style={styles.textButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>
              Already have an account? <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Pond Patrol. All rights reserved.</Text>
        </View>
    </ScrollView>

      <SuccessMessage visible={successVisible} />
      
    </LinearGradient>

  );
}

export default CreateAccount;