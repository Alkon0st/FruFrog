import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const AddEventModal = ({ visible, onSubmit, onClose }) => {
    useEffect (() => {
        if (visible) {
            const today = new Date();
            const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
            const day = String(today.getDate()).padStart(2, '0');
            const month = months[today.getMonth()];
            const year = today.getFullYear();
            const formattedDate = `${month} ${day}, ${year}`;
            setEventDate(formattedDate);
        }
    }, [visible]);

    // Event values
    const [eventDate, setEventDate] = useState('');
    const [category, setCategory] = useState('Event');
    const [eventTitle, setEventTitle] = useState('');
    const [eventAmount, setEventAmount] = useState('');

    const resetFields = () => {
        setEventTitle('');
        setEventAmount('');
        setCategory('Event...');
        setEventDate('');
        setIsEnabled(false);
    };

    // Create event
    const handleCreatEvent = async () => {
        const amount = parseFloat(eventAmount) || 0;
        const event = 
        {
            title: eventTitle,
            date: eventDate,
            category,
            amount,
        };
        
        try {
            const response = await fetch('http://localhost:5000/api/bills', {
                method: 'POST',
                headers: 
                { 'Content-Type': 'application/json'  },
                body: JSON.stringify(event),
            });

            const data = await response.json();

            if (response.ok) 
            {
                onSubmit && onSubmit(data.event);
                console.log('Event created successfully!');
                resetFields(); 
                onClose(); 
            } 
            else 
            {
                console.error('Failed to create event:', response.statusText);
            }
        }
        catch (error) 
        {
            console.error('Error creating event:', error);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Event</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Event Title"
                        value={eventTitle}
                        onChangeText={setEventTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={eventAmount}
                        onChangeText={setEventAmount}
                    />
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Event" value="Event" />
                        <Picker.Item label="Food" value="Food" />
                        <Picker.Item label="Bill" value="Bill" />
                        <Picker.Item label="Grocery" value="Grocery" />
                        <Picker.Item label="Gas" value="Gas" />
                        <Picker.Item label="Maintenance" value="Maintenance" />
                    </Picker>
                    <TouchableOpacity style={styles.button} onPress={handleCreatEvent}>
                        <Text style={styles.buttonText}>Create Event</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                        <Text style={{color: 'white'}}>✖</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    picker: {
        width: '100%',
        height: 50,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
});

export default AddEventModal;


