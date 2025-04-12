import {StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './SettingsPage.style';
import IncomeForm from './incomeSet';


function SettingsPage() {
    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Settings</Text>
            <Text style={styles.subHeadingStyle}>Rainbow Songs settings</Text>
            <Text style ={styles.textStyle}>This is THE pee pee poo poo fart</Text>
            <IncomeForm />
        </View>
    );
}

export default SettingsPage