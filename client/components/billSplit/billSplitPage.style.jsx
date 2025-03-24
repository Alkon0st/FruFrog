import { StyleSheet } from "react-native";

// Bill Page Styles
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    page: {
    },
    pageContainer: {
        marginTop: 10,
        marginHorizontal: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    
    billHeader: {
        width: "50%",
        flexDirection: "row",
        justifyContent: "right",
        alignItems: "right",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    billHeaderTitle: {
        fontSize: 30,
        color: "black",
    },
    addButton: {
        width: "100%",
        backgroundColor: "#b2e196",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
   },
    addButtonText: {
      color: "#3f5830",
      fontSize: 15,
    },
    addButtonSubtext: {
      color: "ababab",
    },
    
    billList: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    billContainer: {
        width: "35%",
        backgroundColor: "white",
        padding: 10,
        marginTop: 15,
        borderRadius: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    billTitleSection: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'left',
    },
    billPaidSection: {
        width: '48%',
        justifyContent: 'right',
        alignItems: 'right',
   },
    billMembersSection: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'left',
  },
    billTotalSection: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'right',
   },
    billTitle: {
        fontSize: 20,
    },
    billDate: {

    },
    billPaid: {

    },
    billTotal: {

    },
    divider: {
        borderBottomWidth: 1,
        borderColor: 'black',
        backgroundColor: 'red',
        height: 1,
    }
});

export default styles;
