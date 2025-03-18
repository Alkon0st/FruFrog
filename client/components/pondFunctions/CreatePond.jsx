import React, {useState} from 'react';
import {Alert, Modal, Text, Pressable, View, Button } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import Select from 'react-select';

import styles from './CreatePond.style';

function CreatePondFunction() {
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
  const onSubmit = (data) => console.log(data.groupName)
  //const onSubmit = (data) => setPondName(data.groupName)

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

const CreatePond = () => {
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
              <CreatePondFunction />
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

export default CreatePond;