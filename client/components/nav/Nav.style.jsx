import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  currentPondButton: {
    margin: 5,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#4F723A',
    borderWidth: '2px',
    width: 219,
    minHeight: 44,
  }, 
  currentPondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  currentPondText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  mainView: {
    display: 'flex',
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
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
      alignItems: 'center',
      paddingHorizontal: '20px',
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
    width: '100%',
    alignSelf: 'center',
  },
  button: {
      margin: 5,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: '#89d149',
      alignItems: 'center',
  },
});

export default styles;