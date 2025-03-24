import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Dimensions, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import CreatePond from '../pondFunctions/CreatePondFolder/CreatePond';
import AddUser from '../pondFunctions/AddUser';
import CreatePage from '../pondFunctions/CreatePondFolder/CreatePage';

function HomePage() {

    return (
        <SafeAreaProvider>
        <SafeAreaView style ={styles.viewStyle}>
        <LinearGradient
            colors = {['#F1FEFE', '#B2F0EF']}
            style = {styles.page}
        >
            <ScrollView>
                <Text style ={styles.headingStyle}>Home Page</Text>
                <Text style ={styles.textStyle}>This is the placeholder for the home page</Text>
                
                <View style={styles.buttonRow}>
                {/* Function to call for create pond */}
                <AddUser />
                <CreatePage /> 
                </View>
            </ScrollView>
        </LinearGradient>

        </SafeAreaView>
        </SafeAreaProvider>

    );
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    viewStyle: {
        display: 'flex',
        justifyConten: 'center',
        alignItems: 'stretch',
        flex: 1,
    },
    textStyle: {
        fontSize: 20,
        color: '#309c61',
        textAlign: 'center',
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
    page: { 
        flexDirection: 'column', 
        flex: 1,
        justifyContent:'flex-end',
        backgroundColor: 'white',
    }
});

export default HomePage