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
            <View style ={styles.viewStyle}>
                <TouchableOpacity onPress={onClose}> Back </TouchableOpacity>
                <Text style ={styles.headingStyle}>Settings</Text>
                <IncomeForm />
            </View>
        </Modal>
    );
}

export default SettingsPage