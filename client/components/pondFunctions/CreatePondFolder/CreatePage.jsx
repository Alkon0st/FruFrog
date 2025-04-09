import { useState } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, ScrollView, Pressable } from "react-native";
import pondList from './ponds';
import CreatePondModal from './modals/createPondModal';
import DeletePondModal from './modals/deletePondModal';

import styles from './CreatePond.style';

const CreatePage = ({ triggerUpdate }) => {
    const [isCreatePondModalVisible, setIsCreatePondModalVisible] = useState(false);
    const [newPond, setNewPond] = useState('');
    const [newThumbnail, setNewThumbnail] = useState('1');

    const [isDeletePondModalVisible, setIsDeletePondModalVisible] = useState(false);
    const [selectedPond, setSelectedPond] = useState('');

    const handleAddPond = () => {
        if (newPond) {
            pondList[newPond] = [];
            pondList[newPond].push({name: "Thumbnail", list: [newThumbnail]});
            pondList[newPond].push({name: "Members", list: ["You"]});

            triggerUpdate();
            setIsCreatePondModalVisible(false);
            setNewPond('');
            setNewThumbnail('1');
        }
    };

    const handleDeletePond = () => {
        if (selectedPond) {
            delete pondList[selectedPond];

            triggerUpdate();
            setIsDeletePondModalVisible(false);
            setSelectedPond('');
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={() => setIsCreatePondModalVisible(true)} style={[styles.button, styles.buttonOpen]}>
                        <Text style={styles.textButton}>Create Pond</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setIsDeletePondModalVisible(true)} style={[styles.button, styles.buttonOpen]}>
                        <Text style={styles.textButton}>Delete Pond</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            <CreatePondModal
                visible={isCreatePondModalVisible}
                onClose={() => setIsCreatePondModalVisible(false)}
                newPond={newPond}
                setNewPond={setNewPond}
                newThumbnail={newThumbnail}
                setNewThumbnail={setNewThumbnail}
                handleAddPond={handleAddPond}
            />

            <DeletePondModal 
                visible={isDeletePondModalVisible}
                onClose={() => setIsDeletePondModalVisible(false)}
                selectedPond={selectedPond}
                setSelectedPond={setSelectedPond}
                handleDeletePond={handleDeletePond}/>
        </SafeAreaView>
    );
};

export default CreatePage;