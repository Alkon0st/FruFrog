import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { db } from '../../../../firebase/firebase';
import { collection, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';

import PondThumbnail from '../../img/pondThumbnail';
import styles from '../CreatePond.style';

const ConfirmJoin = ({visible, onCancel, onConfirm, pondName, thumbnail}) => {
    return (
        <Modal 
            animationType="slide"
            visible={visible}
            transparent = {true}
        >
        <View style={styles.joinModal}>
        <LinearGradient
            locations={[0.13, 0.7]}
            colors = {['#CBFFFF', '#E0FDD9']}
            style={styles.joinModalBackground}
        >
            <Text style={styles.joinHeader}>You will be joining:</Text>
            <View style={styles.joinInnerWrapper}>
                <PondThumbnail 
                    selection={thumbnail}
                    optionalStyle={{
                        width: 141, 
                        height: 141, 
                        borderWidth: 0,
                    }}
                /> 
                <Text style={styles.joinPondName}>{pondName}</Text>
            </View>
            <View style={styles.joinButtonRow}>
                <TouchableOpacity
                    style={[styles.joinButton, styles.joinCancelButton]}
                    onPress={onCancel}
                >
                    <Image 
                        source={require('../../../img/close.png')}
                        resizeMode='contain'
                        style={styles.imgCheckmark} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.joinButton}
                    onPress={onConfirm}
                >
                    <Image 
                        source={require('../../../img/checkmark.png')}
                        resizeMode='contain'
                        style={styles.imgCheckmark} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
        </View>
        </Modal>
    )
}

const JoinPondModal = ({
    visible,
    onClose,
}) => {
    const [codeInput, setCodeInput] = useState('');
    const [errorText, setErrorText] = useState('');
    const [confirmVisible, setConfirmVisible] = useState(false)
    const [targetPond,setTargetPond] = useState(null)

    const handleCodeSubmit = async () => {
        setErrorText('')
        const auth = getAuth()
        const user = auth.currentUser
        if (!user) return

        const snapshot = await getDocs(collection(db, 'ponds'))
        const now = Date.now()
        let found = null
        
        snapshot.forEach((docSnap) => {
            const data = docSnap.data()
            if (
                data.join_code &&
                data.join_code.code === codeInput &&
                data.join_code.expiresAt > now
            ) {
                found = {id: docSnap.id, data}
            }
        })

        if (found) {
            setTargetPond(found)
            setConfirmVisible(true)
        } else {
            setErrorText('Invalid or expired code.')
        }
    }

    const handleJoinConfirm = async () => {
        const auth = getAuth()
        const user = auth.currentUser
        if (!user || !targetPond) return //if no user or no pond found, return

        const pondRef = doc(db, 'ponds', targetPond.id)

        try {
            await updateDoc(pondRef, {
                members: arrayUnion(user.uid),
                selected: arrayUnion(user.uid),
                join_code: {} //deletes the current join code after use
            })
            
            setConfirmVisible(false)
            onClose()
            setCodeInput('')
        } catch (error) {
            console.error('Failed to join the pond', error)
        }
    }

    return (
        // fixes it idk why
        <> 
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.popup}>
                <View style={styles.popupContent}>
                    <TouchableOpacity onPress={onClose}> 
                        <Text style={{fontSize: 30}}> ◀ </Text>
                    </TouchableOpacity>

                    <Text style={styles.headingStyle}> Join a Pond </Text>
                    
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Enter the Invite Code</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.joinInfo}>Ask the Pond Admin for the Invite Code</Text>
                        <View style={styles.innerContainer}> 
                            <TextInput
                                style = {styles.textInputStyle}
                                placeholder="Code here..."
                                placeholderTextColor="#A0A0A0"
                                maxLength={6}
                                value={codeInput}
                                onChangeText={setCodeInput}
                            />
                        </View>

                        {errorText ? (
                            <Text style={styles.joinErrorText}>{errorText}</Text>
                        ) : null}

                        <TouchableOpacity
                            style={styles.joinButton}
                            onPress={handleCodeSubmit}
                        >
                            <Image 
                                source={require('../../../img/checkmark.png')}
                                resizeMode='contain'
                                style={styles.imgCheckmark} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>            
        </Modal>
        {targetPond && (
            <ConfirmJoin
                visible={confirmVisible}
                onCancel={() => setConfirmVisible(false)}
                onConfirm={handleJoinConfirm}
                pondName={targetPond.data.name}
                thumbnail={targetPond.data.thumbnail}
            />
        )}
        </>
    );
};

export default JoinPondModal;