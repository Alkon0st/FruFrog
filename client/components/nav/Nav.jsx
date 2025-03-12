import * as React from 'react';

// all the pages 
import HomePage from '../home/HomePage';
import BudgetPage from '../budget/BudgetPage'
import BillSplitPage from '../billSplit/billSplitPage'
import HistoryPage from '../history/historyPage'
import CroakPage from '../croak/croakPage'

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
            <TabNav.Screen name='Budget' component={BudgetPage}/>
            <TabNav.Screen name='BillSplit' component={BillSplitPage}/>
            <TabNav.Screen name='History' component={HistoryPage}/>
            <TabNav.Screen name='Croak' component={CroakPage}/>

        </TabNav.Navigator>
    )
}