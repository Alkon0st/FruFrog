import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    page: { 
        flexDirection: 'column', 
        flex: 1,
        justifyContent:'flex-end',
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        padding: 24,
        width: "100%",
    },
    spendingContainer: {
        backgroundColor: '#EAFFCB',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        marginTop: 1,
        border:"1px solid #85BB65",
    },
    graphContainer: {
        backgroundColor: '#EAFFCB',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        marginTop: 1,
        border:"1px solid #85BB65",
    },
    pieChartContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        marginTop: 1,
    },
    categoryContainer: {
        backgroundColor: '#EAFFCB',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        marginTop: 1,
        border:"1px solid #85BB65",
    },
    categoryTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        marginTop: 1,
    },
    categoryButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    category: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1FEFE',
        border:"1px solid #85BB65",
    },
    categoryText: {
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'space-between',
        flexDirection: 'row',
    },
    subCategoryContainer: {
        backgroundColor: '#FAFFD9',
        border:"1px solid gray",
        padding: 10,
    },
    subCategoryText: {
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'space-between',
        flexDirection: 'row',
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
        paddingRight: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        width: 150,
    },
    addButton: {
        backgroundColor: '#85BB65',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#FFA500',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#3F5830',
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
        backgroundColor: '#B2E196',
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