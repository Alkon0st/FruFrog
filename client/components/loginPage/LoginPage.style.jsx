import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: '7%',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        margin: 10,
        width: 300,
        marginBottom: '10%',
    },
    subHeadingStyle: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 15,
        textAlign: 'center',
    },
    textStyle: {
        fontSize: 16,
        marginBottom: 9,
    },
    textInputStyle: {
        height: 40,
        borderColor: '#85BB65',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#85BB65',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    textButton: {
        color: 'white',
        fontWeight: 'normal',
        fontSize: 16,      
        textAlign: 'center',
    },
    buttonContainer: {
        marginBottom: 10,
    },
    alternateButton: {
        marginRight: '1%',
        alignItems: 'flex-end',
    },
    alternateButtonText: {
        color: '#1E1E1E',
        textDecorationLine: 'underline',
        marginBottom: 20,
        marginLeft: 20,
    },
    selectContainer: {
        marginBottom: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'italic',
        color: '#008000',
        fontSize: 18,
    },
    modalButton: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#85BB65',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    forgotPasswordContainer: {
        marginTop: 20,
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#008000',
    },
    linkText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 10,
    },
    pageBreak:{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingBottom: '10%', 
        width: '100%', 
        paddingRight: '10%', 
        paddingLeft: '10%'
    },
    lineBreak:{
        flex: 1, 
        height: 1, 
        backgroundColor: '#000000'
    },
    img: {
        width: 369, 
        height: 232,
        position: 'relative',
    },
  LinearGradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  viewStyle: {
      alignItems: 'center',
  },
  footer: {
      fontSize: 12,
      color: '#888',
      marginTop: 10,
      textAlign: 'center',
  },  
  showHideText: {
    color: '#067AFF',
    marginLeft: -40,
    marginTop: 10,
    zIndex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  errorText: {
    color: '#800D00',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default styles;