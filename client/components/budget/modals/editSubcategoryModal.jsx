import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './modalStyles';

const EditSubcategoryModal = ({ visible, onClose, name, amount, onChangeName, onChangeAmount, onSubmit }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Edit Subcategory</Text>
        <TextInput
          placeholder="Subcategory Name"
          value={name}
          onChangeText={onChangeName}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={onChangeAmount}
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default EditSubcategoryModal;
