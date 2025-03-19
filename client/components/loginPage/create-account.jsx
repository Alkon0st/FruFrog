import React, { useState } from 'react';
import { Alert, Modal, Text, Pressable, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Select from 'react-select';

function CreateAccountFunction({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Form validation
  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    reset
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: ""
    }
  });

  const password = watch("password");

  // Role options for dropdown
  const roleOptions = [
    { value: 'user', label: 'Regular User' },
    { value: 'admin', label: 'Administrator' },
    { value: 'guest', label: 'Guest User' }
  ];

  // Handle form submission
  const onSubmit = (data) => {
    if (!termsAccepted) {
      Alert.alert(
        "Terms & Conditions",
        "Please accept the terms and conditions to continue.",
        [{ text: "OK" }]
      );
      return;
    }

    console.log("Form data:", data);
    
    // Show success modal
    setModalVisible(true);
  };

  // Navigate to login page
  const navigateToLogin = () => {
    reset();
    navigation.navigate('Login');
  };

  // Show terms and conditions
  const showTerms = () => {
    Alert.alert(
      "Terms & Conditions",
      "By creating an account, you agree to our terms of service and privacy policy.",
      [
        { 
          text: "Accept", 
          onPress: () => setTermsAccepted(true)
        },
        {
          text: "Decline",
          onPress: () => setTermsAccepted(false),
          style: "cancel"
        }
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.headingStyle}>Create Account</Text>
            
            {/* First Name Input */}
            <Text style={styles.textStyle}>First Name:</Text>
            <Controller
              control={control}
              rules={{
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters"
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Enter your first name"
                  placeholderTextColor="#A0A0A0"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="firstName"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}
            
            {/* Last Name Input */}
            <Text style={styles.textStyle}>Last Name:</Text>
            <Controller
              control={control}
              rules={{
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters"
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Enter your last name"
                  placeholderTextColor="#A0A0A0"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="lastName"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}
            
            {/* Email Input */}
            <Text style={styles.textStyle}>Email:</Text>
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
                  placeholder="Enter your email"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            
            {/* Phone Number Input */}
            <Text style={styles.textStyle}>Phone Number:</Text>
            <Controller
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
            )}
            
            {/* Role Selection */}
            <Text style={styles.textStyle}>User Role:</Text>
            <View style={styles.selectContainer}>
              <Controller
                control={control}
                rules={{ required: "Please select a role" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={roleOptions}
                    placeholder="Select your role"
                    value={roleOptions.find(option => option.value === value)}
                    onChange={(option) => {
                      onChange(option.value);
                      setSelectedRole(option.value);
                    }}
                    styles={selectStyles}
                  />
                )}
                name="role"
              />
            </View>
            {errors.role && (
              <Text style={styles.errorText}>{errors.role.message}</Text>
            )}
            
            {/* Password Input */}
            <Text style={styles.textStyle}>Password:</Text>
            <View style={styles.passwordContainer}>
              <Controller
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must contain uppercase, lowercase, number and special character"
                  }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!passwordVisible}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
              <Pressable 
                style={styles.visibilityToggle}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Text style={styles.visibilityText}>
                  {passwordVisible ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            
            {/* Confirm Password Input */}
            <Text style={styles.textStyle}>Confirm Password:</Text>
            <View style={styles.passwordContainer}>
              <Controller
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm your password"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry={!confirmPasswordVisible}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="confirmPassword"
              />
              <Pressable 
                style={styles.visibilityToggle}
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                <Text style={styles.visibilityText}>
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </Text>
              </Pressable>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
            )}
            
            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <Pressable
                style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                {termsAccepted && <Text style={styles.checkMark}>✓</Text>}
              </Pressable>
              <Text style={styles.termsText}>
                I agree to the 
                <Text style={styles.termsLink} onPress={showTerms}> Terms & Conditions</Text>
              </Text>
            </View>
            
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.createButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              
              <Button
                title="Already have an account? Log in"
                onPress={navigateToLogin}
                color="#007BFF"
              />
            </View>
          </View>
        </ScrollView>
        
        {/* Success Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Account Created!</Text>
              <Text style={styles.modalText}>
                Your account has been created successfully. Please check your email for verification.
              </Text>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  navigateToLogin();
                }}
              >
                <Text style={styles.buttonText}>Go to Login</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Styles for react-select
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

// Component styles
const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  textStyle: {
    fontSize: 16,
    marginBottom: 5,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  visibilityToggle: {
    position: 'absolute',
    right: 10,
    height: 40,
    justifyContent: 'center',
  },
  visibilityText: {
    color: '#007BFF',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007BFF',
  },
  checkMark: {
    color: 'white',
    fontSize: 14,
  },
  termsText: {
    flex: 1,
    color: '#333',
  },
  termsLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 10,
  },
  createButton: {
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
    padding: 25,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 20,
  },
};
export default CreateAccountFunction;