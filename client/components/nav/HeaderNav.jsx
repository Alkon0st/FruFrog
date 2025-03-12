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
import { createStackNavigator } from '@react-navigation/stack';

export default function HeaderButton() {
    const Stack = createStackNavigator()

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