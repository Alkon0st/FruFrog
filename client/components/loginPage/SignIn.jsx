import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'; // Import axios
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import styles from './LoginPage.style';

function SignInFunction() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [showError, setShowError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
   
     const navigation = useNavigation();

    const { control, handleSubmit: formHandleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
            role: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            // Send login request to the server
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                identifier: data.username, // Username or email
                password: data.password,
            });
 
            
            // Handle successful login
            const { token, user } = response.data;
            console.log('Login successful:', user);
            setShowError(false);
            setModalVisible(true); // Show success modal
           

            Alert.alert('Success', `Welcome back, ${user.username}!`);

            // save the token 
            await AsyncStorage.setItem('token', token);

            // Navigate to the home screen or dashboard
            navigation.navigate('Nav'); // Replace 'Home' with your target screen
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setShowError(true);
            Alert.alert(
                'Login Failed',
                error.response?.data?.message || 'Invalid username or password. Please try again.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
        setForgotPassword(true);
    };

    const handleSendEmail = () => {
        if (email.includes('@')) {
            setEmailSent(true);
        }
        else 
        {
            Alert.alert("Please enter a valid email address");
        }
    };
    
    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Controller
                        control={control}
                        rules={{
                            required: "Username or Email is required",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Text style={styles.textStyle}>Email</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder="Enter email or username"
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        onChange(text);
                                        setUsername(text);
                                    }}
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
                            required: "Password is required",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Text style={styles.textStyle}>Password</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder="Enter your password"
                                    secureTextEntry={true}
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        onChange(text);
                                        setPassword(text);
                                    }}
                                    value={value}
                                />
                                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                            </>
                        )}
                        name="password"
                    />

                    {showError && (
                        <Text style={styles.errorText}>Invalid username or password</Text>
                    )}

                    <View style={styles.buttonContainer}>
                        <Pressable 
                            style={styles.alternateButton}
                            onPress={handleForgotPassword}
                        >
                            <Text style={styles.alternateButtonText}>Forgot Password?</Text>
                        </Pressable>
                        
                        <TouchableOpacity 
                           style={[
                            styles.button,
                            (!username || !password) && { backgroundColor: '#ccc' }
                        ]}
                            onPress={formHandleSubmit(onSubmit)}
                            disabled={!username || !password}
                        >
                            <Text style={styles.textButton}>Sign In</Text> 
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={handleModalClose}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Login Successful!</Text>
                                <Text>Welcome back, {username}!</Text>
                                <Pressable
                                    style={styles.modalButton}
                                    onPress={handleModalClose}
                                >
                                    <Text style={styles.textButton}>Continue</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    {forgotPassword && (
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={styles.subHeadingStyle}>Trouble Logging In?</Text>
                            <Text style={styles.textStyle}>Enter your email and we'll send you a link to get back into your account.</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => {
                                    if (email.trim() !== '') {
                                        handleSendEmail(true);
                                    }
                                }}
                            >
                                <Text style={styles.textButton}>Send Login Link</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setForgotPassword(false)}>
                                <Text style={styles.linkText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <Modal visible={emailSent} transparent={true} animationType='slide'>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Check your email for the link, fellow frogger!</Text>
                                <Pressable onPress={() => setEmailSent(false)}>
                                    <Text style={styles.modalButton}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default SignInFunction;