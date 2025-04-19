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
                    <Text style={styles.headingStyle}> Add New Pond </Text>
                    <Text style={styles.textStyle}>Pond Name:</Text>
                    <TextInput
                        style = {styles.textInputStyle}
                        placeholder="Pond's name here..."
                        placeholderTextColor="#A0A0A0"
                        value={newPond}
                        onChangeText={setNewPond}
                    />
                    
                    <Text style={styles.textStyle}>Thumbnail:</Text>
                    <View style={{width: '100%', marginBottom: 20 }}>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5}}
                            style={{marginBottom: 20}}>
                            {thumbnailOptions.map((value) => {
                                const isSelected = newThumbnail === value;
                                return(
                                    <TouchableOpacity
                                    key={value}
                                    style={{
                                        marginRight:10,
                                        padding: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => setNewThumbnail(value)}
                                    >
                                        <View style={{ position: 'relative'}}>
                                            <PondThumbnail selection={value} />
                                            {isSelected && (
                                                <View style = {{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    borderRadius: 30,
                                                    backgroundColor: '#D9D9D980'
                                                }}/>
                                            )

                                            }
                                        </View>
                                    </TouchableOpacity>
                                )}
                            )}
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={handleAddPond}>
                        <Text style={styles.buttonText}> Create Pond </Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </Modal>
    );
};

export default CreatePondModal;