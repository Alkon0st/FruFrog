import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

function CreateAccountFunction() {
  const { control, handleSubmit, formState: {errors}, watch } = useForm();
  const [username, setUsername] = useState('');
  const [passwordVisible] = useState(false);
  const [confirmPasswordVisible] = useState(false);
  const password = watch('password', '');

  const onsubmit = (data) => {
    console.log('Form Data: ', data);
    alert('Your account has been successfully created.');
  };
  
  return (
    <LinearGradient
      // Background Linear Gradient
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      locations={[0.47, 1]}
      colors={['#FEFFF5', '#E0FDD9']}
      >
      <View style = {styles.viewStyle}>
        <Controller
            control={control}
            rules={{
                required: "Username is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text style={styles.headingStyle}>Username</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter your username"
                        onBlur={onBlur}
                        onChangeText={(text) => {
                            onChange(text);
                            setUsername(text);
                        }}
                        value={value}
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                </>
            )}
            name="username"
          />
          <Controller
            control={control}
            rules={{
                required: "Email is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text style={styles.headingStyle}>Email</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter your email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </>
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
                required: "Password is required",
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text style={styles.headingStyle}>Password</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Enter your password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!passwordVisible}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </>
            )}
            name="password"
          />
          <Controller
            control={control} 
            rules={{
                required: "Incorrect password",
                validate: (value) => value === password || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text style={styles.headingStyle}>Confirm Password</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="Confirm your password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!confirmPasswordVisible}
                    />
                    {errors.confirmPassword && ( <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>)}
                </>
            )}
            name="confirmPassword"
          />
          <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmit(onsubmit)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'left',
      flex: 1,
      backgroundColor: 'white',
      margin: 110,
      padding: 20,
      borderRadius: 5,
  },
  textStyle: {
      fontSize: 12,
      color: 'black',
      marginBottom: 5,
      alignSelf: 'flex-start',
      marginLeft: 30,
  },
  textInputStyle: {
      borderWidth: 1,
      borderColor: '#008000',
      padding: 10,
      width: 170,
      marginBottom: 10,
      borderRadius: 5,
  },
  errorText: {
      color: '#800D00',
      marginBottom: 10,
      alignSelf: 'flex-start',
      marginLeft: 30,
  },
  buttonStyle: {
      backgroundColor: '#85BB65',
      padding: 15,
      borderRadius: 5,
      width: 170,
      alignItems: 'center',
      marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  headingStyle: {
      fontSize: 12,
      color: 'black',
      fontWeight: 'normal',
      textAlign: 'left',
  },
});
export default CreateAccountFunction;