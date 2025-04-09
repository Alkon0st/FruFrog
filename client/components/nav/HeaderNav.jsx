import * as React from 'react';

// all the pages 
import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'
import AddUser from '../pondFunctions/AddUserFolder/AddUser';
import CreatePage from '../pondFunctions/CreatePondFolder/CreatePage';

import styles from './Nav.style';

import { Pressable, View, Text, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';

function PondPopupOptions () {
    const [modalVisible, setModalVisible] = useState(false);
    const [pondName, setPondName] = useState("Current Pond");

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
            <View>
                {/*The button to summon popup*/}
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textButton}>{pondName} ▼</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default function HeaderNav() {
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

    return (
        <View style={styles.mainView}>
            <View style={styles.buttonRow}>
                {/* profile - pond - settings buttons */}
                <TouchableOpacity onPress={() => setIsProfileModalVisible(true)} style={[styles.button, styles.buttonOpen]}>
                    <Text>Profile</Text>
                </TouchableOpacity>

                <PondPopupOptions />

                <TouchableOpacity onPress={() => setIsSettingsModalVisible(true)} style={[styles.button, styles.buttonOpen]}>
                    <Text>Settings</Text>
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
            />
        </View>
    );
}
