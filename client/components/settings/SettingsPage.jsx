import {StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './SettingsPage.style';
import IncomeForm from './incomeSet';

import HeaderNav from '../nav/HeaderNav';


function SettingsPage() {
    return (
        <View style ={styles.viewStyle}>
            <HeaderNav />
            <Text style ={styles.headingStyle}>Settings</Text>
            <IncomeForm />
        </View>
    );
}

export default SettingsPage