import { View, Text, FlatList, } from 'react-native';
import styles from './SettingsPage.style';

// change current pond name
export default function FAQ ({
    visible }) {

    if (!visible) return null;

    return (
        <View style={styles.dropDownContainer}>
            <Text style={styles.dropDownHeader}>What is a pond and what can I do with it?</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.subanswer}>A pond is a group that contains your fellow frogs (or other users). You can Budget alongside them or create a Bill to split cost.</Text>
            </View>

            <Text style={styles.dropDownHeader}>How do I join another person's pond?</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.subanswer}>At the top of the main page, there is a white box with a upside-down triangle (▼). Click on it and it will show a dropdown with two buttons at the bottom. Click on the <Text style={{textDecorationLine:'underline'}}>right</Text> button named <Text style={{fontWeight:'bold'}}>Join Pond</Text> to create a new pond. It will then prompt you for a 6-digit code that one of the pond's members should provide.</Text>
            </View>

            <Text style={styles.dropDownHeader}>How do I create a new pond?</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.subanswer}>At the top of the main page, there is a white box with a upside-down triangle (▼). Click on it and it will show a dropdown with two buttons at the bottom. Click on the <Text style={{textDecorationLine:'underline'}}>left</Text> button named <Text style={{fontWeight:'bold'}}>Create Pond</Text> to create a new pond. It will then prompt you to choose a pond name and a pond thumbnail.</Text>
            </View>

            <Text style={styles.dropDownHeader}>How do I add a user to a pond?</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.subanswer}>At the top of the main page, there is a white box with a upside-down triangle (▼). Click on it and it will show a dropdown. Click on the button <Text style={{textDecorationLine:'underline'}}>next</Text> to the white box with an add user icon to generate a 6-digit code. The user can then go to <Text style={{fontWeight:'bold'}}>Join Pond</Text> and enter the code to join the pond.</Text>
            </View>
            
            <Text style={styles.dropDownHeader}> Credits:</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.answer}>App Created by:</Text>
                <Text style={styles.subanswer}>Pond Patrol</Text>
                <Text style={styles.answer}>Image Artist:</Text>
                <Text style={styles.subanswer}>Sophia Nguyen</Text>
                <Text style={styles.answer}>Most Icons were Provided by Flaticon</Text>
                <FlatList 
                    data={[
                        { key: 'Invite friends icons created by See Icons' },
                        { key: 'Name icons created by Andrejs Kirma' },
                        { key: 'Photo icons created by Pixel perfect' },
                        { key: 'Employee icons created by Adrly' },
                        { key: 'Tick icons created by Maxim Basinski Premium' },
                        { key: 'Dollar icons created by dmitri13' },
                        { key: 'Logout icons created by Afian Rochmah Afif' },
                        { key: 'Question icons created by Freepik' },
                        { key: 'Pencil icons created by Anggara' },
                        { key: 'Delete icons created by Ilham Fitrotul Hayat' },
                        { key: 'Close icons created by Pixel perfect' },
                        { key: 'Danger icons created by Freepik' },
                    ]}
                    renderItem={({ item }) => {
                        return(
                            <View style={styles.listItem}>
                                <Text style={styles.listItemText}>{`\u2022 ${item.key}`}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    )
};