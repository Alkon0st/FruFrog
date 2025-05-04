import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    page: { 
        flex: 1,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1, 
        justifyContent: 'flex-start',
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

        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 15,
        rowGap: 10,
        columnGap: 5,
    },

    //Current Profile Display (at the top of ProfilePage)
    currentProfileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    currentUsername: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        color: '#22470C',
    },

    // Profile Styling  
    selectionContainer: {
        position: 'relative',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editProfileButton: {
        marginRight: 10,
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
    fontStyle: 'italic',
    color: '#8D8D8D',
    marginVertical: 20,
    textAlign: 'center',
    },  

    //Success message

    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    successView: {
        backgroundColor: '#B2E196',
        padding: 20,
        borderRadius: 6,
        width: 305,
        height: 74,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#0000000'
    },
    successCheckmark:{
        width: 30,
        height: 30,
        marginLeft: 10,
    },
});

export default styles;