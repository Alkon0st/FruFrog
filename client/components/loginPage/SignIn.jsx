import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Adjust the path to your Firebase config file
import { useNavigation } from '@react-navigation/native';

import styles from './LoginPage.style';

function SignInFunction() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async () => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                // Use Firebase Authentication to sign in
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                

                console.log("User signed in successfully:", user);
                setModalVisible(true); // Show success modal
                navigation.navigate("Nav"); // Navigate to the main page
            } catch (error) {
                console.error("Error signing in:", error.message);
                setErrorMessage(error.message);
                setShowError(true);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.container}>
                    {/* Email Input */}
                    <Controller
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Text style={styles.textStyle}>Email</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder="Enter your email"
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                        onChange(text);
                                        setEmail(text);
                                    }}
                                    value={value}
                                />
                                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                            </>
                        )}
                        name="email"
                    />

                    {/* Password Input */}
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
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                (!email || !password) && { backgroundColor: '#ccc' },
                            ]}
                            onPress={handleSubmit(onSubmit)}
                            disabled={!email || !password}
                        >
                            <Text style={styles.textButton}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Login Successful!</Text>
                                <Pressable
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.textButton}>Continue</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default SignInFunction;