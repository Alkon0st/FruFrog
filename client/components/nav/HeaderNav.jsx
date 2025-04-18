import * as React from 'react';

// all the pages 
import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'
import AddUser from '../pondFunctions/AddUserFolder/AddUser';
import CreatePage from '../pondFunctions/CreatePondFolder/CreatePage';
import PondDisplay from '../pondFunctions/pondDisplay';

import styles from './Nav.style';

import { Pressable, View, Text, TouchableOpacity, Modal, Image, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { renamePond } from '../pondFunctions/CreatePondFolder/ponds';

// change current pond name
function ChangePondName ({ pondName, setPondName, triggerUpdate }) {
    const [ newPondName, setNewPondName ] = useState(pondName);

    const handleRenamePond = () => {
        if (newPondName && newPondName !== pondName) {
            renamePond(pondName, newPondName);
            setPondName(newPondName);
            triggerUpdate()
        }
    }

    return (
        <View style={styles.popup}>
        <View style={styles.popupContent}>
            <Text style={styles.textStyle}>Change Pond Name:</Text>
            <TextInput
                style = {styles.textInputStyle}
                value={newPondName}
                onChangeText={setNewPondName}
            />
            <Button title="Rename" onPress={handleRenamePond} />
        </View>
    </View>      
    )
}

function PondPopupOptions ({triggerUpdate, pondName, setPondName}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
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
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                <Pressable
                    style={styles.currentPondButton}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.currentPondText}>{pondName} ▲</Text>
                </Pressable>
                <PondDisplay key={pondName}/>
                <View style={styles.buttonRow}>
                    {/* Function to call for create pond */}
                    <AddUser />
                    <CreatePage triggerUpdate={triggerUpdate} currentPond = {pondName} /> 
                </View>
                <ChangePondName pondName={pondName} setPondName={setPondName} triggerUpdate={triggerUpdate} />
                </View>
            </View>
            </Modal>
            <View>
                {/*The button to summon popup*/}
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.currentPondText}>{pondName} ▼</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default function HeaderNav() {
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
    const [pondName, setPondName] = useState("Current Pond");

    const [_, forceUpdate] = useState(0);
    const triggerUpdate = () => forceUpdate(prev => prev + 1);

    return (
        <View style={styles.mainView}>
            <View style={styles.buttonRow}>
                {/* settings - pond - profile buttons */}
                <TouchableOpacity onPress={() => setIsSettingsModalVisible(true)} style={[
                    styles.button, 
                    styles.buttonOpen, 
                    {borderRadius: '100%'},
                    ]}>
                    <Image
                    source={require('./img/settings_icon.png')}
                    tintColor={'#FFFFFF'}
                    resizeMode='contain'
                    style={[
                        {width: 35},
                        {height: 35}, 
                    ]}
                    />
                </TouchableOpacity>
                
                <PondPopupOptions 
                    triggerUpdate={triggerUpdate}             
                    pondName={pondName} 
                    setPondName={setPondName}
                    />

                <TouchableOpacity onPress={() => setIsProfileModalVisible(true)}
                    style={{
                        marginLeft: '10px',
                        marginRight: '10px',}}>
                    <Image
                        source={require('../profile/img/1.png')}
                        resizeMode='contain'
                        style={[
                            {width: 60},
                            {height: 60},
                            {position: 'absolute'},
                        ]}
                        />
                    <View style={{
                        position: 'relative',
                        borderWidth: 3, 
                        borderRadius: 30,
                        borderColor: '#4F723A',
                        width: 61,
                        height: 61,
                        }}/>
                </TouchableOpacity>

            </View>

            {/* Hidden Modals until called for profile and settings
                */}
            <ProfilePage
            visible={isProfileModalVisible}
            onClose={() => setIsProfileModalVisible(false)} 
            />
            <SettingsPage
            visible={isSettingsModalVisible}
            onClose={() => setIsSettingsModalVisible(false)} 
            currentPond={pondName}
            />
        </View>
    );
}
