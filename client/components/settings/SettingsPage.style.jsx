import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    settingHeader: {
        backgroundColor: '#F6F6F6',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 10,
    },
    settingHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#22470C80'
    },
    menuButton: {
        padding: 10,
        paddingRight: 30,
        borderWidth: 2,
        borderColor: '#F6F6F6',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 20,
    },
    menuChevron: {
        color: '#000000',
        fontSize: 25,
        textAlign: 'right',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        padding: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 30,
    },
    headerContainer: {
        margin: 10,
        paddingTop: 10,
        position: 'relative',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 1,
    },
    headingStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#557549',
        textAlign: 'center',
    },
    
    container:{
        width: "100%",
    },
    viewStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    textStyle: {
        fontSize: 28,
        color: 'DarkGreen',
    },
    subHeadingStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'Medium',
        marginBottom: 10,
    },
});

export default styles;