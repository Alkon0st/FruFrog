import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 24,
    },
    headerContainer: {
        flexDirection: 'row',
        margin: '10px',
    },
    headingStyle: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'Medium',
    },
    
    container:{
        width: "60%",
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