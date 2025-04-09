import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Budget, Nav, HomePage, HeaderButton} from '../components';


const Stack = createStackNavigator();
const Home = () => {

    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Stack.Navigator name="Home" component={HomePage} />
            </NavigationContainer>
        </NavigationIndependentTree>
    //    <Nav/>
        
    );
};
export default Home;
