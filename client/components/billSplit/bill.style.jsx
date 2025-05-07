import { StyleSheet } from "react-native";

// Bill Styles
const styles = StyleSheet.create({
    billContainer: {
        width: "100%",
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
        alignItems: 'center',
   },
    billMembersSection: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'left',
  },
    billTotalSection: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
   },
    billTitle: {
        fontSize: 20,
    },
    billDate: {
        fontSize: 12,
        color: '#767676',
    },
    billCategory: {
        fontSize: 12,
        color: '#767676',
    },
    billPaid: {
        fontSize: 20,
        color: '#22470c',
    },
    billTotal: {
        color: '#9e9e9e',
    },
})

export default styles;