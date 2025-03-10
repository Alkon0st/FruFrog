import HomeScreen from './HomeScreen';
import Budget from './budget./Budget';

import { Text } from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// npx expo start --android

const Stack = createNativeStackNavigator(); //creates stack for nav

function App() {

    // Navigation Container is a wrapper for the navigator
    // Stack.Navigator is a wrapper for the screen
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component = {HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

