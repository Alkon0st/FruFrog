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
            <View style ={styles.page}>
                <TouchableOpacity onPress={onClose}> Back </TouchableOpacity>
                <View style={styles.headerContainer}>
                <Text style={styles.pageHeader}>Avatar Editor</Text>
                </View>

                <View style={styles.profileContainer}>
                <Text style={styles.profileName}>Profile Name</Text>
                </View>

                <View style={styles.informationContainer}>
                    <Text style={styles.informationHeader}>Public Information</Text>
                </View>
                {/* Username */}
                <View style={styles.promptItem}>
                <Text>Username: </Text>
                <TextInput style={styles.promptInput} placeholder="Username" />
                </View>
                {/* First name */}
                <View style={styles.promptItem}>
                <Text>First Name: </Text>
                <TextInput style={styles.promptInput} placeholder="Username" />
                </View>
                {/* Last name */}
                <View style={styles.promptItem}>
                <Text>Last Name: </Text>
                <TextInput style={styles.promptInput} placeholder="Username" />
                </View>
                {/* Pronouns */}
                <View style={styles.promptItem}>
                <Text>Pronouns: </Text>
                <TextInput style={styles.promptInput} placeholder="Username" />
                </View>
                {/* Occupation */}
                <View style={styles.promptItem}>
                <Text>Occupation: </Text>
                <TextInput style={styles.promptInput} placeholder="Username" />
                </View>
                {/* Bio */}
                <View style={styles.promptItem}>
                <Text>Bio: </Text>
                <TextInput style={styles.promptInput} placeholder="Username" />
                </View>

                <Text style={styles.question}>
                    Looking for account settings?
                </Text>
                    <TouchableOpacity style={styles.questionButton}>
                        <Text style={styles.questionButtonText}>Redirect to Account Settings</Text>
                    </TouchableOpacity>
                <Text style={styles.question}>
                    Want to make your profile private?
                </Text>
                    <TouchableOpacity style={styles.questionButton}>
                        <Text style={styles.questionButtonText}>Redirect to Account Settings</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

export default ProfilePage