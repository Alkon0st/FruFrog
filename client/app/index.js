import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Budget, CreateAccount} from '../components';
import Nav from '../components/nav/Nav';
import ForgotPassword from '../components/loginPage/ForgotPassword';
import LoginPage from '../components/loginPage/LoginPage';


const Stack = createStackNavigator();
const Home = () => {

    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }}/>
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                    <Stack.Screen name="Nav" component={Nav} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </NavigationIndependentTree>

        
    );
};
export default Home;
