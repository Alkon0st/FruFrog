import {Modal, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { useState } from 'react';

import styles from './SettingsPage.style';

import PondThumbnail from '../pondFunctions/img/pondThumbnail';
import EditPond from '../pondFunctions/editPond';
import MemberManage from '../pondFunctions/memberManage';
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
    admin
}) => {
    const [isEditPondVisible, setIsEditPondVisible] = useState(false);
    const [isMemberVisible, setIsMemberVisible] = useState(false);
    const [isLeaveVisible, setIsLeaveVisible] = useState(false);
    const [isAccountVisible, setIsAccountVisible] = useState(false);
    const [isSetIncomeVisible, setIsSetIncomeVisible] = useState(false);
    const [isBankVisible, setIsBankVisible] = useState(false);
    const [isDisconnectVisible, setIsDisconnectVisible] = useState(false);
    const [isFaqVisible, setIsFaqVisible] = useState(false);


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

            {/* Pond Settings */}
            <ScrollView style={{marginTop: 10}}>
                <View style={styles.settingHeader}> 
                    <Text style={styles.settingHeaderText}>{pondName} Settings</Text>
                </View>
                <View style={styles.viewStyle}>

                {/* Only shows up IF admin is TRUE */}
                    {admin && (
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
                        />
                    </View>
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
                    />
                </View>

            {/* Universal Settings */}
                <View style={styles.settingHeader}> 
                    <Text style={styles.settingHeaderText}>Universal Settings</Text>
                </View>
                <View style={styles.viewStyle}>
                    
                    {/* Account Setting */}
                    <TouchableOpacity 
                    style={styles.menuButton}
                    onPress={() => setIsAccountVisible(prev => !prev)}>
                        <View style={styles.menuItem}>
                            <Image  
                                source={require('../img/user.png')}
                                resizeMode='contain'
                                style={styles.img}/>
                            <Text style={styles.menuText}> Account </Text>
                        </View>
                        {renderChevron(isAccountVisible)}
                    </TouchableOpacity>


                    {isAccountVisible && (
                    <View>
                        {/* Set Income */}
                        <TouchableOpacity 
                        style={styles.subMenuContainer}
                        onPress={() => setIsSetIncomeVisible(prev => !prev)}>
                            <View style={styles.subMenuItem}>
                                <Image  
                                    source={require('../img/dollar.png')}
                                    resizeMode='contain'
                                    style={styles.img}/>
                                <Text style={styles.subMenuHeader}> Set Income </Text>
                            </View>
                            <View style={{marginTop: 5}}>
                                {renderChevron(isSetIncomeVisible)}
                            </View>
                        </TouchableOpacity>
                        <IncomeForm 
                            visible={isSetIncomeVisible}
                            onClose={() => setIsSetIncomeVisible(false)} 
                            /> 
                            
                        {/* Connect to Bank */}
                        <TouchableOpacity 
                        style={styles.subMenuContainer}
                        onPress={() => setIsBankVisible(prev => !prev)}>
                            <View style={styles.subMenuItem}>
                                <Image  
                                    source={require('../img/card.png')}
                                    resizeMode='contain'
                                    style={styles.img}/>
                                <Text style={styles.subMenuHeader}> Connect to Bank </Text>
                            </View>
                            <View style={{marginTop: 5}}>
                                {renderChevron(isBankVisible)}
                            </View>
                        </TouchableOpacity>
                        {/* 
                            Space for da function
                        
                        */}
                    </View>
                    )}

                    {/* Disconnect Bank */}
                    <TouchableOpacity 
                        style={styles.menuButton}
                        onPress={() => setIsDisconnectVisible(prev => !prev)}>
                            <View style={styles.menuItem}>
                                <Image  
                                    source={require('../img/caution.png')}
                                    resizeMode='contain'
                                    style={[styles.img, {tintColor: '#590000'}]}/>
                                <Text style={[styles.menuText, {color: '#590000'}]}> Disconnect Bank Account </Text>
                            </View>
                    </TouchableOpacity>
                    {/* 
                    
                    space for disconnect bank acc

                    */}

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