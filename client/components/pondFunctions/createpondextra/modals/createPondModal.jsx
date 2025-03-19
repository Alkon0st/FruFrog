import React from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import styles from '../../CreatePond.style';

const CreatePondModal = ({
    visible,
    onClose,
    newPond,
    setNewPond,
    newThumbnail,
    setNewThumbnail,
    handleAddPond,
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
                <Text style={styles.headingStyle}> Add New Pond </Text>
                <Text style={styles.textStyle}>Pond Name:</Text>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Pondname"
                    value={newPond}
                    onChangeText={setNewPond}
                />
                
                <Text style={styles.textStyle}>Thumbnail:</Text>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Thumbnail"
                    value={newThumbnail}
                    onChangeText={setNewThumbnail}
                />
                <Button title="Add" onPress={handleAddPond} />
                <Button title="Cancel" onPress={onClose} />
            </View>
        </View>
    </Modal>
    );
};

export default CreatePondModal;