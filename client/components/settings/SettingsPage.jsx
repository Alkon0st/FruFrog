import {Modal, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';

import styles from './SettingsPage.style';

import PondThumbnail from '../pondFunctions/img/pondThumbnail';
import EditPond from '../pondFunctions/editPond';
import IncomeForm from './incomeSet';

const SettingsPage = ({
    visible, 
    onClose,
    pondName,
    setPondName,
    thumbnail,
    setThumbnail,
    triggerUpdate,
}) => {
    const [isSetIncomeVisible, setIsSetIncomeVisible] = useState(false);
    const [isEditPondVisible, setIsEditPondVisible] = useState(false);

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
                <TouchableOpacity onPress={onClose} styles={styles.closeButton}>
                    <Text style={styles.buttonText}> X </Text>
                </TouchableOpacity>
                
                <View style={styles.header}>
                    <Text style={styles.headingStyle}> Settings </Text>
                </View>

                {/* This is an attempt to balance the header layout */}
                <View style={{ width: 50 }} /> 
            </View>

            {/* Main portion of settings */}

            {/* Pond Settings */}
            <ScrollView style={{marginTop: 10}}>
                <View style={styles.settingHeader}> 
                    <Text style={styles.settingHeaderText}>{pondName} Settings</Text>
                </View>
                <View style={styles.viewStyle}>
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

                </View>

            {/* Universal Settings */}
                <View style={styles.settingHeader}> 
                    <Text style={styles.settingHeaderText}>Universal Settings</Text>
                </View>
                <View style={styles.viewStyle}>
                    <TouchableOpacity 
                    style={styles.menuButton}
                    onPress={() => setIsSetIncomeVisible(prev => !prev)}>
                        <Text style={styles.menuText}> Set Income </Text>
                        {renderChevron(isSetIncomeVisible)}
                    </TouchableOpacity>
                    <IncomeForm 
                        visible={isSetIncomeVisible}
                        onClose={() => setIsSetIncomeVisible(false)} 
                        />

                    
                </View>
            </ScrollView>
        </Modal>
    );
};

export default SettingsPage