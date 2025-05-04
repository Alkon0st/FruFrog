import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './modalStyles';

const CategoryModal = ({ visible, onClose, value, onChange, onSubmit }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add Category</Text>
        <TextInput
          placeholder="Category Name"
          value={value}
          onChangeText={onChange}
          style={styles.input}
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default CategoryModal;
