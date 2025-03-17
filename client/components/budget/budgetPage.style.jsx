import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        width: "100%",
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    categoryButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    category: {
        paddingLeft: 10,
    },
    subCategory: {
        left: 20,
    },
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    h3: {
        fontSize: 18,
        marginBottom: 8,
    },
    p: {
        fontSize: 14,
        marginBottom: 8,
    },
    chevron: {
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        width: 150,
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    addButtonCategory: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
    categoriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width,
        height: '60%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'baseline',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default styles;