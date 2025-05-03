import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Make sure the path matches yours
import PondThumbnail from "./img/pondThumbnail";

const PondDisplay = ({ 
    updateTrigger, 
    setPondName,
    setModalVisible, 
}) => {
    const [userPonds, setUserPonds] = useState([]);
    const [currentPond, setCurrentPond] = useState(null);

    // Fetch ponds the user is in
    const fetchUserPonds = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        try {
            const q = query(
                collection(db, "ponds"),
                where("members", "array-contains", user.uid)
            );

            const querySnapshot = await getDocs(q);
            const ponds = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setUserPonds(ponds);

            // to find which pond the user is currently selecting
            const selectedPond = ponds.find(p=>p.selected?.includes(user.uid))
            if (selectedPond) {
                setCurrentPond(selectedPond.id)
            }
            else {
                setCurrentPond(null);
            }

        } catch (error) {
            console.error("Error fetching user ponds:", error);
        }
    };

    useEffect(() => {
        fetchUserPonds();
    }, [updateTrigger]);

    const handleSelectPond = async (selectedPond) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        try {
            const updatePromises = userPonds.map(async (pond) => {
                if (pond.id !== selectedPond.id && pond.selected?.includes(user.uid)) {
                    await updateDoc(doc(db, 'ponds', pond.id), {
                        selected: arrayRemove(user.uid)
                    })
                }
            })

            await updateDoc(doc(db, 'ponds', selectedPond.id), {
                selected: arrayUnion(user.uid)
            })

            await Promise.all(updatePromises)
            setCurrentPond(selectedPond.id)
            setPondName(selectedPond.name)
            fetchUserPonds() //refreshes ui
            setModalVisible(false)
        } catch (error) {
            console.error('Error updating pond selection: ', error)
        }
    }

    return (
        <SafeAreaView style={styles.mainView}>
            <ScrollView>
                {userPonds.map((pond) => (
                    <TouchableOpacity 
                        key={pond.id} 
                        style={[
                            styles.pondView,
                            pond.id === currentPond && styles.activePond
                        ]}
                        onPress={() => handleSelectPond(pond)}
                    >
                        {pond.id === currentPond && <View style={styles.marker}/>}
                        <View style={styles.nameRow}>
                            <PondThumbnail selection={parseInt(pond.thumbnail) || 0} />
                            <Text style={styles.pondName}>{pond.name}</Text>
                        </View>
                        {pond.id === currentPond && (
                            <Image
                                source={require('../nav/img/current_pond.png')}
                                resizeMode='contain'
                                style={styles.img}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    mainView: {
        width: '100%',
    },
    pondView: {
        //backgroundColor: '#c3edab',
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 25,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#D0D0D0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    pondName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#22470C',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    marker: {
        position: 'absolute',
        left: 0,
        height: '100%',
        width: 14,
        backgroundColor: '#85BB65',
    },
    img: {
        width: 47,
        height: 47,
    },
    activePond: {
        backgroundColor: '#E4E4E4',
    },
});

export default PondDisplay;