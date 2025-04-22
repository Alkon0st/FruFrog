import { View, Text, } from 'react-native';
import styles from './SettingsPage.style';

// change current pond name
export default function FAQ ({
    visible }) {

    if (!visible) return null;

    return (
        <View style={styles.dropDownContainer}>
            <Text> TEMP PLACEHOLDER & TEXT </Text>
            <Text> 
                Most icons are provided by Flaticon:
                Invite friends icons created by See Icons
                Credit card icons created by Octopocto
                Delete icons created by Ilham Fitrotul Hayat
                Name icons created by Andrejs Kirma
                Photo icons created by Pixel perfect
                Danger icons created by Freepik
                Employee icons created by Adrly
                Tick icons created by Maxim Basinski Premium
                Dollar icons created by dmitri13
                Logout icons created by Afian Rochmah Afif
                Question icons created by Freepik
                Pencil icons created by Anggara
                User icons created by Krome
            </Text>
        </View>
    )
};