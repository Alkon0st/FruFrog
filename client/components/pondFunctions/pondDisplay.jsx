import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Make sure the path matches yours
import PondThumbnail from "./img/pondThumbnail";

const PondDisplay = ({ currentPond }) => {
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
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            <ScrollView>
                {userPonds.map((pond) => (
                    <View key={pond.id} style={styles.pondView}>
                        <Text style={styles.pondName}>
                            <PondThumbnail selection={parseInt(pond.thumbnail) || 0} /> {pond.name}
                        </Text>
                        <View style={styles.line} />
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
    line: {
        marginTop: '2%',
        borderBottomColor: '#6a9153',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    pondView: {
        //backgroundColor: '#c3edab',
        marginTop: 10,
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    pondSubView: {
        flexDirection: 'row',
    },
    pondName: {
        fontSize: '120%',
        fontWeight: 'bold',
    },
    pondLabel: {
        marginLeft: '10px',
        textDecorationLine: 'underline',
    },
    pondDetail: {
        textDecorationLine: 'none',
        marginLeft: '5px',
    }
});

export default PondDisplay;


// TAKEN OUT (after {pond})
// {pondList[pond].map((detail) => (    
//     <View key={detail.name} style={styles.pondSubView}>
//         <Text style={styles.pondLabel}>
//             {/* Displays thumbnail & members */}
//             {detail.name}: 
//         </Text>
//         <Text style={styles.pondDetail}>
//             {detail.list.map((item) => <Text>{item}, </Text>)}
//         </Text>
//     </View> 
// ))}