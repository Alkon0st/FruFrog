import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    mainView: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'flex-start',
        flex: 1,
        marginLeft: '10px',
        marginRight: '10px',
    },
    button: {
        margin: 5,
        borderRadius: 20,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: '#85BB65',
        borderColor: '#4F723A',
        borderWidth: '3px',
        marginTop: '10px',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
});

export default styles;