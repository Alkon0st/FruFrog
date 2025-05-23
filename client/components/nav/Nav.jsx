import * as React from 'react';

// all the pages 
import HomePage from '../home/HomePage';
import BudgetPage from '../budget/BudgetPage'
import BillSplitPage from '../billSplit/billSplitPage'
import HistoryPage from '../history/historyPage'
import LoginPage from '../loginPage/LoginPage';
import CreateAccount from '../loginPage/create-account';
import ForgotPassword from '../loginPage/ForgotPassword';

import { View, StyleSheet, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// npm run start

// Just Tabs
export default function Nav() {
    const TabNav = createBottomTabNavigator()

    //TabNav.Navigator is main navigator
    return (
        <TabNav.Navigator
            // Hides label and styles the bar
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    height: 80,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#3A8F8380',
                    borderTopWidth: 2,
                    borderTopColor: '#000000',
                }}}>
            <TabNav.Screen name='Home' component={HomePage} options={{
                tabBarIcon: ({focused}) => (
                    // When focused is bitten lilypad
                    focused
                    ? <View style={styles.view}> <Image
                        source={require('./img/pad_active.png')}
                        resizeMode='contain'
                        style={styles.img}
                    /> 
                        <Text style={styles.focusedText}>Home</Text>
                    </View>
                    : <View style={styles.view}> <Image
                    source={require('./img/pad_idle.png')}
                    resizeMode='contain'
                    style={styles.img}
                    />
                    <Text style={styles.idleText}>Home</Text>
                    </View>
                ), 
            }} />
            <TabNav.Screen name='Budget' component={BudgetPage}options={{
                tabBarIcon: ({focused}) => (
                    focused
                    ? <View style={styles.view}> <Image
                        source={require('./img/pad_active.png')}
                        resizeMode='contain'
                        style={styles.img}
                    /> 
                        <Text style={styles.focusedText}>Budget</Text>
                    </View>
                    : <View style={styles.view}> <Image
                    source={require('./img/pad_idle.png')}
                    resizeMode='contain'
                    style={styles.img}
                    />
                    <Text style={styles.idleText}>Budget</Text>
                    </View>
                ), 
            }} />
            <TabNav.Screen name='BillSplit' component={BillSplitPage}options={{
                tabBarIcon: ({focused}) => (
                    focused
                    ? <View style={styles.view}> <Image
                        source={require('./img/pad_active.png')}
                        resizeMode='contain'
                        style={styles.img}
                    /> 
                        <Text style={styles.focusedText}>Bill Split</Text>
                    </View>
                    : <View style={styles.view}> <Image
                    source={require('./img/pad_idle.png')}
                    resizeMode='contain'
                    style={styles.img}
                    />
                    <Text style={styles.idleText}>Bill Split</Text>
                    </View>
                ), 
            }} />
            <TabNav.Screen name='History' component={HistoryPage}options={{
                tabBarIcon: ({focused}) => (
                    focused
                    ? <View style={styles.view}> <Image
                        source={require('./img/pad_active.png')}
                        resizeMode='contain'
                        style={styles.img}
                    /> 
                        <Text style={styles.focusedText}>History</Text>
                    </View>
                    : <View style={styles.view}> <Image
                    source={require('./img/pad_idle.png')}
                    resizeMode='contain'
                    style={styles.img}
                    />
                    <Text style={styles.idleText}>History</Text>
                    </View>
                ), 
            }} />
        </TabNav.Navigator>
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: 'center',
    },
    img: {
        width: 80, 
        height: 70,
    },
    focusedText: {
        color: 'white',
        position: 'absolute', 
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    idleText: {
        color: 'black',
        position: 'absolute', 
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});
