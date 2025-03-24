import {StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './SettingsPage.style';

import IncomeForm from './incomeSet';

function SettingsPage() {
    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Settings Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the settings page</Text>
            <IncomeForm />
        </View>
    );
}

export default SettingsPage