import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Dimensions} from "react-native";
import pondList from "./CreatePondFolder/ponds";

const PondDisplay = () => {
    return (
        <SafeAreaView style = {styles.mainView}> 
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
                        <View style={styles.line} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
    },
    line: {
        marginTop: '2%',
        borderBottomColor: '#6a9153',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    pondView: {
        //backgroundColor: '#c3edab',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    pondSubView: {
        flexDirection: 'row',
    },
    pondName: {
        fontSize: '120%',
        fontWeight: 'bold',
    },
    pondLabel: {
        marginLeft: '10px',
        textDecorationLine: 'underline',
    },
    pondDetail: {
        textDecorationLine: 'none',
        marginLeft: '5px',
    }
});

export default PondDisplay;