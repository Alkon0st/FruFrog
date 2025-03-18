import * as React from 'react';

// all the pages 
import HomePage from '../home/HomePage';
import BudgetPage from '../budget/BudgetPage'
import BillSplitPage from '../billSplit/billSplitPage'
import HistoryPage from '../history/historyPage'
import ProfilePage from '../profile/ProfilePage'
import SettingsPage from '../settings/SettingsPage'


import { Button, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator()

export default function HeaderButton() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Profile" 
            component={ProfilePage}
            options={{
                headerRight: () => (
                    <TouchableOpacity
                        title='Profile' 
                        onPress={() => console.log('Profile button pressed')}
                    />
                ),
            }} />
        </Stack.Navigator>
    );
} 

        // <Stack.Navigator>
        //     <Stack.Screen
        //     name='Settings'
        //     component={SettingsPage}
        //     options={({ navigation2 }) => ({
        //         headerLeft: () => (
        //             <Button onPress={() => navigation.navigate(SettingsPage)}>Settings</Button>
        //         ),
        //     })} />
        // </Stack.Navigator>