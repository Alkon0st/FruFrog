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
  buttonTextStyle: {
    color: '#808080',
    fontSize: 10,
    fontWeight: 'light',
    textDecorationLine: 'underline',
  },
  textStyle: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 75,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
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
    alighSelf: 'center',
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

  filterContainer: {
    flexDirection: 'row',
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
    color: '#008000',
    fontSize: 16,
  },
  filterInput: {
    height: 40,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginLeft: 10,
    backgroundColor: '#F5F5F5',
  },
  chevron: {
    fontSize: 20,
    color: '#008000',
    marginLeft: 10,
  },
  filterTextActive: {
    color: '#fff',
  },
  buttonText: {
    position: 'center',
  },
});

export default styles;