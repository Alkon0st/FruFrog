import {StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Button} from 'react-native';
import styles from './ProfilePage.style';

const ProfilePage = ({
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
                    <TouchableOpacity onPress={onClose} style={styles.buttonClose}> 
                        <Text style={[styles.questionButtonText, styles.buttonText]}> ◀ </Text>
                    </TouchableOpacity>
                    <View style={{flex: 1, alignSelf: 'center'}}>
                        <Text style={styles.pageHeader}>Avatar Editor</Text>
                    </View>
            </View>

            {/* Main portion of profile */}
            <View style ={styles.page}>
                <View style={styles.profileContainer}>
                </View>

                
            </View>
        </Modal>
    );
}

export default ProfilePage