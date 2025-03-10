import HomeScreen from './HomeScreen';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// npx expo start --android

const Stack = createNativeStackNavigator(); //creates stack for nav

const App = () =>{

    // Navigation Container is a wrapper for the navigator
    // Stack.Navigator is a wrapper for the screen
    return (
        
            <Stack.Navigator>
                <Stack.Screen name='Home' component = {HomeScreen}/>
            </Stack.Navigator>
        
    );
}

export default App;

