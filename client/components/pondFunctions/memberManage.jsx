import { View, Text, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, arrayRemove, getDoc, arrayUnion, doc } from 'firebase/firestore';
import ProfilePicture from '../profile/img/profilePicture';
import styles from '../settings/SettingsPage.style';

const KickWarning = ({visible, onCancel, onConfirm}) => {
    return (
        <Modal 
            animationType="slide"
            visible={visible}
            transparent = {true}
            >
            <View style={styles.kickModalBackground}>
            <LinearGradient
                colors = {['#B2E196','#FAFFD9']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
            >
                <View style={styles.kickModalView}>
                    <Text style={styles.kickHeader}> Are you sure. </Text>
                    <Text style={styles.kickText}>This user will be removed from this Pond.</Text>
                    <View style={styles.kickButtonRow}>
                        <TouchableOpacity 
                            style={[styles.kickButton, styles.kickButtonCancel]}
                            onPress={onCancel}
                        >
                            <Text style={styles.kickButtonText}> No, take me back! </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.kickButton, styles.kickButtonConfirm]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.kickButtonText}> Kick this Member </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            </View>
            </Modal>
    )
}

export default function MemberManage ({ 
    triggerUpdate, 
    visible,
    pondId,
    ownerId,
    }) {

    const [members, setMembers] = useState([])
    const [selectedToKick, setSelectedToKick] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if(visible) {
            fetchMembers()
        }
    }, [visible])

    const fetchMembers = async () => {
        try {
            const pondRef = doc(db, 'ponds', pondId);
            const pondDoc = await getDoc(pondRef);
            if (!pondDoc.exists()) return;

            const pondData = pondDoc.data();
            const filteredMembers = pondData.members.filter(uid => uid !== ownerId); // exclude owner

            const profilesSnapshot = await getDocs(collection(db, 'profiles'));
            const membersWithDetails = [];

            for (const memberUid of filteredMembers) {
                let profileId = null
                
                // finds profile pic id for member
                for (const profileDoc of profilesSnapshot.docs) {
                    const profileData = profileDoc.data();
                    if (profileData.members?.includes(memberUid)) {
                        profileId = profileData.profile_id
                        break // found the profile, move to next member
                    }
                }

                //fetch username from 'users' collection
                const usersQuery = query(
                    collection(db, 'users'),
                    where('user_uid', '==', memberUid)
                )
                const usersSnapshot = await getDocs(usersQuery)
                const username = usersSnapshot.docs.length > 0
                    ? usersSnapshot.docs[0].data().username
                    : 'Unknown';
                
                //push with data
                membersWithDetails.push({
                    uid: memberUid,
                    profileId,
                    username
                })
            }

            setMembers(membersWithDetails);
        } catch (error) {
            console.error('Error fetching members and profiles:', error);
        }
    }

    const handleKickMember = async () => {
        try {
            const auth = getAuth()
            const user = auth.currentUser
            
            // if there is no user, if the user isn't admin, or if there isnt a member selected, cancels 
            if (!user || user.uid !== ownerId || !selectedToKick) return 

            const pondRef = doc(db, 'ponds', pondId)
            await updateDoc(pondRef, {
                members: arrayRemove(selectedToKick),
            })

            // removes user from selected if needed
            await updateDoc(pondRef, {
                selected: arrayRemove(selectedToKick),
            })

            Alert.alert('Success', 'Member has been kicked.')
            triggerUpdate()
            setModalVisible(false)
            setSelectedToKick(null)
        } catch (error) {
            console.error('Error kicking member', error)
        }
    }

    if (!visible) return null;

    return (
        <View style={styles.dropDownContainer}>        
        <View style={styles.dropDownItem}>
            {members.length === 0 ? (
                <Text>No other members</Text>
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.editThumbnailScrollContent}
                >
                    {members.map(({uid, profileId, username}) => (
                        <TouchableOpacity
                            key = {uid}
                            style = {styles.editThumbnailButton}
                            onPress={() => setSelectedToKick(uid)}
                        >
                            <ProfilePicture 
                                selection={profileId}
                                optionalStyle={{ width: 60, height: 60}}
                            />
                            <Text style={styles.kickUsername}>{username}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
        {/* Confirm Changes */}
        <TouchableOpacity 
            style={[
                styles.confirmButton, 
                {
                    backgroundColor: selectedToKick ? '#FF6060' : '#CCCCCC', //grays out if havent clicked a user to kick
                    borderColor: selectedToKick ? '#590000' : '#888888'
                }
            ]}
            disabled = {!selectedToKick}
            onPress={() => setModalVisible(true)}
        > 
            <Text style={styles.confirmText}> Kick Member </Text> 
        </TouchableOpacity>

        <KickWarning
            visible={modalVisible}
            onCancel={() => {
                setModalVisible(false)
            }}
            onConfirm={handleKickMember}
        />
        </View>
    )
};