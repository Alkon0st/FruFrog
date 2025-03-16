import {StyleSheet, Text, View, Button} from 'react-native';

import CreatePond from '../pondFunctions/CreatePond';

function HomePage() {
    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Home Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the home page</Text>
            
            {/* Function to call for create pond */}
            <CreatePond /> 
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        display: 'flex',
        justifyConten: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textStyle: {
        fontSize: 20,
        color: '#309c61',
    },
    headingStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomePage