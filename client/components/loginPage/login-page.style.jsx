import React from 'react';
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from './LoginPage';  

    
const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <LoginForm />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 30,
    },
});
export default App;

