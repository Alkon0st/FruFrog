import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios

function CreateAccount() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: {errors}, watch } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const [username, setUsername] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const password = watch('password') || '';

  const onsubmit = async (data) => {
    try {
      // Replace with your server's endpoint
      const response = await axios.post('http://localhost:5000/api/auth/signup', data);
      console.log('Server Response:', response.data);
      alert('Your account has been successfully created.');
      navigation.navigate('Sign In'); // Navigate to Sign In page after success
    } catch (error) {
      console.error('Error creating account:', error.response?.data || error.message);
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      locations={[0.47, 1]}
      colors={['#FEFFF5', '#E0FDD9']}
      style={styles.LinearGradient}>
      <Text style={styles.headingStyle}>Create Account</Text>

      <View style={styles.viewStyle}>
        <Controller
            control={control}
            rules={{
                required: "Username is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text style={styles.subHeadingStyle}>Username</Text>
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
                    <Text style={styles.subHeadingStyle}>Email</Text>
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
                    <Text style={styles.subHeadingStyle}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Enter your password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={!passwordVisible}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
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
                    <Text style={styles.subHeadingStyle}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Confirm password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={!confirmPasswordVisible}
                        />
                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            <Text style={styles.showHideText}>{confirmPasswordVisible ? "Hide" : "Show"}</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && (<Text style={styles.errorText}>{errors.confirmPassword.message}</Text>)}
                </>
            )}
            name="confirmPassword"
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit(onsubmit)}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>
              Already have an account? <Text style={{fontWeight:'bold'}}>Sign In</Text>
            </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle: {
    fontSize: 20,
    color: '#008000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewStyle: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 60,
    marginTop: 20,
    padding: 60,
    borderRadius: 50,
  },
  textStyle: {
    fontSize: 12,
    color: 'black',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  subHeadingStyle: {
    fontSize: 16,
    color: '#008000',
    fontWeight: 'light',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  textInputStyle: {
    borderWidth: 1,
    borderColor: '#008000',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#800D00',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  buttonStyle: {
    backgroundColor: '#85BB65',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  showHideText: {
    color: '#067AFF',
    marginLeft: -40,
    marginTop: 10,
    zIndex: 1,
  },
  signInText: {
    fontSize: 12,
    marginTop: 18, 
    textAlign: 'center', 
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: 'normal',
    width: '100%',
  }
});
export default CreateAccount;
