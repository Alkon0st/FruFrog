import {StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './ProfilePage.style';

function ProfilePage() {
    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Profile Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the profile page</Text>
        </View>
    );
}

export default ProfilePage