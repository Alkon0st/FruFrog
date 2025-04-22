import {Text, View, TouchableOpacity, Modal, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        <LinearGradient
            colors = {['#F1FEFE', '#B2F0EF']}
            style = {styles.page}
        >
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.buttonText}> ◀ </Text>
                </TouchableOpacity>
                
                <View style={styles.header}>
                    <Text style={styles.headingStyle}> Avatar Selection </Text>
                </View>

                {/* This is an attempt to balance the header layout */}
                <View style={{ width: 50 }} /> 
            </View>

            {/* Main portion of profile */}
            <View style={styles.contentContainer}>
                
            </View>

            {/* Confirm Change */}
            <View>
                <TouchableOpacity
                    style={styles.confirmButton}
                >
                    <Text style={styles.confirmText}> Change Profile Picture </Text>
                </TouchableOpacity>
            </View>

            {/* BOTTOM CONTENT */}
            <View>
                {/* LOGOUT BUTTON */}
                <TouchableOpacity
                    style={styles.logOutButton}
                >
                    <View style={styles.logOutContent}>
                        <Image
                            source={require('../img/logout.png')}
                            style={styles.logOutImg}
                        />
                        <Text style={styles.logOutText}>Log Out</Text>
                    </View>
                </TouchableOpacity>

                {/* FOOTER */}
                <Text style={styles.footer}>© Pond Patrol. All rights reserved.</Text>
            </View>
            
        </LinearGradient>
        </Modal>
    );
}

export default ProfilePage