import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { renamePond } from './CreatePondFolder/ponds';
import styles from '../settings/SettingsPage.style';
import PondThumbnail from './img/pondThumbnail';

// change current pond name
export default function EditPond ({ 
    pondName, 
    setPondName, 
    thumbnail,
    setThumbnail,
    triggerUpdate, 
    visible }) {
    const [ newPondName, setNewPondName ] = useState(pondName);
    const [ newThumbnail, setNewThumbnail ] = useState(thumbnail);

    const handleRenamePond = () => {
        if (newPondName && newPondName !== pondName) {
            renamePond(pondName, newPondName);
            setPondName(newPondName);
            triggerUpdate()
        }
    }

    if (!visible) return null;

    return (
        <View style={styles.dropDownContainer}>
            {/* Change Thumbnail */}
            <Text style={styles.dropDownHeader}>Pond Thumbnail</Text>
            <View style={styles.dropDownItem}>
                
            </View>

            {/* Change Pond Name */}
            <Text style={styles.dropDownHeader}>Pond Name</Text>
            <View style={styles.dropDownItem}>
                <TextInput
                    value={newPondName}
                    onChangeText={setNewPondName}
                    style={styles.input}
                />
                <Image 
                    source={require('../img/pencil.png')}
                    resizeMode='contain'
                    style={styles.icon} />
            </View>

            {/* Confirm Changes */}
            <TouchableOpacity 
            onPress={handleRenamePond}
            style={styles.confirmButton}> 
                <Text style={styles.confirmText}> Confirm All Changes </Text> 
            </TouchableOpacity>
        </View>    
    )
};