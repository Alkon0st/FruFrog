import { View, Text, FlatList, } from 'react-native';
import styles from './SettingsPage.style';

// change current pond name
export default function FAQ ({
    visible }) {

    if (!visible) return null;

    return (
        <View style={styles.dropDownContainer}>
            <Text style={styles.dropDownHeader}> TEMP PLACEHOLDER & TEXT </Text>
            
            <Text style={styles.dropDownHeader}> Credits:</Text>
            <View style={[
                styles.dropDownItem, 
                {alignItems: 'flex-start', 
                    padding: 10,
                }
            ]}>
                <Text style={{fontWeight: 'bold'}}>Image Artist:</Text>
                <Text style={[styles.listItemText, {paddingBottom: 10}]}> Sophia Nguyen</Text>
                <Text style={{fontWeight: 'bold'}}>Most Icons were Provided by Flaticon</Text>
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