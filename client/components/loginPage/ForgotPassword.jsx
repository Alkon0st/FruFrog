import React, {useState} from 'react';
import {Alert, Modal, Text, Pressable, View, Button, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import Select from 'react-select';

function ForgotPasswordFunction() {
  // useState hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState('email');
  const [emailSent, setEmailSent] = useState(false);
  const [securityQuestionVisible, setSecurityQuestionVisible] = useState(false);

  // for form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      securityQuestion: "",
      securityAnswer: ""
    },
  });

  const watchEmail = watch("email");

  // Recovery method options for Select component
  const recoveryOptions = [
    { value: 'email', label: 'Email Recovery' },
    { value: 'phone', label: 'SMS Recovery' },
    { value: 'security', label: 'Security Question' }
  ];

  // Security question options
  const securityQuestions = [
    { value: 'pet', label: 'What was your first pet\'s name?' },
    { value: 'school', label: 'What elementary school did you attend?' },
    { value: 'city', label: 'In what city were you born?' },
    { value: 'mother', label: 'What is your mother\'s maiden name?' }
  ];

  // takes input data and puts it in console
  const onSubmit = (data) => {
    console.log(data);
    
    // Show alert based on recovery method
    if (recoveryMethod === 'email') {
      Alert.alert(
        "Password Reset Email Sent",
        `Instructions have been sent to ${data.email}`,
        [
          { text: "OK", onPress: () => setEmailSent(true) }
        ]
      );
    } else if (recoveryMethod === 'phone') {
      Alert.alert(
        "SMS Sent",
        `A verification code has been sent to ${data.phoneNumber}`,
        [
          { text: "OK", onPress: () => setModalVisible(true) }
        ]
      );
    } else if (recoveryMethod === 'security') {
      if (data.securityAnswer.toLowerCase() === 'correct') { // Just for demonstration
        setModalVisible(true);
      } else {
        Alert.alert(
          "Incorrect Answer",
          "The answer to your security question is incorrect.",
          [
            { text: "Try Again" }
          ]
        );
      }
    }
  };

  // Handle recovery method change
  const handleRecoveryMethodChange = (selectedOption) => {
    setRecoveryMethod(selectedOption.value);
    setSecurityQuestionVisible(selectedOption.value === 'security');
    reset({
      email: watchEmail,
      phoneNumber: "",
      securityQuestion: "",
      securityAnswer: ""
    });
  };

  // Return to login page function (simulated)
  const returnToLogin = () => {
    Alert.alert(
      "Return to Login",
      "Navigating back to login page...",
      [
        { text: "OK" }
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <Text style={styles.headingStyle}>Forgot Password</Text>
          
          {!emailSent && (
            <>
              <Text style={styles.subtitleStyle}>
                Select a method to recover your password
              </Text>
              
              <View style={styles.selectContainer}>
                <Text style={styles.textStyle}>Recovery Method:</Text>
                <Select
                  options={recoveryOptions}
                  defaultValue={recoveryOptions[0]}
                  onChange={handleRecoveryMethodChange}
                  styles={selectStyles}
                />
              </View>
              
              {recoveryMethod === 'email' && (
                <>
                  <Text style={styles.textStyle}>Enter your email:</Text>
                  <Controller
                    control={control}
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInputStyle}
                        placeholder="Email here..."
                        placeholderTextColor="#A0A0A0"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    )}
                    name="email"
                  />
                  {errors.email && <Text style={styles.warningText}>{errors.email.message}</Text>}
                </>
              )}
              
              {recoveryMethod === 'phone' && (
                <>
                  <Text style={styles.textStyle}>Enter your phone number:</Text>
                  <Controller
                    control={control}
                    rules={{ 
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit phone number"
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInputStyle}
                        placeholder="Phone number here..."
                        placeholderTextColor="#A0A0A0"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="phone-pad"
                      />
                    )}
                    name="phoneNumber"
                  />
                  {errors.phoneNumber && <Text style={styles.warningText}>{errors.phoneNumber.message}</Text>}
                </>
              )}
              
              {recoveryMethod === 'security' && (
                <>
                  <View style={styles.selectContainer}>
                    <Text style={styles.textStyle}>Security Question:</Text>
                    <Controller
                      control={control}
                      rules={{ required: "Please select a security question" }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={securityQuestions}
                          onChange={(selectedOption) => onChange(selectedOption.value)}
                          value={securityQuestions.find(option => option.value === value)}
                          placeholder="Select a security question"
                          styles={selectStyles}
                        />
                      )}
                      name="securityQuestion"
                    />
                  </View>
                  {errors.securityQuestion && <Text style={styles.warningText}>{errors.securityQuestion.message}</Text>}
                  
                  <Text style={styles.textStyle}>Your Answer:</Text>
                  <Controller
                    control={control}
                    rules={{ required: "Answer is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInputStyle}
                        placeholder="Answer here..."
                        placeholderTextColor="#A0A0A0"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name="securityAnswer"
                  />
                  {errors.securityAnswer && <Text style={styles.warningText}>{errors.securityAnswer.message}</Text>}
                </>
              )}
              
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                
                <Pressable
                  style={styles.cancelButton}
                  onPress={returnToLogin}
                >
                  <Text style={styles.cancelButtonText}>Return to Login</Text>
                </Pressable>
              </View>
            </>
          )}
          
          {emailSent && (
            <View style={styles.emailSentContainer}>
              <Text style={styles.successText}>
                Password reset email sent!
              </Text>
              <Text style={styles.instructionText}>
                Please check your inbox and follow the instructions in the email to reset your password.
              </Text>
              <Text style={styles.noteText}>
                If you don't see the email, check your spam folder.
              </Text>
              <TouchableOpacity
                style={styles.returnButton}
                onPress={returnToLogin}
              >
                <Text style={styles.buttonText}>Return to Login</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Modal for verification code or new password setup */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  {recoveryMethod === 'phone' ? 'Enter Verification Code' : 'Set New Password'}
                </Text>
                
                {recoveryMethod === 'phone' ? (
                  <TextInput
                    style={styles.codeInput}
                    placeholder="6-digit code"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                ) : (
                  <>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="New Password"
                      placeholderTextColor="#A0A0A0"
                      secureTextEntry={true}
                    />
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Confirm New Password"
                      placeholderTextColor="#A0A0A0"
                      secureTextEntry={true}
                    />
                  </>
                )}
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={() => {
                      setModalVisible(false);
                      Alert.alert(
                        "Success",
                        recoveryMethod === 'phone' 
                          ? "Phone number verified. You can now reset your password."
                          : "Password has been reset successfully. You can now log in with your new password.",
                        [{ text: "OK" }]
                      );
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {recoveryMethod === 'phone' ? 'Verify' : 'Reset Password'}
                    </Text>
                  </TouchableOpacity>
                  
                  <Pressable
                    style={styles.cancelModalButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const selectStyles = {
  control: (base) => ({
    ...base,
    minHeight: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100
  })
};

const styles = {
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitleStyle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  textStyle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  textInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  warningText: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16,
  },
  selectContainer: {
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  codeInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 5,
    width: '60%',
    backgroundColor: '#f9f9f9',
  },
  modalButtons: {
    flexDirection: 'column',
    width: '100%',
  },
  verifyButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  cancelModalButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  emailSentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  returnButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
};

export default ForgotPasswordFunction;