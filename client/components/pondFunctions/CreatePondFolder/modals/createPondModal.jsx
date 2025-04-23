import React from 'react';
import { View, Text, TextInput, Button, Modal, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../CreatePond.style';
import PondThumbnail from '../../img/pondThumbnail';

const CreatePondModal = ({
    visible,
    onClose,
    newPond,
    setNewPond,
    newThumbnail,
    setNewThumbnail,
    handleAddPond,
}) => {
    //for sample options
    let thumbnailOptions = [1,2,3,4,5,6,7,8]

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.popup}>
                <View style={styles.popupContent}>
                    <TouchableOpacity onPress={onClose}> 
                        <Text style={{fontSize: 30}}> ◀ </Text>
                    </TouchableOpacity>
                    <Text style={styles.headingStyle}> Create a Pond </Text>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Name Your Pond</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.innerContainer}>
                            <TextInput
                                style = {styles.textInputStyle}
                                placeholder="Pond's name here..."
                                placeholderTextColor="#A0A0A0"
                                value={newPond}
                                onChangeText={setNewPond}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>Choose a Thumbnail</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={[styles.innerContainer, {height: 71, paddingVertical: 0, paddingHorizontal: 5}]}>
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
                                        <View style={{ position: 'relative'}}>
                                            <PondThumbnail selection={value} optionalStyle={{width: 60, height: 60}}/>
                                            {isSelected && (
                                                <View style = {styles.selectedOverlay}/>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                )}
                            )}
                        </ScrollView>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.createButton} onPress={handleAddPond}>
                        <Text style={styles.createText}> Create Pond </Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </Modal>
    );
};

export default CreatePondModal;