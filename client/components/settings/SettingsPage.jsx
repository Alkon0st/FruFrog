import {Modal, Text, View, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import styles from './SettingsPage.style';
// import { usePlaidLink } from 'react-native-plaid-link-sdk';

import PondThumbnail from '../pondFunctions/img/pondThumbnail';
import EditPond from '../pondFunctions/editPond';
import MemberManage from '../pondFunctions/memberManage';
import DeletePond from '../pondFunctions/deletePond';
import LeavePond from '../pondFunctions/leavePond';
import IncomeForm from './incomeSet';
import FAQ from './FAQ';

const SettingsPage = ({
    visible, 
    onClose,
    pondName,
    setPondName,
    thumbnail,
    setThumbnail,
    triggerUpdate,
}) => {
    const [isEditPondVisible, setIsEditPondVisible] = useState(false);
    const [isMemberVisible, setIsMemberVisible] = useState(false);
    const [isLeaveVisible, setIsLeaveVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [isAccountVisible, setIsAccountVisible] = useState(false);
    const [isSetIncomeVisible, setIsSetIncomeVisible] = useState(false);
    const [isBankVisible, setIsBankVisible] = useState(false);
    const [isDisconnectVisible, setIsDisconnectVisible] = useState(false);
    const [isFaqVisible, setIsFaqVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [ownerName, setOwnerName] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [pondId, setPondId] = useState('');

    useEffect(() => {
        if (visible) {
            fetchPondInfo();
        }
    }, [visible, triggerUpdate]);
    
    const fetchPondInfo = async () => {
        console.log('Fetch pond is running...')
        const auth = getAuth()
        const user = auth.currentUser

        if(!user)return

        try{
            //get current pond
            const userDocRef = doc(db, 'users', user.uid)
            const userDoc = await getDoc(userDocRef)
            if (!userDoc.exists()) {
                console.log('User document not found')
                setPondName('')
                return
            }

            const currentPondId = userDoc.data().currentPondId
            if(!currentPondId) {
                console.log('No current pond selected')
                setPondName('')
                return
            }

            //get pond document
            const pondDocRef = doc(db, 'ponds', currentPondId)
            const pondDoc = await getDoc(pondDocRef)

            if (!pondDoc.exists()) {
                console.log('Pond document not found.')
                setPondName('')
                return
            }

            const pondData = pondDoc.data()

            //update them states
            setPondId(currentPondId)
            setPondName(pondData.name || 'Unnamed Pond')
            setThumbnail(pondData.thumbnail)
            setOwnerId(pondData.owner)

            if (pondData.owner === user.uid) {
                if (!isAdmin) console.log("User is now the pond owner, setting admin mode.")
                setIsAdmin(true)
            }
            else {
                setIsAdmin(false)
            }
        } catch (error) {
            console.error('Error fetching pond info:', error)
        }
    }

    useEffect(() => {
        const fetchOwnerName = async () => {
            if (!ownerId) {
                console.warn('No ownerId available');
                return;
            }

            try {
                const q = query(
                    collection(db, 'users'),
                    where('user_uid', '==', ownerId)
                )
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data()
                    setOwnerName(userData.username)
                } else {
                    console.warn('Owner user document not found in fetchOwnerName')
                    setOwnerName('Unnamed User')
                }
            } catch (error) {
                console.error('Error fetching owner username:', error)
            }
        }

        fetchOwnerName()
    }, [ownerId])

    useEffect(() => {
        if (!visible) {
            setIsEditPondVisible(false)
            setIsMemberVisible(false)
            setIsSetIncomeVisible(false)
            setIsFaqVisible(false)
        }
    }, [visible])

    const renderChevron = (isVisible) => (
        <Text style={styles.menuChevron}>
            {isVisible ? '▲' : '▼'}
        </Text>
    );

    return (
        <Modal 
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}
        >
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.buttonText}> X </Text>
                </TouchableOpacity>
                
                <View style={styles.header}>
                    <Text style={styles.headingStyle}> Settings </Text>
                </View>

                {/* This is an attempt to balance the header layout */}
                <View style={{ width: 50 }} /> 
            </View>

        {/* ===== Main portion of settings ===== */}

            {/* Pond Settings IF there is a pond*/}
            <ScrollView style={{marginTop: 10}}>
            {pondName !== '' && (
            <>
                <View style={styles.settingHeader}> 
                    <Text style={styles.settingHeaderText}>{pondName} Settings</Text>
                </View>
                <View style={styles.viewStyle}>

                {/* Only shows up IF admin is TRUE */}
                    {isAdmin && (
                    <View>
                        {/* Edit Pond (Name & Thumbnail) */}
                        <TouchableOpacity 
                        style={styles.menuButton}
                        onPress={() => setIsEditPondVisible(prev => !prev)}>
                            <View style={styles.menuItem}>
                                <PondThumbnail selection={thumbnail} />
                                <Text style={styles.menuText}> Edit Pond </Text>
                            </View>
                            {renderChevron(isEditPondVisible)}
                        </TouchableOpacity>
                        <EditPond 
                            pondName={pondName} 
                            setPondName={setPondName} 
                            thumbnail={thumbnail}
                            setThumbnail={setThumbnail}
                            triggerUpdate={triggerUpdate} 
                            visible={isEditPondVisible} 
                        />
                        
                        {/* Member Management */}
                        <TouchableOpacity 
                        style={styles.menuButton}
                        onPress={() => setIsMemberVisible(prev => !prev)}>
                            <View style={styles.menuItem}>
                                <Image  
                                    source={require('../img/members.png')}
                                    resizeMode='contain'
                                    style={styles.img}/>
                                <Text style={styles.menuText}> Member Management </Text>
                            </View>
                            {renderChevron(isMemberVisible)}
                        </TouchableOpacity>
                        <MemberManage 
                            triggerUpdate={triggerUpdate} 
                            visible={isMemberVisible} 
                            pondId={pondId}
                            ownerId={ownerId}
                        />

                        {/* Delete Current Pond */}
                        <TouchableOpacity 
                            style={styles.menuButton}
                            onPress={() => setIsDeleteVisible(prev => !prev)}>
                                <View style={styles.menuItem}>
                                    <Image  
                                        source={require('../img/delete.png')}
                                        resizeMode='contain'
                                        style={[styles.img, {tintColor: '#590000'}]}/>
                                    <Text style={[styles.menuText, {color: '#590000'}]}> Delete Pond </Text>
                                </View>
                        </TouchableOpacity>
                        <DeletePond
                            visible={isDeleteVisible}
                            onClose={() => setIsDeleteVisible(false)}
                            onDeleted={onClose}
                            setPondName={setPondName}
                        />
                    </View>
                    )}

                    {/* Only shows up IF admin is FALSE */}
                    {!isAdmin && (
                    <>
                        {/* Owner Info */}
                        <View style={styles.menuButton}>
                            <View style={styles.menuItem}>
                                <PondThumbnail selection={thumbnail} />
                                <Text style={styles.menuText}> Pond Owned by {ownerName} </Text>
                            </View>
                        </View>
                    </>
                    )}

                    {/* Leave Pond */}
                    <TouchableOpacity 
                        style={styles.menuButton}
                        onPress={() => setIsLeaveVisible(prev => !prev)}>
                            <View style={styles.menuItem}>
                                <Image  
                                    source={require('../img/logout.png')}
                                    resizeMode='contain'
                                    style={[styles.img, {tintColor: '#590000'}]}/>
                                <Text style={[styles.menuText, {color: '#590000'}]}> Leave Pond </Text>
                            </View>
                    </TouchableOpacity>
                    <LeavePond
                        visible={isLeaveVisible}
                        onClose={() => setIsLeaveVisible(false)}
                        setPondName={setPondName}
                        onLeft={async () => {
                            setIsLeaveVisible(false)
                            await fetchPondInfo()
                            onClose() //closes settings page
                        }}
                    />
                </View>
            </>
            )}
                {/* Only shows up if user has no ponds */}
                {pondName === '' && (
                <>
                    <View style={styles.settingHeader}> 
                        <Text style={styles.settingHeaderText}>No Pond Detected</Text>
                    </View>
                    <View style={styles.viewStyle}>
                    {/* If there's no pond Info */}
                    <View style={styles.menuButton}>
                        <View style={styles.menuItem}>
                            <Image  
                                source={require('../img/caution.png')}
                                resizeMode='contain'
                                style={styles.img}/>
                            <Text style={styles.menuText}> Create or Join Pond to Start </Text>
                        </View>
                    </View>
                    </View>
                </>
                )}
            {/* Universal Settings */}
                <View style={styles.settingHeader}> 
                    <Text style={styles.settingHeaderText}>Universal Settings</Text>
                </View>
                <View style={styles.viewStyle}>

                    {/* Set Income */}
                    <TouchableOpacity 
                    style={styles.menuButton}
                    onPress={() => setIsSetIncomeVisible(prev => !prev)}>
                        <View style={styles.menuItem}>
                            <Image  
                                source={require('../img/dollar.png')}
                                resizeMode='contain'
                                style={styles.img}/>
                            <Text style={styles.menuText}> Set Income </Text>
                        </View>
                        {renderChevron(isSetIncomeVisible)}
                            
                        </TouchableOpacity>
                        <IncomeForm 
                            visible={isSetIncomeVisible}
                            onClose={() => setIsSetIncomeVisible(false)} 
                            /> 

                    {/* FAQ */}
                    <TouchableOpacity 
                        style={styles.menuButton}
                        onPress={() => setIsFaqVisible(prev => !prev)}>
                            <View style={styles.menuItem}>
                                <Image  
                                    source={require('../img/question.png')}
                                    resizeMode='contain'
                                    style={styles.img}/>
                                <Text style={styles.menuText}> FAQ </Text>
                            </View>
                            {renderChevron(isFaqVisible)}
                    </TouchableOpacity>
                    <FAQ 
                        visible={isFaqVisible}
                    />
                </View>
            </ScrollView>
        </Modal>
    );
};

export default SettingsPage