import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const AddPond = ( { thumbnail_id, name } ) => {
    const [thumbnail, setThumbnail] = useState(thumbnail_id);
    const [owner, setOwner] = useState('');
    const [pondName, setPondName] = useState(name);
    const [userList, setUserList] = useState('');
    const [budgetList, setBudgetList] = useState('');
    const [billList, setBillList] = useState('');
    const [addCode, setAddCode] = useState('');
    const [message, setMessage] = useState('');  // Add state for message display

    // handle form submission
    const handleSubmit = async () => {
        try {
            // request to the backend
            const reponse = await axios.post('http://localhost:5000/add', {
                thumbnail: Number(thumbnail),
                owner: owner,
                pondName: pondName,
                userList : userList,
                budgetList : budgetList,
                billList : billList,
                addCode: addCode
            });
            setMessage(Response.data.message);        
        } catch (error) {
            setMessage('Error: ' + error.response?.data?.message || 'Unknown error'); //error handling
        }
    };

    return (
        handleSubmit
    )
};

export default AddPond;