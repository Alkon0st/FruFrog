import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from 'react';

import SignIn from './SignIn';
import styles from "./LoginPage.style";
import { LinearGradient } from "expo-linear-gradient";


function LoginPage() {
  const navigation = useNavigation();

  return (
    
    <LinearGradient
      // Background Linear Gradient
      locations={[0, 0.47, 1]}
      colors = {['#FFFFFF', '#FEFFF5', '#E0FDD9']}
      style={styles.LinearGradient}>
      

      <View style={styles.viewStyle}>
          <Image
            source={require('./img/frufrog_icon.png')}
            resizeMode='contain'
            style={styles.img}
            /> 
      

          {/* Function call for Sign In button */}
          <SignIn />

          <View style={styles.pageBreak}>
            <View style={styles.lineBreak} />
            <Text style={{width: 50, textAlign: 'center', fontWeight:'bold'}}>OR</Text>
            <View style={styles.lineBreak} />
            </View>

          {/* Function call for Create Account button */}
          <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}
              style={[styles.button, {width: '70%'}]}
          >
              <Text style={styles.textButton}>Create Account</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>© Pond Patrol. All rights reserved.</Text>
      </View>
    </LinearGradient>
  );
}

export default LoginPage;