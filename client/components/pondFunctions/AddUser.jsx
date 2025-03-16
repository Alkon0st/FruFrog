import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Button } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import Select from 'react-select';

function AddCodeFunction() {
  return(
    <View>
      <Text> Add by Code Placeholder </Text>
    </View>
  )
}

function AddUserFunction() {
  //for sample options
  let friends = [
      {value: 'AAAA', label: 'AAAA'},
      {value: 'Blip@', label: 'Blip@'},
      {value: 'John_Doe1332', label: 'John_Doe1332'},
      {value: 'musclemanRS', label: 'musclemanRS'},
      {value: 'NaNahopley', label: 'NaNahopley'},
      {value: 'OH_BOI', label: 'OH_BOI'},
      {value: 'SadLad', label: 'SadLad'},
      {value: 'SolarFlareX9', label: 'SolarFlareX9'},
      {value: 'SpendJ5@', label: 'SpendJ5@'},
      {value: 'TEE_HEE', label: 'TEE_HEE'},
      {value: 'Trix_Xx', label: 'Trix_Xx'},
      {value: 'xXMafiaBossXx', label: 'xXMafiaBossXx'},
  ]

  //for form
  const {
      control, 
      handleSubmit,
      formState: {errors},
  } = useForm()

  //takes input data and puts it in console
  const onSubmit = (data) => console.log(data)

  return (
    <View>
      <Text style={styles.headingStyle}>Add to Pond</Text> 
      
      <Text style ={styles.textStyle}>Choose User:</Text>
      <Controller
          control={control}
          rules={{required: true,}}
          name="requested_users"
          render= {({ field: {onChange, onBlur, value} }) => (
              <Select
                placeholder={'Search...'}
                options={friends}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                isMulti={true}
                isSearchable={true}
                maxMenuHeight = {125}
              />
      )} 
      />
      {errors.thumbnail && <Text style = {styles.warningText}> This is required.</Text>} 

      <Button style={styles.buttonOpen} textInputStyle={styles.textButton} title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const AddUser = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userVisible, setUserVisible] = useState(false);
  const [codeVisible, setCodeVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView> 
        {/*Popup for OPTIONS ----------------------------------------------*/}
        <Modal 
          animationType="none"
          transparent = {true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed.');
            setModalVisible(!modalVisible); //changes variable to not visible
          }}>
          {/* The popup itself */}
          <View style={styles.mainView}>
            <View style={styles.modalView}>
              {/* To go back to home */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textButton}>Hide</Text>
              </Pressable>
              {/* To add selection */}
              <View style={styles.fixToText}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setCodeVisible(true)}>
                  <Text style={styles.textButton}>Add User by Code</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setUserVisible(true)}>
                  <Text style={styles.textButton}>Add User by User</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/*Popup for add by User ----------------------------------------------*/}
        <Modal 
          animationType="none"
          transparent = {true}
          visible={userVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed.');
            setUserVisible(!userVisible); //changes variable to not visible
          }}>
          {/* The popup itself */}
          <View style={styles.mainView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setUserVisible(!userVisible)}>
                <Text style={styles.textButton}>Hide</Text>
              </Pressable>
              <AddUserFunction />
            </View>
          </View>
        </Modal>

        {/*Popup for add by CODE ----------------------------------------------*/}
        <Modal 
          animationType="none"
          transparent = {true}
          visible={codeVisible}
          onRequestClose={() => {
            Alert.alert('Modal closed.');
            setCodeVisible(!codeVisible); //changes variable to not visible
          }}>
          {/* The popup itself */}
          <View style={styles.mainView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setCodeVisible(!codeVisible)}>
                <Text style={styles.textButton}>Hide</Text>
              </Pressable>
              <AddCodeFunction />
            </View>
          </View>
        </Modal>

        {/*Add User button ----------------------------------------------*/}
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textButton}>Add User</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

// styles storage: to call do ex: styles.dropdown
const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
    mainView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(179, 228, 183, 0.5)'
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
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
    button: {
      margin: 5,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    warningText: {
      color: '#EF0000',
    },
    headingStyle: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
    },
    textInputStyle: {
      fontSize: 20,
    },
    textStyle: {
      fontSize: 20,
      color: '#309c61',
      marginBottom: 3,
    },
    textButton: {
      margin: 3,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default AddUser;