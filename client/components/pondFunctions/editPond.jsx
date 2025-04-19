import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { renamePond } from './CreatePondFolder/ponds';
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
            <Text style={styles.header}>Pond Thumbnail</Text>
            <View style={styles.dropDownItem}>
                
            </View>

            {/* Change Pond Name */}
            <Text style={styles.header}>Pond Name</Text>
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

const styles = StyleSheet.create({
    dropDownContainer: {
        padding: 20,
        paddingHorizontal: 40,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#F6F6F6',
    },
    dropDownItem: {
        backgroundColor: '#B2E196',
        borderRadius: 6,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 3, 
        paddingTop: 2, 
        paddingBottom: 2, 
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        minHeight: 32,
        minWidth: 305,
        paddingHorizontal: 10,
        position: 'absolute',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#22470C',
    },
    icon: {
        width: 18,
        height: 18,
        alignSelf: 'flex-end',
        marginRight: 20,
        tintColor: '#22470C',
    },
    confirmButton: {
        backgroundColor: '#85BB65',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#4F723A',
        minHeight: 40,
        minWidth: 164,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});