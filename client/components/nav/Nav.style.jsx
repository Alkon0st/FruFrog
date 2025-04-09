import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    mainView: {
      display: 'flex',
      flex: 1,
      justifyContent: 'top',
      alignItems: 'flex-start',
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
        marginLeft: '10px',
        marginRight: '10px',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingTop: '10px',
    },
    modalBackground: {
      backgroundColor: 'rgba(179, 228, 183, 0.5)',
      flex: 1,
    },
    modalView: {
      backgroundColor: 'white',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: width,
      alignSelf: 'center',
    },
    button: {
        margin: 5,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#89d149',
        alignItems: 'center',
        flex: 1,
    },
});

export default styles;