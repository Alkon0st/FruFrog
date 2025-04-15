import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'; // Ensure this is correctly implemented
import styles from './LoginPage.style';

function CreateAccount() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const password = watch('password') || '';

  const onsubmit = async (data) => {
    try {
      // Use Firebase Authentication to create a new user
      const userCredential = await doCreateUserWithEmailAndPassword(data.email, data.password);
      const user = userCredential.user;

      console.log('User registered successfully:', user);
      navigation.navigate('Login'); // Navigate to the Login page after success
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
      <Image
        source={require('./img/frufrog_icon.png')}
        resizeMode="contain"
        style={styles.img}
      />

      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
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
        </SafeAreaView>
      </SafeAreaProvider>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>
          Already have an account? <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default CreateAccount;