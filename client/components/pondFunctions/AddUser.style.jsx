import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(179, 228, 183, 0.5)'
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
      },
      button: {
        margin: 5,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      warningText: {
        color: '#EF0000',
      },
      headingStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
      },
      textInputStyle: {
        fontSize: 20,
      },
      textStyle: {
        fontSize: 20,
        color: '#309c61',
        marginBottom: 3,
      },
      textButton: {
        margin: 3,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });

export default styles;