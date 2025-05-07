import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, arrayRemove, arrayUnion, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Make sure the path matches yours
import PondThumbnail from "./img/pondThumbnail";

const PondDisplay = ({ 
    updateTrigger, 
    setPondName,
}) => {
    const [userPonds, setUserPonds] = useState([]);
    const [currentPond, setCurrentPond] = useState(null);

    // Fetch ponds the user is in
    const fetchUserPonds = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) return;
    
        try {
            // Get user document to read currentPondId
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            const currentPondId = userDoc.exists() ? userDoc.data().currentPondId : null;
    
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
    
            if (currentPondId) {
                const selectedPond = ponds.find(p => p.id === currentPondId);
                if (selectedPond) {
                    setCurrentPond(currentPondId);
                    setPondName(selectedPond.name);
                } else {
                    setCurrentPond(null);
                    setPondName('');
                }
            } else {
                setCurrentPond(null);
                setPondName('');
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
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
      
          if (!userSnap.exists()) {
            // Create the user doc if it doesn't exist
            await setDoc(userRef, {
              currentPondId: selectedPond.id,
            });
          } else {
            // Update the pond
            await updateDoc(userRef, {
              currentPondId: selectedPond.id,
            });
          }
      
          setCurrentPond(selectedPond.id);
          setPondName(selectedPond.name);
          console.log("Selected Pond:", selectedPond.name);
        } catch (error) {
          console.error("Error setting current pond on user document:", error);
        }
    };

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