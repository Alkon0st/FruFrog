import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

function ForgotPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleChangePassword = () => {
        if (password === confirmPassword && password.length >= 6) {
            Alert.alert('Success', 'Your password has been changed.');
            navigation.navigate('Login');
        } else {
            Alert.alert('Error', 'Password does not match or is too short (minimum 6 characters)');
        }
    };

    return (
        <LinearGradient
            // Background Linear Gradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            locations={[0.47, 1]}
            colors={['#FEFFF5', '#E0FDD9']}
            style={styles.LinearGradient}
        >
            <View style={styles.container}>
                {/* Header with Logo and Title */}
                <View style={styles.header}>
                    <Text style={styles.headingStyle}>Change Password</Text>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual frog logo URL or local asset
                        style={styles.logo}
                    />
                    <Text style={styles.goatText}>GOAT24</Text>
                </View>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        {password.length >= 6 && <Text style={styles.checkmark}>✔</Text>}
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        {password === confirmPassword && confirmPassword.length >= 6 && (
                            <Text style={styles.checkmark}>✔</Text>
                        )}
                    </View>
                </View>

                {/* Change Password Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Change Password"
                        onPress={handleChangePassword}
                        color="#4CAF50" // Green color for the button
                    />
                </View>

                {/* Footer */}
                <Text style={styles.footer}>© Pond Patrol. All rights reserved.</Text>
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
    viewStyle: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#D8E4BC', // Light green background to match the image
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderRadius: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    headingStyle: {
        fontSize: 24,
        color: '#008000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    logo: {
        borderRadius: 50,
        marginTop: 50,
    },
    goatText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 70,
    },
    inputContainer: {
        width: '96%',
        alignItems: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    checkmark: {
        color: '#568203',
        fontSize: 20,
        marginLeft: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    footer: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        marginBottom: 50,
        marginTop: 75,
    },
});

export default ForgotPassword;