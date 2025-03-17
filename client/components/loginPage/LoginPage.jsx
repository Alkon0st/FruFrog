import { StyleSheet, Text, View, Button } from "react-native";

function LoginPage() {
  return (
      <View style={styles.viewStyle}>
          <Text style={styles.headingStyle}>Welcome Back</Text>
          <Text style={styles.textStyle}>Log in to see what you have toad-do</Text>
          
          {/* Function call for Sign In button */}
          {currentForm === 'Sign In' && (
            <View style={styles.authToggle}>
          <SignIn />
          </View>
          )}
          {/* Function call for Forgot Password button */}
          {currentForm === 'Forgot Password?' && (
            <View style={styles.authToggle}>    
          <ForgotPassword />
          </View>
          )}
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
 
 