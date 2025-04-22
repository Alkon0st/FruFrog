import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: 25,
    height: 25,
    tintColor: '#FFFFFF',
  },
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: '100%',
    minHeight: 415,
    alignSelf: 'flex-start',
  },
  button: {
    margin: 5,
    marginTop: 10,
    borderRadius: 30,
    padding: 8,
    paddingLeft: 9,
  },
  buttonOpen: {
    backgroundColor: '#85BB65',
    borderColor: '#4F723A',
    borderWidth: '3px',
  },
  buttonClose: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  textClose: {
    color: '#000000',
    fontSize: 25,
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