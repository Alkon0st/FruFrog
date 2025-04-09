import React from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import styles from '../CreatePond.style';

const DeletePondModal = ({
    visible,
    onClose,
    selectedPond,
    setSelectedPond,
    handleDeletePond,
}) => {

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.popup}>
                <View style={styles.popupContent}>
                    <Text style={styles.headingStyle}> Delete Pond </Text>
                    <Text style={styles.textStyle}>Pond Name:</Text>
                    <TextInput
                        style = {styles.textInputStyle}
                        placeholder="Pond's name here..."
                        placeholderTextColor="#A0A0A0"
                        value={selectedPond}
                        onChangeText={setSelectedPond}
                    />
                    <Button style={[styles.button, styles.buttonOpen]} title="Delete" onPress={handleDeletePond} />
                    <Button style={[styles.button, styles.buttonOpen]} title="Cancel" onPress={onClose} />
                </View>
            </View>            
        </Modal>
    );
};

export default DeletePondModal;