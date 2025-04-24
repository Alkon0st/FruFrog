import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // could use select container for history page as resource
  LinearGradient: {
    flex: 1,
  },
  viewStyle: {
    alignItems: 'flex-start',
    marginTop: 50,
    padding: 20,
  },
  textStyle: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 75,
  },
  searchBar: {
    height: 40,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    backgroundColor: '#85BB65',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#85BB65',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  expenseDetails: {
    flex: 1,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
    backgroundColor: '#F5F5F5',
  },
  toggleButton: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
},
filterContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 25,
},
filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#85BB65',
    marginRight: 5,
    marginBottom: 5,
},
filterButtonActive: {
    backgroundColor: '#4CAF50',
},
filterText: {
    color: '#333',
    fontSize: 12,
},
filterTextActive: {
    color: '#fff',
},
buttonText: {
    position: 'center',
},
buttonTextStyle: {
    color: '#808080',
    fontSize: 10,
    fontWeight: 'light',
    textDecorationLine: 'underline',
},
});

export default styles;