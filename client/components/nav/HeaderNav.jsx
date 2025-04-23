import * as React from 'react';

// all the pages 
import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'
import AddUser from '../pondFunctions/AddUserFolder/AddUser';
import CreatePage from '../pondFunctions/CreatePondFolder/CreatePage';
import PondDisplay from '../pondFunctions/pondDisplay';

import styles from './Nav.style';

import { TouchableOpacity, View, Text, Modal, Image} from 'react-native';
import { useState } from 'react';
import ProfilePicture from '../profile/img/profilePicture';
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
                <View style={[styles.modalView, {paddingTop: 50}]}>
                <View style={styles.buttonRow}>
                    {/* For balance */}
                    <View style={{width:44}} />
                    {/* CLOSE BUTTON */}
                    <TouchableOpacity
                        style={styles.currentPondButton}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.currentPondText}>{pondName} ▲</Text>
                    </TouchableOpacity>
                    {/* ADD USER FUNCTION */}
                    <AddUser 
                        pondName={pondName} 
                    />
                </View>
                <PondDisplay currentPond={pondName}/>
                <View style={styles.buttonRow}>
                    {/* Function to call for create pond */}
                    <CreatePage triggerUpdate={triggerUpdate} currentPond = {pondName} /> 
                </View>
                </View>
            </View>
            </Modal>
            <View>
                {/*The button to summon popup*/}
                <TouchableOpacity
                    style={[styles.currentPondButton]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.currentPondText}>{pondName} ▼</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function HeaderNav() {
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
    const [pondName, setPondName] = useState("Current Pond");
    const [thumbnail, setThumbnail] = useState(1);

    // UNIMPLEMENTED
    const admin = true;

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
                    <ProfilePicture selection={1}/>
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
            pondName={pondName}
            setPondName={setPondName}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            triggerUpdate={triggerUpdate}
            admin={admin}
            />
        </View>
    );
}
