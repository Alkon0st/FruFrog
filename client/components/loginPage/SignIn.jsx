import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

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
        setIsLoading(true);
        setTimeout(() => {
            if (data.username === 'admin' && data.password === 'admin') {
                setShowError(false);
                setIsLoading(false);
                setModalVisible(true);
                navigation.replace('HomePage', { username: data.username });
                Alert.alert("Login Successful", "Welcome back, " + data.username + "!");
            } else {
                setShowError(true);
                Alert.alert("Sign In Failed", "Invalid username or password");
                setIsLoading(false);
            }
        },1500);
    };
    
    const handleForgotPassword = () => {
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
                    <Text style={styles.headingStyle}>Sign In</Text>

                    
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
                                    placeholder="Enter username or email"
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
                                placeholder="Email or username"
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    headingStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#008000',
    },
    subHeadingStyle: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 15,
        textAlign: 'center',
    },
    textStyle: {
        fontSize: 14,
        marginBottom: 5,
    },
    textInputStyle: {
        height: 40,
        borderColor: '#',
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
        backgroundColor: '#85BB65',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    textButton: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 16,
    },
    buttonContainer: {
        marginBottom: 10,
    },
    alternateButton: {
        marginLeft: 50,
        alignItems: 'center',
    },
    alternateButtonText: {
        color: '#000',
        textDecorationLine: 'underline',
        fontWeight: 'normal',
        marginBottom: 20,
        marginLeft: 20,
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
        fontWeight: 'italic',
        color: '#008000',
        fontSize: 18,
    },
    modalButton: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#85BB65',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    forgotPasswordContainer: {
        marginTop: 20,
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#008000',
    },
    linkText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 10,
    },
});
export default SignInFunction;