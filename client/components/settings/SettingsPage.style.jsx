import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    img: {
        height: 40,
        width: 40,
        tintColor: '#22470C',
    },
    // For sub icons/img like Pond Thumbnail
    imgSmall: {
        height: 30,
        width: 30,
        tintColor: '#22470C',
        marginRight: 10,
    },
    settingHeader: {
        backgroundColor: '#F6F6F6',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 10,
    },
    settingHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#22470C80'
    },
    // Menu option styling
    menuButton: {
        paddingVertical: 15,
        paddingRight: 30,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: '#F6F6F6',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        fontWeight: 'bold',
        color: '#22470C',
        fontSize: 20,
        marginLeft: 10,
    },
    menuChevron: {
        color: '#22470C',
        fontSize: 25,
        textAlign: 'right',
    },
    // submenu (like set icon) styling
    subMenuContainer: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#F6F6F6',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subMenuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subMenuHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#22470C',
    },

    closeButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        padding: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 30,
    },
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
        color: '#000000',
        textAlign: 'center',
    },
    
    container:{
        width: "100%",
    },
    viewStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    textStyle: {
        fontSize: 28,
        color: 'DarkGreen',
    },
    subHeadingStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'Medium',
        marginBottom: 10,
    },

    // Stuff for Settings Menu Buttons

    // BG & positioning
    dropDownContainer: {
        padding: 20,
        paddingHorizontal: 40,
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#F6F6F6',
    },
    // Sub item BG (ex. box around input for pond name)
    dropDownItem: {
        backgroundColor: '#B2E196',
        borderRadius: 6,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 3, 
        paddingTop: 2, 
        paddingBottom: 2, 
    },
    // Sub item name (Ex. Pond Thumbnail)
    dropDownHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#22470C',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        minHeight: 32,
        minWidth: 305,
        paddingHorizontal: 10,
        position: 'absolute',
    },
    icon: {
        width: 18,
        height: 18,
        alignSelf: 'flex-end',
        marginRight: 20,
        tintColor: '#22470C',
    },
    confirmButton: {
        backgroundColor: '#85BB65',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#4F723A',
        minHeight: 40,
        minWidth: 164,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmText: {
        color: '#FFFFFF',
        fontSize: 18,
    },

    //Content for Edit Thumbnail
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
    thumbnailSelectionContainer: {
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
    thumbnailCheckmark: {
        position: 'absolute',
        width: 32,
        height: 32,
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

    //Content for FAQ
    listItem: {
        margin: 3,
    },
    listItemText: {
        fontSize: 15,
    },

});

export default styles;