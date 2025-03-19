import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import CreatePond from '../pondFunctions/CreatePondFolder/CreatePond';
import AddUser from '../pondFunctions/AddUser';
import CreatePage from '../pondFunctions/CreatePondFolder/CreatePage';

function HomePage() {

    return (
        <View style ={styles.viewStyle}>
            <Text style ={styles.headingStyle}>Home Page</Text>
            <Text style ={styles.textStyle}>This is the placeholder for the home page</Text>
            
            <View style={styles.buttonRow}>
            {/* Function to call for create pond */}
            <AddUser />
            <CreatePage /> 
            </View>
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
    buttonRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingTop: '10px',
    },
});

export default HomePage