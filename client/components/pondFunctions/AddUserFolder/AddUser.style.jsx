import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText1: {
    fontSize: 32,
    color: '#22470C',
  },
  headerText2: {
    fontSize: 32,
    color: '#22470C',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  container: {
    minWidth: 350,
    minHeight: 190,
    backgroundColor: '#B2E196',
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 5,
  },
  codeBox: {
    width: 328,
    height: 100,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    borderRadius: 5,
  },
  codeText: {
    fontSize: 50,
    fontWeight: 'bold',
    letterSpacing: 4,
    textAlign: 'center',
    color: '#22470C'
  },
  codeHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000'
  },
  disclaimerText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#000000'
  },
  row: {
    flexDirection: 'row',
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
    paddingVertical: 40,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  buttonOpen: {
    backgroundColor: '#85BB65',
    borderColor: '#4F723A',
    borderWidth: '3px',
    margin: 15,
    borderRadius: 30,
    padding: 8,
    paddingLeft: 9,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClose: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    margin: 15,
    marginBottom: 5,
    marginLeft: 20,
  },
  textClose: {
    color: '#000000',
    fontSize: 30,
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