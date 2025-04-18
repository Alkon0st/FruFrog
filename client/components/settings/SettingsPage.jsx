import {Modal, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';

import IncomeForm from './incomeSet';
import styles from './SettingsPage.style';

const SettingsPage = ({
    visible, 
    onClose,
    currentPond,
}) => {
    const [isSetIncomeVisible, setIsSetIncomeVisible] = useState(false);

    const renderChevron = (isVisible) => (
        <Text style={styles.menuChevron}>
            {isVisible ? '▼' : '▲'}
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
            </View>

            {/* Main portion of settings */}

            {/* Pond Settings */}
            <ScrollView style={{marginTop: 10}}>
                <View style={styles.settingHeader}> 
                    <Text style={styles.settingHeaderText}>{currentPond} Settings</Text>
                </View>
                <View style={styles.viewStyle}>
                    <TouchableOpacity 
                    style={styles.menuButton}
                    onPress={() => setIsSetIncomeVisible(prev => !prev)}>
                        <Text style={styles.menuText}> Set Income </Text>
                        {renderChevron(isSetIncomeVisible)}
                    </TouchableOpacity>
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