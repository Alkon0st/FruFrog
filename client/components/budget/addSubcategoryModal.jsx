import React from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import styles from "./budgetPage.style";

const AddSubcategoryModal = ({
    visible,
    onClose,
    selectedCategory,
    newSubCategory,
    setNewSubCategory,
    newSubCategoryAmount,
    setNewSubCategoryAmount,
    handleAddNewSubCategory
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
                    <Text style={styles.modalTitle}>Add Subcategory to {selectedCategory}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="New Subcategory"
                        value={newSubCategory}
                        onChangeText={setNewSubCategory}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={newSubCategoryAmount}
                        onChangeText={setNewSubCategoryAmount}
                        keyboardType="numeric"
                    />
                    <Button title="Add" onPress={handleAddNewSubCategory} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default AddSubcategoryModal;