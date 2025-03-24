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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from 'expo-router';


export default function Nav() {
    const navigation = useNavigation();

    //TabNav.Navigator is main navigator
    return (
        <View>
            <Button onPress={() => navigation.navigate(ProfilePage)}>
                Profile
            </Button>
        </View>
    )
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