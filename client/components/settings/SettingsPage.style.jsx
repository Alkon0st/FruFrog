import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    img: {
        height: 40,
        width: 40,
        tintColor: '#22470C',
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

});

export default styles;