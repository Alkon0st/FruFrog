import { StyleSheet } from "react-native";

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
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    categoriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});

export default styles;