import React, {useState} from 'react';
import {Pressable, Modal, StyleSheet, Text, View, Button, Dimensions, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ant-design';

import AddUser from '../pondFunctions/AddUser';
import CreatePage from '../pondFunctions/CreatePondFolder/CreatePage';
import HeaderButton from '../nav/HeaderNav';

function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pondName, setPondName] = useState("Current Pond");

    return (
        <SafeAreaProvider>
        <SafeAreaView style ={styles.viewStyle}>
        <LinearGradient
            colors = {['#F1FEFE', '#B2F0EF']}
            style = {styles.page}
        >
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
                <View style={styles.buttonRow}>
                    {/* Function to call for create pond */}
                    <AddUser />
                    <CreatePage /> 
                </View>
                </View>
            </View>
            </Modal>

            <ScrollView>
                <View>
                    {/*The button to summon popup*/}
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textButton}>{pondName} ▼</Text>
                    </Pressable>
                </View>

                <Text style ={styles.headingStyle}>Home Page</Text>
                <Text style ={styles.textStyle}>This is the placeholder for the home page </Text>                 
            </ScrollView>
        </LinearGradient>

        </SafeAreaView>
        </SafeAreaProvider>

    );
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    viewStyle: {
        display: 'flex',
        justifyConten: 'center',
        alignItems: 'stretch',
        flex: 1,
    },
    textStyle: {
        fontSize: 20,
        color: '#309c61',
        textAlign: 'center',
    },
    headingStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingTop: '10px',
    },
    page: { 
        flexDirection: 'column', 
        flex: 1,
        justifyContent:'flex-end',
        backgroundColor: 'white',
    },
    mainView: {
      flex: 1,
      justifyContent: 'top',
      alignItems: 'center',
      backgroundColor: 'rgba(179, 228, 183, 0.5)'
    },
    modalView: {
      backgroundColor: 'white',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
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
      width: width,
      alignSelf: 'flex-start',
    },
    button: {
        margin: 5,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#89d149',
        alignItems: 'center',
        flex: 1,
    },
});

export default HomePage