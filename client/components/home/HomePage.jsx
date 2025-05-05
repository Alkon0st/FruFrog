import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ant-design';

import HeaderNav from '../nav/HeaderNav';

function HomePage() {

    return (
        <SafeAreaProvider>
        <SafeAreaView style ={styles.viewStyle}>
        <LinearGradient
            colors = {['#F1FEFE', '#B2F0EF']}
            style = {styles.page}
        >
            <ScrollView>
                <HeaderNav />
                <Text style ={styles.headingStyle}>Hello, (user)</Text>
                <View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', padding: '20'}}> 
                    <Text style ={styles.textStyle}>Budget Overview</Text>
                    <Text style ={styles.textStyle}>Planned Expenses</Text>
                    <Text style ={styles.textStyle}>$$$$$$$$</Text>
                    <Text style ={styles.textStyle}>$$$$$$Left to budget</Text>
                    </View>
                    <View>
                        <Text style ={styles.textStyle}>Category Cards</Text>
                    </View>
                    <View>
                        <Text style ={styles.textStyle}>PieChart</Text>
                    </View>
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
        justifyContent: 'center',
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
    page: {  
        flex: 1,
        justifyContent:'flex-end',
        backgroundColor: 'white',
    },
});

export default HomePage