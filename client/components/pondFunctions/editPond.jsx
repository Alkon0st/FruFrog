import { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

import styles from '../settings/SettingsPage.style';
import PondThumbnail from './img/pondThumbnail';

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

export default function EditPond ({ 
    pondName, 
    setPondName, 
    thumbnail,
    setThumbnail,
    triggerUpdate, 
    visible 
}) {
    const [ newPondName, setNewPondName ] = useState(pondName);
    const [ newThumbnail, setNewThumbnail ] = useState(thumbnail);
    const [successVisible, setSuccessVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            setNewThumbnail(thumbnail) // reset thumbnail when modal is open
            setNewPondName(pondName)
        }
    }, [visible, thumbnail, pondName])

    //for thumbnail options
    let thumbnailOptions = [1,2,3,4,5,6,7,8]
    
    const handleEditPond = async () => {
        const auth = getAuth()
        const user = auth.currentUser

        if (!user) return

        try {
            const q = query (
                collection(db, 'ponds'),
                where('selected', 'array-contains', user.uid)
            )
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                Alert.alert('Error', 'No selected pond found.')
                return
            }

            const pondDoc = querySnapshot.docs[0]
            const pondData = pondDoc.data()

            // just in case user somehow passes through the admin check in settings
            if (pondData.owner !== user.uid) {
                Alert.alert('Error', 'Only the pond owner can edit it.')
                return
            }

            const updates = {}
            if (newPondName && newPondName !== pondName) {
                updates.name = newPondName
                setPondName(newPondName)
            }
            if (newThumbnail !== thumbnail) {
                updates.thumbnail = newThumbnail
                setThumbnail(newThumbnail)
            }

            if (Object.keys(updates).length > 0){
                await updateDoc(pondDoc.ref, updates)
                
                //shows success message for 2 seconds
                setSuccessVisible(true);
                setTimeout(() => {
                    setSuccessVisible(false);
                }, 2000);
                
                triggerUpdate()
            } else {
                Alert.alert('Notice', 'No changes to update')
            }
        } catch (error) {
            console.error('Error updating pond:', error)
            Alert.alert('Error', 'Failed to update pond.')
        }
    };

    if (!visible) return null;

    return (
        <View style={styles.dropDownContainer}>
            {/* Change Thumbnail */}
            <View style={styles.menuItem}>
                <Image  
                    source={require('../img/image.png')}
                    resizeMode='contain'
                    style={styles.imgSmall}/>
                <Text style={styles.dropDownHeader}>Pond Thumbnail</Text>
            </View>
            <View style={styles.dropDownItem}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.editThumbnailScrollContent}
                >
                    {thumbnailOptions.map((value) => {
                        const isSelected = newThumbnail === value;
                        return(
                            <TouchableOpacity
                            key={value}
                            style={styles.editThumbnailButton}
                            onPress={() => setNewThumbnail(value)}
                            >
                                <View style={styles.thumbnailSelectionContainer}>
                                    <PondThumbnail selection={value} optionalStyle={{width: 60, height: 60}}/>
                                    {isSelected && (
                                        <>
                                        <View style = {styles.selectedOverlay}/>
                                        <Image
                                            source={require('../img/checkmark.png')}
                                            style = {styles.thumbnailCheckmark}
                                        />
                                        </>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    )}
                </ScrollView>
            </View>

            {/* Change Pond Name */}
            <View style={styles.menuItem}>
                <Image  
                    source={require('../img/signature.png')}
                    resizeMode='contain'
                    style={styles.imgSmall}/>
                <Text style={styles.dropDownHeader}>Pond Name</Text>
            </View>
            <View style={styles.dropDownItem}>
                <TextInput
                    value={newPondName}
                    onChangeText={setNewPondName}
                    style={styles.input}
                    maxLength={15}
                />
                <Image 
                    source={require('../img/pencil.png')}
                    resizeMode='contain'
                    style={styles.icon} />
            </View>

            {/* Confirm Changes */}
            <TouchableOpacity 
            onPress={handleEditPond}
            style={styles.confirmButton}> 
                <Text style={styles.confirmText}> Confirm All Changes </Text> 
            </TouchableOpacity>

            <SuccessMessage visible={successVisible} />
        </View>
    );
}