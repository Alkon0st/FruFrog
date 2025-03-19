import { useState } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, ScrollView, Pressable } from "react-native";
import pondList from './ponds';
import CreatePondModal from './modals/createPondModal';

import styles from './CreatePond.style';

const CreatePage = () => {
    const [isCreatePondModalVisible, setIsCreatePondModalVisible] = useState(false);
    const [newPond, setNewPond] = useState('');
    const [newThumbnail, setNewThumbnail] = useState('');

    const handleAddPond = () => {
        if (newPond) {
            pondList[newPond] = [];
            pondList[newPond].push({name: "Thumbnail", list: [newThumbnail]});
            pondList[newPond].push({name: "Members", list: ["You"]});

            setIsCreatePondModalVisible(false);
            setNewPond('');
            setNewThumbnail('');
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <TouchableOpacity onPress={() => setIsCreatePondModalVisible(true)} style={[styles.button, styles.buttonOpen]}>
                        <Text style={styles.textButton}>Create Pond</Text>
                    </TouchableOpacity>
                </View>
                {Object.keys(pondList).map((pond) => (
                    <View key={pond} style={styles.pondView}>
                            <Text style={styles.pondName}>
                                {pond}
                            </Text>
                            {pondList[pond].map((detail) => (    
                                <View key={detail.name} style={styles.pondSubView}>
                                    <Text style={styles.pondLabel}>
                                        {/* Displays thumbnail & members */}
                                        {detail.name}: 
                                    </Text>
                                    <Text style={styles.pondDetail}>
                                        {detail.list.map((item) => <Text>{item}, </Text>)}
                                    </Text>
                                </View> 
                            ))}
                    </View>
                ))}
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
        </SafeAreaView>
    );
};

export default CreatePage;