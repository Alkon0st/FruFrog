import { useState } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, ScrollView, Pressable } from "react-native";
import {db}  from '../../../firebase/firebase';
import { collection, addDoc, doc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import CreatePondModal from './modals/createPondModal';
import JoinPondModal from './modals/joinPondModal';


import styles from './CreatePond.style';

const CreatePage = ({ triggerUpdate, currentPond }) => {
    const [isCreatePondModalVisible, setIsCreatePondModalVisible] = useState(false);
    const [newPond, setNewPond] = useState('');
    const [newThumbnail, setNewThumbnail] = useState('1');

    const [isJoinPondModalVisible, setIsJoinPondModalVisible] = useState(false);

    // const [isDeletePondModalVisible, setIsDeletePondModalVisible] = useState(false);
    const [selectedPond, setSelectedPond] = useState('');

    const handleAddPond = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (newPond) {
            try {
                await addDoc(collection(db, "ponds"), {
                    name: newPond,
                    thumbnail: newThumbnail,
                    owner: user.uid,
                    members: [user.uid],
                    budgets: [],
                    billList: [],
                    createdAt: new Date(),
                    selected: [user.uid],
                });
                triggerUpdate();
                setIsCreatePondModalVisible(false);
                setNewPond('');
                setNewThumbnail('1');
            } catch (error) {
                console.error("Error adding pond: ", error);
                alert("Error creating pond. Please try again.");
            }
        }
    };

    // REMOVED FEATURE
    // const handleDeletePond = async () => {
    //     const auth = getAuth();
    //     const user = auth.currentUser;
    
    //     if (selectedPond === currentPond) {
    //         alert("You can't delete the current pond. (For now).");
    //         return;
    //     }
    
    //     if (!user) {
    //         alert("You must be logged in to delete a pond.");
    //         return;
    //     }
    
    //     try {
    //         // Find the pond by name
    //         const q = query(collection(db, "ponds"), where("name", "==", selectedPond));
    //         const querySnapshot = await getDocs(q);
    
    //         if (!querySnapshot.empty) {
    //             const pondDoc = querySnapshot.docs[0];
    //             const docRef = pondDoc.ref;
    //             const pondData = pondDoc.data();
    
    //             // Check ownership
    //             if (pondData.owner !== user.uid) {
    //                 alert("Only the owner can delete this pond.");
    //                 return;
    //             }
    
    //             await deleteDoc(docRef);
    
    //             triggerUpdate();
    //             setIsDeletePondModalVisible(false);
    //             setSelectedPond('');
    //         } else {
    //             alert("Pond not found.");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting pond: ", error);
    //         alert("Something went wrong while deleting the pond.");
    //     }
    // };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style = {[
                    {flexDirection: 'row'},
                    {justifyContent: 'space-between'},
                    {alignSelf: 'center'},
                ]}>
                    <TouchableOpacity onPress={() => setIsCreatePondModalVisible(true)} style={[styles.button, styles.buttonOpen]}>
                        <Text style={styles.textButton}>Create Pond</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setIsJoinPondModalVisible(true)} style={[styles.button, styles.buttonOpen]}>
                        <Text style={styles.textButton}>Join Pond</Text>
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

            <JoinPondModal
                visible={isJoinPondModalVisible}
                onClose={() => setIsJoinPondModalVisible(false)}
            />

            {/* <DeletePondModal 
                visible={isDeletePondModalVisible}
                onClose={() => setIsDeletePondModalVisible(false)}
                selectedPond={selectedPond}
                setSelectedPond={setSelectedPond}
                handleDeletePond={handleDeletePond}/> */}
        </SafeAreaView>
    );
};

export default CreatePage;