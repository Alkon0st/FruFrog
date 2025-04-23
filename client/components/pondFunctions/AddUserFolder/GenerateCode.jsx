import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './AddUser.style';

export default function GenerateCode({ otp }) {
    const [userInput, setUserInput] = useState('');
    const [isValid, setIsValid] = useState(null);
  
    // Function to validate the entered OTP
    const validateOtp = () => {
        if (userInput === otp) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };
  
    return (
    <View style={styles.container}>
        <View style={styles.codeHeader}> Generated Code </View>
        <View style={styles.codeBox}>
            <generateOtp />
            <Text style={styles.codeText}> {otp} </Text>
        </View>
        <View style={styles.disclaimerText}>This code will be active for 2 days or until used. </View>
        
    </View>
    );
  }


{/* TEXT VALIDATOR */}
{/* <Text style={[styles.textStyle, {marginTop: 10}]}>Code Validator (test)</Text>
<TextInput
style={[styles.textInputStyle, {fontSize: 18}]}
placeholder="Enter Pond Code"
value={userInput}
onChangeText={setUserInput}
/>
<TouchableOpacity style={styles.button}
onPress={validateOtp}>
<Text style={styles.textButton}> Validate Code </Text>
</TouchableOpacity> */}
{/* Display messages based on the validity status */}
{/* {isValid === true &&
<Text style={styles.validText}> Valid Code </Text>
}
{isValid === false &&
<Text style={styles.warningText}> Invalid Code </Text>
} */}