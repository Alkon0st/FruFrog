import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, deleteDoc, updateDoc, arrayUnion} from 'firebase/firestore';

const DeletePond = ({ 
    visible,
    onClose,
    onDeleted,
    setPondName,
    }) => {

        const handleDelete = async () => {
            const auth = getAuth()
            const user = auth.currentUser

            if (!user) {return}

            try {
                const q = query(
                    collection(db, 'ponds'),
                    where('selected', 'array-contains', user.uid)
                )
                const querySnapshot = await getDocs(q)

                if (querySnapshot.empty) {
                    Alert.alert('Error', 'No selected pond found.')
                    return;
                }

                const pondDoc = querySnapshot.docs[0]
                const pondData = pondDoc.data()

                // safety measure just in case they bypass the admin
                if (pondData.owner !== user.uid) {
                    Alert.alert('Error', 'Only the pond owner can delete it.')
                    return
                }

                // deletes current pond
                await deleteDoc(pondDoc.ref)

                // finds another pond that user is a member
                const otherPondQuery = query(
                    collection(db, 'ponds'),
                    where('members', 'array-contains', user.uid)
                )
                const otherPondSnapshot = await getDocs(otherPondQuery)

                let reassigned = false
                for (const docSnap of otherPondSnapshot.docs) {
                    const otherPond = docSnap.data()

                    //skip pond that was just deleted
                    if (docSnap.id === pondDoc.id) continue;

                    //add user to selected
                    if (!otherPond.selected.includes(user.uid)) {
                        await updateDoc(docSnap.ref,{
                            selected: arrayUnion(user.uid)
                        })
                    }

                    reassigned = true;

                    setPondName(otherPond.name) //sets current pond name to reassigned
                    break; // only reassigns to first match
                }

                if (!reassigned) {
                    Alert.alert('Notice', 'Pond deleted, but no other pond found to reassign')
                } else {
                    Alert.alert('Success', 'Pond deleted and user reassigned')
                }
                
                onClose()
                onDeleted()
            } catch (error) {
                console.error("Error deleting pond:", error)
                Alert.alert('Error', 'Failed to delete pond')
            }
        }

    return (
        <Modal 
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
        transparent = {true}
        >
            <View style={styles.modalBackground}>
            <LinearGradient
                colors = {['#B2E196','#FAFFD9']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.header}> Are you sure? </Text>
                    <Text style={styles.text}>You will lose <Text style={{textDecorationLine:'underline'}}>all</Text> data associated with this Pond.</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                        style={[styles.button, styles.buttonCancel]}
                        onPress={onClose} >
                            <Text style={styles.buttonText}> No, take me back! </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, styles.buttonConfirm]}
                            onPress={handleDelete}
                        >
                            <Text style={styles.buttonText}> Delete Pond </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalBackground: {
        backgroundColor: 'rgba(179, 228, 183, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        height: 228,
        width: 369,
        paddingHorizontal: 20,
        borderRadius: 6,
        borderColor: '#AEAEAE',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingTop: '10px',
    },
    button: {
        margin: 5,
        padding: 10,
        width: 152,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttonConfirm: {
        backgroundColor: '#FF6060',
        borderColor: '#590000',
    },
    buttonCancel: {
        backgroundColor: '#85BB65',
        borderColor: '#4F723A',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlign: 'center', 
    }
});

export default DeletePond;