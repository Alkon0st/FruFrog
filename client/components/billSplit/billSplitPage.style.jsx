import { StyleSheet } from "react-native";

// Bill Page Styles
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    billHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },
    billHeaderTitle: {
        fontSize: 30,
        color: '#22470C',
        fontWeight: 'bold',
    },
    billList: {
        width: '100%',
        paddingHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
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
        textAlign: 'center',
        color: '#555',
    },
});

export default styles;