import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    },
  mainView: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: 'rgba(179, 228, 183, 0.5)'
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
    width: '100%',
    alignSelf: 'flex-start',
  },
  button: {
    margin: 5,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#89d149',
  },
  buttonOpen: {
    backgroundColor: '#85BB65',
    borderColor: '#4F723A',
    borderWidth: '3px',
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
  validText: {
    color: '#00ff26',
  },
  headingStyle: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  textInputStyle: {
    fontSize: 20,
    color: '#A0A0A0',
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