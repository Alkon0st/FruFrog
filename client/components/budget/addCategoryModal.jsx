import React from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import styles from "./budgetPage.style";

const AddCategoryModal = ({
    visible,
    onClose,
    newCategory,
    setNewCategory,
    handleAddNewCategory
}) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>+</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="New Category"
                        value={newCategory}
                        onChangeText={setNewCategory}
                    />
                    <Button title="Add" onPress={handleAddNewCategory} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default AddCategoryModal;