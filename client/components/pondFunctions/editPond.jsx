import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { renamePond } from './CreatePondFolder/ponds';

// change current pond name
export default function ChangePondName (
    { pondName, setPondName, triggerUpdate, visible }) {
    const [ newPondName, setNewPondName ] = useState(pondName);

    const handleRenamePond = () => {
        if (newPondName && newPondName !== pondName) {
            renamePond(pondName, newPondName);
            setPondName(newPondName);
            triggerUpdate()
        }
    }

    if (!visible) return null;

    return (
        <View>
            <Text>Change Pond Name:</Text>
            <TextInput
                value={newPondName}
                onChangeText={setNewPondName}
            />
            <Button title="Rename" onPress={handleRenamePond} />
        </View>    
    )
};

const styles = StyleSheet.create({

});