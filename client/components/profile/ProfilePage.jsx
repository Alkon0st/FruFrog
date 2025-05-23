import {Text, View, TouchableOpacity, Modal, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import styles from './ProfilePage.style';
import ProfilePicture from './img/profilePicture';
import { useNavigation, CommonActions } from "@react-navigation/native";

import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, arrayRemove, arrayUnion, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase'

const SuccessMessage = ({visible}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
        >
        <View style={styles.successContainer}>
            <View style={styles.successView}>
                <Text style={styles.successText}> Saved Successfully </Text>
                <Image 
                    source={require('../img/checkmark.png')}
                    resizeMode='contain'
                    style={styles.successCheckmark}
                />
            </View>
        </View>
        </Modal>
    )
}

const ProfilePage = ({
    profile,
    setProfile,
    visible,
    onClose,
    }) => {

    const navigation = useNavigation();
    const [successVisible, setSuccessVisible] = useState(false);
    const [username, setUsername] = useState('');

    const [ newProfile, setNewProfile ] = useState(profile);
    const [ selectedProfile, setSelectedProfile ] = useState(profile);
    let ProfileOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    //So that the current pfp appears at the top upon booting this page
    useEffect(() => {
        if (visible) {
            setSelectedProfile(profile);
            setNewProfile(profile);
        }
    }, [visible, profile])

    useEffect(() => {
        const fetchUsername = async () => {
            const auth = getAuth()
            const user = auth.currentUser
            if(!user) return

            try {
                const usersRef = collection(db, 'users')
                const q = query(usersRef, where('user_uid', '==', user.uid))
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data()
                    setUsername(userData.username)
                } else {
                    console.warn('User not found in users collection.')
                }
            } catch (error) {
                console.error('Error fetching username:', error)
            }
        }

        if (visible) {
            fetchUsername()
        }
    }, [visible])
    
    return (
        <Modal 
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
        >
        <LinearGradient
            colors = {['#F1FEFE', '#B2F0EF']}
            style = {styles.page}
        >
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity 
                    onPress={onClose}>
                    <Text style={styles.buttonText}> ◀ </Text>
                </TouchableOpacity>
                
                <View style={styles.header}>
                    <Text style={styles.headingStyle}> Avatar Selection </Text>
                </View>

                {/* This is an attempt to balance the header layout */}
                <View style={{ width: 50 }} /> 
            </View>

            {/* Main portion of profile */}
            <View style={styles.container}>
                {/* Top Part that shows Selected Profile */}
                <View style={styles.currentProfileContainer}> 
                    <ProfilePicture 
                        selection={selectedProfile} 
                        optionalStyle={{width: 100, height: 100}}
                        optionalOutlineStyle={{width: 101, height: 101}} 
                    />
                    <Text style={styles.currentUsername}>{username}</Text>
                </View>
                <View style={styles.contentContainer}>
                    {ProfileOptions.map((value) => {
                        const isSelected = newProfile === value;
                        return(
                            <TouchableOpacity
                            key={value}
                            style={styles.editProfileButton}
                            onPress={() => {
                                setNewProfile(value) //stores value for submit button
                                setSelectedProfile(value) //updates the image at the top
                            }}
                            >
                                <View style={styles.selectionContainer}>
                                    <ProfilePicture selection={value} optionalStyle={{width: 60, height: 60}}/>
                                    {isSelected && (
                                        // doing this makes it so it goes on top, idk why ¯\(°_o)/¯
                                        <>
                                            <View style = {styles.selectedOverlay}/>
                                            <Image
                                                source={require('../img/checkmark.png')}
                                                style={styles.checkmark}
                                            />
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    )}
                </View>

                {/* Confirm Change */}
                <View>
                    <TouchableOpacity
                        style={styles.confirmButton}

                        // Deletes instance of uid within the current profile document
                            // then adds uid to new profile document
                        onPress={async () => {
                            const auth = getAuth()
                            const user = auth.currentUser

                            if (!user) return;

                            try {
                                //finds current profile doc w/ uid
                                const q = query(collection(db, 'profiles'), where('members', 'array-contains', user.uid))
                                const querySnapshot = await getDocs(q)

                                if (!querySnapshot.empty) {
                                    const currentDoc = querySnapshot.docs[0]
                                    const currentDocRef = doc(db, 'profiles', currentDoc.id)
                                    
                                    //deletes uid from current profile doc
                                    await updateDoc(currentDocRef, {
                                    members: arrayRemove(user.uid)
                                });
                                }
                                else (
                                    console.warn('No profile document found with this user. [IGNORED]')
                                )

                                //find profile doc w/ respective profile_id
                                const targetQuery = query(collection(db, 'profiles'), where('profile_id', '==', newProfile))
                                const targetSnapshot = await getDocs(targetQuery)

                                if (targetSnapshot.empty) {
                                    console.error('No profile document found with selected profile_id.')
                                    return;
                                }

                                const targetDoc = targetSnapshot.docs[0]
                                const targetDocRef = doc(db, 'profiles', targetDoc.id)

                                //add user's uid to the profile doc members array
                                await updateDoc(targetDocRef, {
                                    members: arrayUnion(user.uid)
                                });

                                setSelectedProfile(newProfile); //just to update what is current selected
                                setProfile(newProfile); //updates pfp in HeaderNav
                                //shows success msg then closes
                                setSuccessVisible(true);
                                setTimeout(() => {
                                    setSuccessVisible(false);
                                    onClose();
                                }, 2000); // 2 seconds
                            } catch (error) {
                                console.error('Error updating profile picture:', error)
                            }
                        }}
                    >
                        <Text style={styles.confirmText}> Change Profile Picture </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* BOTTOM CONTENT */}
            <View>
                {/* LOGOUT BUTTON */}
                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={() => {navigation.dispatch(
                        CommonActions.reset({
                            index:0,
                            routes: [{name:'Login'}],
                        })
                    );
                }}
                >
                    <View style={styles.logOutContent}>
                        <Image
                            source={require('../img/logout.png')}
                            style={styles.logOutImg}
                        />
                        <Text style={styles.logOutText}>Log Out</Text>
                    </View>
                </TouchableOpacity>

                {/* FOOTER */}
                <Text style={styles.footer}>© Pond Patrol. All rights reserved.</Text>
            </View>

            <SuccessMessage visible={successVisible}/>
            
        </LinearGradient>
        </Modal>
    );
}

export default ProfilePage