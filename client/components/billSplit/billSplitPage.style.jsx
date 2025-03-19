import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#d6faf9",
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
        // backgroundColor: "red",
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
        // backgroundColor: "blue",
    },
    billContainer: {
        width: "50%",
        backgroundColor: "white",
        padding: 10,
        marginTop: 15,
        borderRadius: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    billTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    billDate: {

    },
    billPaid: {

    },
    billTotal: {

    },
});

export default styles;
