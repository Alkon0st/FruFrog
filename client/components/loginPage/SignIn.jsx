import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';

function SignInFunction() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    
    const { control, handleSubmit: formHandleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
            role: ''
        }
    });
    
    const onSubmit = (data) => {
        if (data.username === 'admin' && data.password === 'admin') {
            setShowError(false);
            setModalVisible(true);
        } else {
            setShowError(true);
            Alert.alert(
                "Login Failed",
                "Invalid username or password. Please try again.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    };
    
    const handleForgotPassword = () => {
        setForgotPassword(true);
    };
    
    const handleModalClose = () => {
        setModalVisible(false);
    };
    
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.headingStyle}>Sign In</Text>
                    
                    <Controller
                        control={control}
                        rules={{
                            required: "Username is required",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Text style={styles.textStyle}>Username:</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder="Enter your username"
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
                            minLength: {
                                value: 5,
                                message: "Password must be at least 5 characters"
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Text style={styles.textStyle}>Password:</Text>
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
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={formHandleSubmit(onSubmit)}
                        >
                            <Text style={styles.textButton}>Sign In</Text>
                        </TouchableOpacity>
                        
                        <Button
                            title="Forgot Password?"
                            onPress={handleForgotPassword}
                            color="#6495ED"
                        />
                        
                        <Pressable 
                            style={styles.alternateButton}
                            onPress={() => Alert.alert("Create Account", "Redirecting to registration page...")}
                        >
                            <Text style={styles.alternateButtonText}>Create Account</Text>
                        </Pressable>
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
                            <Text style={styles.subHeadingStyle}>Reset Password</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Enter your email"
                            />
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => {
                                    Alert.alert("Password Reset", "Instructions have been sent to your email");
                                    setForgotPassword(false);
                                }}
                            >
                                <Text style={styles.textButton}>Send Reset Link</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setForgotPassword(false)}>
                                <Text style={styles.linkText}>Back to Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = {
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    headingStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subHeadingStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    textStyle: {
        fontSize: 16,
        marginBottom: 5,
    },
    textInputStyle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 10,
    },
    alternateButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    alternateButtonText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    selectContainer: {
        marginBottom: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    forgotPasswordContainer: {
        marginTop: 20,
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    linkText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 10,
    },
};
export default SignInFunction;