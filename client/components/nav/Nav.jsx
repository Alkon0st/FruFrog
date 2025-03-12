import * as React from 'react';

// all the pages 
import HomePage from '../home/HomePage';
import BudgetPage from '../budget/BudgetPage'
import BillSplitPage from '../billSplit/billSplitPage'
import HistoryPage from '../history/historyPage'
import CroakPage from '../croak/croakPage'
import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'


import { Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// npm run start

function HeaderButton() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Default" 
            component={None}
            options={({ navigation }) => ({
                headerRight: () => (
                    <Button onPress={() => navigation.navigate(ProfilePage)}>Profile</Button>
                ),
                headerLeft: () => (
                    <Button onPress={() => navigation.navigate(SettingsPage)}>Settings</Button>
                ),
            })} />
        </Stack.Navigator>
    )
} 

function Nav() {
    const TabNav = createBottomTabNavigator()

    //TabNav.Navigator is main navigator
    return (
        <TabNav.Navigator>
            <TabNav.Screen name='Home' component={HomePage}/>
            <TabNav.Screen name='Budget' component={BudgetPage}/>
            <TabNav.Screen name='BillSplit' component={BillSplitPage}/>
            <TabNav.Screen name='History' component={HistoryPage}/>
            <TabNav.Screen name='Croak' component={CroakPage}/>
        </TabNav.Navigator>
    )
}

export default {Nav, HeaderButton}