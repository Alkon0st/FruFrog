import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    page: { 
        flex: 1,
    },
    bottomContainer: {
        
    },

    //Header 
    headerContainer: {
        margin: 10,
        paddingTop: 40,
        position: 'relative',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        flex: 1,
    },
    headingStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#22470C',
        textAlign: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 30,
    },

    // Content
    contentContainer: {
        backgroundColor: '#B2E196',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        width: 332,
        minHeight: 128,
    },

    //Confirm Changes button
    confirmButton: {
        margin: 5,
        marginBottom: 20,
        padding: 10,
        minWidth: 174,
        height: 40,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        backgroundColor: '#85BB65',
        borderColor: '#4F723A',
    },
    confirmText: {
        color: '#FFFFFF',
        fontSize: 15,
        textAlign: 'center', 
    },

    //Logout
    logOutButton: {
        backgroundColor: '#FF6060',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#590000',
        width: 174,
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 18,
    },
    logOutContent: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logOutImg: {
        width: 20,
        height: 20,
        tintColor: '#000000',
        marginRight: 5,
    },
    logOutText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },

    
  footer: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    },  
});

export default styles;