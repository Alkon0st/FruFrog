import * as React from 'react';

// all the pages 
import HomePage from '../home/HomePage';
import BudgetPage from '../budget/BudgetPage'
import BillSplitPage from '../billSplit/billSplitPage'
import HistoryPage from '../history/historyPage'
import CroakPage from '../croak/croakPage'
import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'
import LoginPage from '../loginPage/LoginPage';


import { Button, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// npm run start

// Just Tabs
export default function Nav() {
    const TabNav = createBottomTabNavigator()

    //TabNav.Navigator is main navigator
    return (
        <TabNav.Navigator>
            <TabNav.Screen name='Login' component={LoginPage}/>
            <TabNav.Screen name='Home' component={HomePage}/>
            <TabNav.Screen name='Budget' component={BudgetPage}/>
            <TabNav.Screen name='BillSplit' component={BillSplitPage}/>
            <TabNav.Screen name='History' component={HistoryPage}/>
            <TabNav.Screen name='Croak' component={CroakPage}/>
        </TabNav.Navigator>
    )
}

