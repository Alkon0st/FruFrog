import React from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import Select from 'react-select';
import styles from '../CreatePond.style';

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
    let options = [
        {value: '1', label: 'option 1'},
        {value: '2', label: 'option 2'},
        {value: '3', label: 'option 3'},
        {value: '4', label: 'option 4'},
    ]

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
                        style = {styles.textInputStyle}
                        placeholder="Pond's name here..."
                        placeholderTextColor="#A0A0A0"
                        value={newPond}
                        onChangeText={setNewPond}
                    />
                    
                    <Text style={styles.textStyle}>Thumbnail:</Text>
                    <Select
                        options={options}
                        style={styles.textInputStyle}
                        value={options.find(option => option.value === newThumbnail)}
                        onChange={(selectedOption) => setNewThumbnail(selectedOption.value)}
                    />
                    <Button style={[styles.button, styles.buttonOpen]} title="Add" onPress={handleAddPond} />
                    <Button style={[styles.button, styles.buttonOpen]} title="Cancel" onPress={onClose} />
                </View>
            </View>            
        </Modal>
    );
};

export default CreatePondModal;