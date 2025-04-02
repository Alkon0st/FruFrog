import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ForgotPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const handleChangePassword = () => {
        if (password === confirmPassword && password.length >= 6) {
            Alert.alert('Success', 'Your password has been changed.');
            navigation.navigate('SignIn');
        } else {
            Alert.alert('Error: Password does not match');
        }
    };

    return (
        <View>
            <Text>Change Password</Text>
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <TextInput placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
            <Button title="Change Password" onPress={handleChangePassword} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 20,
        color: '#309c61',
    },
    headingStyle: {
        fontSize: 30,
        color: '#008000',
        fontWeight: 'normal',
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: '#008000',
        padding: 10,
        borderRadius: 5,
    },
});

export default ForgotPassword;