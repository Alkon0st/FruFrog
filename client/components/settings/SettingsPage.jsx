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
            <View style={styles.headerContainer}>
                <View style={[
                {flex: 1},
                ]}>               
                    <TouchableOpacity onPress={onClose}> 
                        <Text style={styles.buttonText}> ◀ </Text>
                    </TouchableOpacity>
                </View>
                <View style={[
                {flex: 1},
                ]}>
                    <Text style ={styles.headingStyle}>Settings</Text>
                </View>
            </View>
            <View style ={styles.viewStyle}>
                <IncomeForm />
            </View>
        </Modal>
    );
}

export default SettingsPage