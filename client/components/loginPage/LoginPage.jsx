import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from 'react';

import SignIn from './SignIn';
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
              style={styles.buttonStyle}
          >
              <Text style={styles.textButton}>Create Account</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>© Pond Patrol. All rights reserved.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    pageBreak:{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingBottom: '10%', 
        width: '100%', 
        paddingRight: '10%', 
        paddingLeft: '10%'
    },
    lineBreak:{
        flex: 1, 
        height: 1, 
        backgroundColor: '#000000'
    },
    img: {
        width: 369, 
        height: 232,
        position: 'relative',
    },
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
      width: '70%',
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