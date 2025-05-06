import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, deleteDoc, arrayRemove, arrayUnion, doc, getDoc } from 'firebase/firestore';
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
            // get user's current pond id
            const userDocRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(userDocRef)

            if (!userDoc.exists()) {
                console.error('User document not found')
                return 
            }

            const currentPondId = userDoc.data().currentPondId

            if (!currentPondId) {
                console.error('No current pond selected')
                return
            }

            const pondDocRef = doc(db, 'ponds', currentPondId)
            const pondDoc = await getDoc(pondDocRef)

            if (!pondDoc.exists()) {
                console.error('Pond not found.')
                return
            }

            const pondData = pondDoc.data()
            const updatedMembers = pondData.members.filter(uid => uid !== user.uid)

            //IF user is the owner: if only member shows warning that it will delete the pond, otherwise reassign ownership
            if (pondData.owner === user.uid) {
                if (updatedMembers.length === 0) {
                    cachedPondRef.current = pondDocRef
                    setShowDeleteWarning(true)
                    return
                }
                else {
                    const newOwner = updatedMembers[0]
                    await updateDoc(pondDocRef, {owner: newOwner})
                }
            }

            // remove user from pond members
            await updateDoc(pondDocRef, {
                members: arrayRemove(user.uid)
            })

            //find another pond to join
            const otherPondQuery = query(
                collection(db, 'ponds'),
                where('members', 'array-contains', user.uid)
            )
            const otherPondSnapshot = await getDocs(otherPondQuery)

            if (!otherPondSnapshot.empty) {
                const nextPondDoc = otherPondSnapshot.docs[0]
                const nextPondId = nextPondDoc.id
                const nextPondName = nextPondDoc.data().name || 'Unnamed Pond'

                //updates user's currentPondId
                await updateDoc(userDocRef, { currentPondId: nextPondId })
                setPondName(nextPondName)
            }
            else {
                //no other pond -> set currentPondId as ''
                await updateDoc(userDocRef, {currentPondId: ''})
                    setPondName('')
            }
            
            onLeft()
            onClose()
        } catch (error) {
            console.error('Error leaving pond', error)
            Alert.alert('Error', 'Failed to leave pond.')
        }
    }

    const confirmDeletePond = async () => {
        if(!cachedPondRef.current) return

        try {
            const auth = getAuth()
            const user = auth.currentUser

            if(!user)return

            const userDocRef = doc(db, 'users', user.uid)

            //delete pond
            await deleteDoc(cachedPondRef.current)

            //find another pond to join
            const otherPondQuery = query(
                collection(db, 'ponds'),
                where('members', 'array-contains', user.uid)
            )
            const otherPondSnapshot = await getDocs(otherPondQuery)

            if (!otherPondSnapshot.empty) {
                const nextPondDoc = otherPondSnapshot.docs[0]
                const nextPondId = nextPondDoc.id
                const nextPondName = nextPondDoc.data().name || 'Unnamed Pond'

                //updates user's currentPondId
                await updateDoc(userDocRef, { currentPondId: nextPondId })
                setPondName(nextPondName)
            }
            else {
                //no other pond -> set currentPondId as ''
                await updateDoc(userDocRef, {currentPondId: ''})
                    setPondName('')
            }

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