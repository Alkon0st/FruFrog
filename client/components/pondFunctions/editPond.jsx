import { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';


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

    useEffect(() => {
        if (visible) {
            setNewThumbnail(thumbnail) // reset thumbnail when modal is open
        }
    }, [visible, thumbnail])

    //for thumbnail options
    let thumbnailOptions = [1,2,3,4,5,6,7,8]
    
    const handleEditPond = () => {
        if ((newPondName && newPondName !== pondName) || newThumbnail !== thumbnail) {

            if (newPondName && newPondName !== pondName) {
                setPondName(newPondName);
            }
            
            if (newThumbnail !== thumbnail) {
                setThumbnail(newThumbnail);
            }

            triggerUpdate()
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
        </View>    
    );
}