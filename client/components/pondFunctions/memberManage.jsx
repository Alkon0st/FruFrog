import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../settings/SettingsPage.style';

// change current pond name
export default function MemberManage ({ 
    triggerUpdate, 
    visible }) {

    if (!visible) return null;

    return (
        <View style={styles.dropDownContainer}>        
        <View style={styles.dropDownItem}>
            <Text> TEMP PLACEHOLDER </Text>
        </View>
        {/* Confirm Changes */}
        <TouchableOpacity 
            style={[
                styles.confirmButton, 
                {backgroundColor: '#FF6060',
                borderColor: '#590000'}
                ]}> 
                <Text style={[styles.confirmText, {}]}> Kick Member </Text> 
            </TouchableOpacity>
        </View>
    )
};