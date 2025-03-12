import {StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function ProfilePage() {
    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Profile Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the profile page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        display: 'flex',
        justifyConten: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textStyle: {
        fontSize: 28,
        color: 'DarkGreen',
    },
    headingStyle: {
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
    },
});

export default ProfilePage