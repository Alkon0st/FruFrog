import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const validateUsername = (text) => {
    if (text.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      return false;
    }
    setUsernameError('');
    return true;
  };
  
  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };
  
  const validatePassword = (text) => {
    if (text.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };
  const handleSubmit = () => {
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      setShowSuccess(true);
      setTimeout(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.registerContainer}>
          <View style={styles.registerForm}>
            <Text style={styles.formTitle}>Create Account</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  validateUsername(text);
                }}
              />
              {usernameError ? (
                <Text style={styles.errorMessage}>{usernameError}</Text>
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  validateEmail(text);
                }}
              />
              {emailError ? (
                <Text style={styles.errorMessage}>{emailError}</Text>
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  validatePassword(text);
                }}
              />
              {passwordError ? (
                <Text style={styles.errorMessage}>{passwordError}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.submitBtnText}>Register</Text>
            </TouchableOpacity>
            
            {showSuccess && (
              <Text style={styles.successMessage}>
                Account created successfully!
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  registerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  registerForm: {
    backgroundColor: '#f9f9f9',
    padding: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#555',
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 16,
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 5,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    textAlign: 'center',
    color: '#28a745',
    marginTop: 15,
    fontSize: 16,
  },
});
export default CreateAccount;
