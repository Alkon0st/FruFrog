import { StyleSheet, Text, View, Button } from "react-native";
import React from 'react';

import SignIn from './SignIn';
import { LinearGradient } from "expo-linear-gradient";

function LoginPage() {

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
          <create-account />
        </View>
        
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
  },
  textStyle: {
      fontSize: 20,
      color: '#309c61',
  },
  headingStyle: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
  },
});
export default LoginPage;