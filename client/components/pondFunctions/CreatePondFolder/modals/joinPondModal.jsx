import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image } from 'react-native';
import styles from '../CreatePond.style';

const JoinPondModal = ({
    visible,
    onClose,
}) => {

    return (
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
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.joinButton}>
                            <Image 
                                source={require('../../../img/checkmark.png')}
                                resizeMode='contain'
                                style={styles.imgCheckmark} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>            
        </Modal>
    );
};

export default JoinPondModal;