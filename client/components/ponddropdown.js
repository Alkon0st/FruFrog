import { useState } from 'react';
import { StyleSheet, Button, View, Text, Alert } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// SafeAreaView & associated are modules that automatically applies padding for views that are not covered

// To implement styles
const Separator = () => <View style={styles.separator} />;

// For the drop down button at the top
const DropButton = () => {
    const [show, setShow] = useState(true);
    const handleShow = () => setShow(!show);

    return (
        <SafeAreaProvider>
            <SafeAreaView style = {styles.separator}>
                <View>
                    <button type="button" onCLick={handleShow}>
                        Current Group Name
                    </button>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

// Dropdown
export default function DropMenu ({show, handleHide}){
    return (
        <SafeAreaProvider>
            <SafeAreaView style = {styles.separator}>
                <View>
                    <div hidden={show} style={styles.dropdown}>
                        Surprise!
                    </div>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

// styles storage
const styles = StyleSheet.create({
    dropdown: {
        height: "200px",
        width: "50%",
        backgroundColor: "Green",
        justifyContent: start
    }
})