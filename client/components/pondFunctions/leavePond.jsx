import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, deleteDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useState, useRef } from 'react';

const DeleteWarning = ({visible, onCancel, onConfirm}) => {
    return (
        <Modal 
            animationType="slide"
            visible={visible}
            transparent = {true}
            >
            <View style={styles.modalBackground}>
            <LinearGradient
                colors = {['#B2E196','#FAFFD9']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.header}> No other members available. </Text>
                    <Text style={styles.text}>This pond will be deleted along with <Text style={{textDecorationLine:'underline'}}>all</Text> data associated with this Pond.</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                            style={[styles.button, styles.buttonCancel]}
                            onPress={onCancel}
                        >
                            <Text style={styles.buttonText}> No, take me back! </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, styles.buttonConfirm]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.buttonText}> Leave and Delete Pond </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            </View>
            </Modal>
    )
}

const LeavePond = ({ 
    visible,
    onClose,
    onLeft,
    setPondName,
    }) => {
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    const cachedPondRef = useRef(null)

    const handleLeave = async () => {
        console.log('handleLeave is running')
        const auth = getAuth()
        const user = auth.currentUser

        if (!user) return
        
        try {
            const q = query(
                collection(db, 'ponds'),
                where('selected', 'array-contains', user.uid)
            )
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                Alert.alert('Error', 'No selected pond found.')
                return
            }

            const pondDoc = querySnapshot.docs[0]
            const pondData = pondDoc.data()

            // check if user is the admin & if there other members
            let updatedData = {...pondData}
            updatedData.members = updatedData.members.filter(uid => uid !== user.uid)

            // IF user was admin, delete the pond if no other users or reassign owner
            if (pondData.owner === user.uid) {
                if (updatedData.members.length === 0) {
                    cachedPondRef.current = pondDoc.ref
                    setShowDeleteWarning(true)
                    return
                } 
                else {
                    // assigns the next person in list as owner
                    const newOwner = updatedData.members[0]
                    await updateDoc(pondDoc.ref, {owner: newOwner})
                }
            }
            

            //remove user from members and selected after confirming after warning
            await updateDoc(pondDoc.ref, {
                members: arrayRemove(user.uid),
                selected: arrayRemove(user.uid)
            })

            // Appends user to another pond for Selected
            const otherPondQuery = query(
                collection(db, 'ponds'),
                where('members', 'array-contains', user.uid)
            )
            const otherPondSnapshot = await getDocs(otherPondQuery)

            let reassigned = false
            for (const docSnap of otherPondSnapshot.docs) {
                const otherPond = docSnap.data()
                if (!otherPond.selected.includes(user.uid)) {
                    await updateDoc(docSnap.ref, {
                        selected: arrayUnion(user.uid)
                    })
                    setPondName(otherPond.name)
                    reassigned = true
                    break
                }
            }

            onLeft()
        } catch (error) {
            console.error('Error leaving pond', error)
            Alert.alert('Error', 'Failed to leave pond.')
        }
    }

    const confirmDeletePond = async () => {
        if(!cachedPondRef.current) return

        try {
            await deleteDoc(cachedPondRef.current)
            cachedPondRef.current=null
            setShowDeleteWarning(false)
            onLeft()
            onClose()
        } catch (error) {
            console.error('Error deleting pond', error)
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
                    <Text style={styles.text}>You can not rejoin this Pond unless you are given another invite.</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                            style={[styles.button, styles.buttonCancel]}
                            onPress={onClose} 
                        >
                            <Text style={styles.buttonText}> No, take me back! </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, styles.buttonConfirm]}
                            onPress={() => {
                                handleLeave()
                                console.log('Leave button is pressed.')
                            }}
                        >
                            <Text style={styles.buttonText}> Yes, I am sure. </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            </View>
            <DeleteWarning
                visible={showDeleteWarning}
                onCancel={() => {
                    cachedPondRef.current = null
                    setShowDeleteWarning(false)
                }}
                onConfirm={confirmDeletePond}
            />
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

export default LeavePond;