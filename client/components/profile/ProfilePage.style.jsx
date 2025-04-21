import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 30,
    },
    modal: {
        height: height,
        width: '100%',
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    // View styles
    headerContainer: {
        margin: '10px',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileContainer: {
        paddingBottom: 10,
    },
    // Text styles
    pageHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#557549',
        textAlign: 'center',
    },
});

export default styles;