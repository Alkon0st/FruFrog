import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
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
    borderRadius: 10,
    padding: 10,
    minWidth: 118,
    minHeight: 40,
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
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
    textAlign: 'center',
  },
  textInputStyle: {
    fontSize: 20,
    color: '#A0A0A0',
  },
  textStyle: {
    fontSize: 20,
    color: '#309c61',
    marginBottom: 3,
    padding: 3,
  },
  textButton: {
    margin: 3,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  popup: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContent: {
    width: '100%',
    padding: 20,
    paddingTop: 55,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  pondView: {
    backgroundColor: '#c3edab',
    borderColor: '#6a9153',
    borderWidth: '3px',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: 15,
  },
  pondSubView: {
    flexDirection: 'row',
  },
  pondName: {
    fontSize: '120%',
    fontWeight: 'bold'
  },
  pondLabel: {
    marginLeft: '10px',
    textDecorationLine: 'underline',
  },
  pondDetail: {
    textDecorationLine: 'none',
    marginLeft: '5px',
  },

  //For Modal
  labelContainer:{
    marginTop: 20,
    width: 175,
    height: 48,
    backgroundColor: '#85BB65',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF'
  },
  itemContainer:{
    marginBottom: 10,
    width: 367,
    minHeight: 80,
    backgroundColor: '#B2E196',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer:{
    padding: 10,
    width: 322,
    minHeight: 32,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },

  //For Thumbnail Scrolling
  editThumbnailScrollContent: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      alignItems: 'center',
      width: 305,
  },
  editThumbnailButton: {
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  selectionContainer: {
      position: 'relative',
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
  },
  selectedOverlay: {      
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 30,
      backgroundColor: '#D9D9D980',
  },
  checkmark: {
      position: 'absolute',
      width: 32,
      height: 32,
  },

  // Confirm Button for Create Pond
  createButton: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4F723A',
    backgroundColor: '#85BB65',
    width: 118,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  createText: {
    fontSize: 15,
    color: '#FFFFFF',
  },

  //Join button for join pond
  joinInfo: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 5,
    fontSize: 16,
  },
  joinButton: {
    marginTop: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#4F723A',
    width: 50,
    height: 50,
    backgroundColor: '#85BB65',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCheckmark: {
    width: 25,
    height: 25,
    tintColor: '#000000',
  },
});

export default styles;