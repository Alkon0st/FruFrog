import React from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import styles from "../budgetPage.style";

const EditSubcategoryModal = ({
    visible,
    onClose,
    selectedSubcategory,
    updatedSubCategoryName,
    setUpdatedSubCategoryName,
    updatedSubCategoryAmount,
    setUpdatedSubCategoryAmount,
    handleUpdateSubCategory
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
                    <Text style={styles.modalTitle}>Edit Subcategory</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Subcategory Name"
                        value={updatedSubCategoryName}
                        onChangeText={setUpdatedSubCategoryName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        value={updatedSubCategoryAmount}
                        onChangeText={setUpdatedSubCategoryAmount}
                        keyboardType="numeric"
                    />
                    <Button title="Update" onPress={handleUpdateSubCategory} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default EditSubcategoryModal;