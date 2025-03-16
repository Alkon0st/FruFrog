import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Button } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import Select from 'react-select';


function CreatePond() {
  //for sample options
  let options = [
      {value: '1', label: 'option 1'},
      {value: '2', label: 'option 2'},
      {value: '3', label: 'option 3'},
      {value: '4', label: 'option 4'},
  ]

  //for form
  const {
      control, 
      handleSubmit,
      formState: {errors},
  } = useForm({
      defaultValues: {
          groupName: "",
      },
  })

  //takes input data and puts it in console
  const onSubmit = (data) => console.log(data)

  return (
    <View>
      <Text style={styles.headingStyle}>Create Pond</Text> 
      <Text style ={styles.textStyle}>Enter Pond Name:</Text>
      <Controller
          control={control}
          rules={{required: true,}}
          render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
              style = {styles.textInputStyle}
              placeholder="Pond's name here..."
              placeholderTextColor="#A0A0A0"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
          />
          )}
          name="groupName"
      />
      {errors.groupName && <Text style = {styles.warningText}> This is required.</Text>}
      
      <Text style ={styles.textStyle}>Choose Pond Thumbnail:</Text>
      <Controller
          control={control}
          rules={{required: true,}}
          name="thumbnail"
          render= {({ field: {onChange, onBlur, value} }) => (
              <Select
                  options={options}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
              />
      )} 
      />
      {errors.thumbnail && <Text style = {styles.warningText}> This is required.</Text>} 

      <Button style={styles.buttonOpen} textInputStyle={styles.textButton} title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const DropDown = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView> 
        {/*The popart part*/}
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
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textButton}>Hide</Text>
              </Pressable>
              <CreatePond />
            </View>
          </View>
        </Modal>
        {/*The button to summon popup*/}
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textButton}>Create Pond</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

// styles storage: to call do ex: styles.dropdown
const styles = StyleSheet.create({
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

export default DropDown;