import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 30,
    },
    headerContainer: {
        margin: '10px',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        justifyConten: 'center',
        alignItems: 'center',
        flex: 1,
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