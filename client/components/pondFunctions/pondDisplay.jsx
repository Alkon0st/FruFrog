import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, } from "react-native";
import pondList from "./CreatePondFolder/ponds";
import styles from "./CreatePondFolder/CreatePond.style";

const PondDisplay = () => {
    return (
        <SafeAreaView> 
            <ScrollView>
                {Object.keys(pondList).map((pond) => (
                    <View key={pond} style={styles.pondView}>
                            <Text style={styles.pondName}>
                                {pond}
                            </Text>
                            {pondList[pond].map((detail) => (    
                                <View key={detail.name} style={styles.pondSubView}>
                                    <Text style={styles.pondLabel}>
                                        {/* Displays thumbnail & members */}
                                        {detail.name}: 
                                    </Text>
                                    <Text style={styles.pondDetail}>
                                        {detail.list.map((item) => <Text>{item}, </Text>)}
                                    </Text>
                                </View> 
                            ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PondDisplay;