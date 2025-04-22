import { View, Text, } from 'react-native';
import styles from './SettingsPage.style';

// change current pond name
export default function FAQ ({
    visible }) {

    if (!visible) return null;

    return (
        <View style={styles.dropDownContainer}>
            <Text> TEMP PLACEHOLDER </Text>
        </View>
    )
};