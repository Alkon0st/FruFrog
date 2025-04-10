import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from 'react';

import SignIn from './SignIn';
import { LinearGradient } from "expo-linear-gradient";


function LoginPage() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      // Background Linear Gradient
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      locations={[0.47, 1]}
      colors={['#FEFFF5', '#E0FDD9']}
      style={styles.LinearGradient}>
      

      <View style={styles.viewStyle}>
          <Text style={styles.headingStyle}>Welcome Back</Text>
          <Text style={styles.textStyle}>Log in to see what you have toad-do</Text>
      

          {/* Function call for Sign In button */}
          <SignIn />
          {/* Function call for Create Account button */}
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}
              style={styles.buttonStyle}
          >
              <Text style={styles.textButton}>Create Account</Text>
          </TouchableOpacity>
          {/* Function call for Forgot Password button */}
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}
              style={styles.alternateButtonStyle}
          >
              <Text style={styles.textButton}>Plan My Budget</Text>
          </TouchableOpacity>
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
  textStyle: {
      fontSize: 20,
      color: '#309c61',
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 20,
  },
  headingStyle: {
      fontSize: 30,
      color: '#008000',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  buttonStyle: {
      backgroundColor: '#85BB65',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
  },
  alternateButtonStyle: {
      backgroundColor: '#85BB65',
      padding: 10,
      borderRadius: 5,
      width: '41%',
      alignItems: 'center',
      marginTop: 120,
  },
  textButton: {
      fontSize: 16,
      color: 'white',
      fontWeight: 'light',
      textAlign: 'center',
  },
  footer: {
      fontSize: 12,
      color: '#888',
      marginTop: 10,
      textAlign: 'center',
  },
});
export default LoginPage;