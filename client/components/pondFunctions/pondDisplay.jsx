import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Make sure the path matches yours
import PondThumbnail from "./img/pondThumbnail";

const PondDisplay = ({ currentPond, updateTrigger }) => {
    const [userPonds, setUserPonds] = useState([]);

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
        } catch (error) {
            console.error("Error fetching user ponds:", error);
        }
    };

    useEffect(() => {
        fetchUserPonds();
    }, [updateTrigger]);

    return (
        <SafeAreaView style={styles.mainView}>
            <ScrollView>
                {userPonds.map((pond) => (
                    <View 
                        key={pond.id} 
                        style={[
                            styles.pondView,
                            pond.name === currentPond && styles.activePond
                        ]}
                    >
                        {pond.name === currentPond && <View style={styles.marker}/>}
                        <View style={styles.nameRow}>
                            <PondThumbnail selection={parseInt(pond.thumbnail) || 0} />
                            <Text style={styles.pondName}>{pond.name}</Text>
                        </View>
                        {pond.name === currentPond && (
                            <Image
                                source={require('../nav/img/current_pond.png')}
                                resizeMode='contain'
                                style={styles.img}
                            />
                        )}
                    </View>
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
        marginTop: 10,
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