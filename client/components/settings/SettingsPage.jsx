import {Modal, Text, View, TouchableOpacity} from 'react-native';

import IncomeForm from './incomeSet';
import styles from './SettingsPage.style';

const SettingsPage = ({
    visible,
    onClose,
    }) => {
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
                <View style={{flex: 1, alignSelf: 'center'}}>   
                    <Text style ={styles.headingStyle}>Settings</Text>
                </View>
            </View>

            {/* Main portion of settings */}
            <View style ={styles.viewStyle}>
                <IncomeForm />
            </View>
        </Modal>
    );
}

export default SettingsPage