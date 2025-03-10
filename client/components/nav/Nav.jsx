import * as React from 'react';
import HomePage from '../home/HomePage';

import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// npx expo start --android
// npm run start

export default function Nav() {
    const TabNav = createBottomTabNavigator()

    //TabNav.Navigator is main navigator
    return (
        <TabNav.Navigator>
            <TabNav.Screen name='Home' component={HomePage}/>
            <TabNav.Screen name='Test' component={HomePage}/>
        </TabNav.Navigator>
    )
}