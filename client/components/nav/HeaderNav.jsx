import * as React from 'react';
import { TouchableOpacity, View, Text, Modal, Image} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';


// all the pages 
import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'
import AddUser from '../pondFunctions/AddUserFolder/AddUser';
import CreatePage from '../pondFunctions/CreatePondFolder/CreatePage';
import PondDisplay from '../pondFunctions/pondDisplay';

import styles from './Nav.style';
import ProfilePicture from '../profile/img/profilePicture';

function PondPopupOptions ({
    triggerUpdate, 
    triggerUpdateCount, 
    pondName, 
    setPondName,
    modalVisible,
    setModalVisible
}) {
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
                <View style={[styles.modalView, {paddingTop: 55}]}>
                <View style={styles.buttonRow}>
                    {/* For balance */}
                    <View style={{width:50}} />
                    {/* CLOSE BUTTON */}
                    <TouchableOpacity
                        style={styles.currentPondButton}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <View style={styles.currentPondView}>
                            <Text style={styles.currentPondText}>{pondName}</Text>
                            <Text style={styles.currentPondText}>▲</Text>
                        </View>
                    </TouchableOpacity>
                    {/* ADD USER FUNCTION */}
                    <AddUser 
                        pondName={pondName} 
                    />
                </View>
                <PondDisplay 
                    updateTrigger={triggerUpdateCount}
                    setPondName = {setPondName}
                />
                <View style={styles.buttonRow}>
                    {/* Function to call for create pond */}
                    <CreatePage 
                        triggerUpdate={triggerUpdate} 
                        currentPond = {pondName} 
                        setPondName={setPondName}
                    /> 
                </View>
                </View>
            </View>
            </Modal>
            <View>
                {/*The button to summon popup*/}
                <TouchableOpacity
                    style={[styles.currentPondButton]}
                    onPress={() => setModalVisible(true)}>
                    <View style={styles.currentPondView}> 
                        <Text style={styles.currentPondText}>{pondName}</Text>
                        <Text style={styles.currentPondText}>▼</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function HeaderNav() {
    const [modalVisible, setModalVisible] = useState(false);
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
    const [pondName, setPondName] = useState('');
    const [thumbnail, setThumbnail] = useState(1);
    const [profileId, setProfileId] = useState(1); //default 1 if no set
    const [currentPond, setCurrentPond] = useState(null);

    const [triggerUpdateCount, setTriggerUpdateCount] = useState(0);
    const triggerUpdate = () => setTriggerUpdateCount(prev => prev + 1);

    // finds which profile the user currently has
    useEffect(() => {
        const fetchUserProfile = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if(!user) return;

            try {
                const q = query(
                    collection(db, "profiles"),
                    where("members", "array-contains", user.uid)
                );
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const profileData = querySnapshot.docs[0].data();
                    setProfileId(profileData.profile_id || 1);
                }
            } catch (error) {
                console.error('Failed to fetch profile id:', error);
            }
        };

        fetchUserProfile();
    }, []);

    // finds which pond user is currently selecting
    useFocusEffect(
        useCallback(() => {
            const fetchSelectedPond = async () => {
                const auth = getAuth()
                const user = auth.currentUser
                if (!user) return;

                try {
                    //fetch user doc
                    const userDocRef = doc(db, 'users', user.uid)
                    const userDoc = await getDoc(userDocRef)

                    if (!userDoc.exists()) {
                        console.log('User document not found.')
                        setCurrentPond(null) //no current pond
                        setPondName('')
                        return
                    }

                    const currentPondId = userDoc.data().currentPondId
                    if (!currentPondId) {
                        console.log('No current pond selected.')
                        setCurrentPond(null)
                        setPondName('')
                    }

                    //fetch pond doc w/ ID
                    const pondDocRef = doc(db, 'ponds', currentPondId)
                    const pondDoc = await getDoc(pondDocRef)

                    if (pondDoc.exists()){
                        const pondData = pondDoc.data()
                        setCurrentPond(currentPondId)
                        setPondName(pondData.name || 'Unnamed Pond')
                    } 
                    else {
                        console.log('Pond not found')
                        setCurrentPond(null)
                        setPondName('')
                    }
                } catch (error) {
                    console.error('Failed to fetch current pond:', error)
                    setCurrentPond(null)
                    setPondName('')
                }
            }

            fetchSelectedPond()
        }, [triggerUpdateCount])
    ) 

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
                    triggerUpdateCount={triggerUpdateCount}        
                    pondName={pondName} 
                    setPondName={setPondName}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    />

                <TouchableOpacity onPress={() => setIsProfileModalVisible(true)}
                    style={{
                        marginLeft: '10px',
                        marginRight: '10px',}}>
                    <ProfilePicture selection={profileId}/>
                </TouchableOpacity>

            </View>

            {/* Hidden Modals until called for profile and settings
                */}
            <ProfilePage
            profile={profileId}
            setProfile={setProfileId}
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
            />
        </View>
    );
}
