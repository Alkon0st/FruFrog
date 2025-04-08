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
        width: width,
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
    informationContainer: {
        justifyContent: 'left',
        paddingBottom: 10,
        borderBottomWidth: 3    ,
        borderBottomColor: '#000000',
        width: '75%',
        marginBottom: 10,
    },
    profileContainer: {
        paddingBottom: 10,
    },
    promptItem: {
        flexDirection: 'row',
        alignContent: 'left',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    promptInput: {
        backgroundColor: '#b2e196',
    },
    questionButton: {
        backgroundColor: '#85bb65',
        borderColor: '#4f723a',
        borderWidth: 2,
        borderRadius: 8,
        padding: 3,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#ff6060',
        borderColor: '#590000',
        borderWidth: 2,
        borderRadius: 8,
        padding: 3,
    },
    // Text styles
    pageHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#557549',
        textAlign: 'center',
    },
    profileName: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    informationHeader: {
        fontWeight: 'bold',
    },
    prompt: {
    },
    question: {
    },
    questionButtonText: {
        color: '#ffffff',
    },
    logoutButtonText: {
        fontWeight: 510,
    }
});

export default styles;