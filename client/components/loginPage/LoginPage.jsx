import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from 'react';

import SignIn from './SignIn';

function LoginPage() {
    return (
      <View style={styles.viewStyle}>
          <Text style={styles.headingStyle}>Welcome Back</Text>
          <Text style={styles.textStyle}>Log in to see what you have toad-do</Text>
          <Text> {pondName} </Text>
          
          {/* Function call for Sign In button */}
          <SignIn />
          {/* Function call for Create Account button */}
          <create-account />
        </View>
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

export default LoginPage
 
 