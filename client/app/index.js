import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Reac, {useState} from 'react';
import { Stack, useRouter } from 'expo-router';
import HookComponent from '../components/hookComponent';
import {Budget, Nav, HomePage} from '../components';

const Home = () => {
    const router = useRouter();

    const [showHookComponent, setShowHookComponent] = useState(false);
    const fetchData = () => {
    setShowHookComponent(true);
    };

    return (
        <Nav/>
        // <HomePage/>
        // <SafeAreaView>
        //     <View>
        //         <Text>Home</Text>
        //         <Nav/>
        //         <Budget/>


        //         {/* this section is for api call testing*/}
        //         {showHookComponent && <HookComponent />}
        //         <TouchableOpacity onPress={fetchData} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
        //             <Text style={{ color: 'white', textAlign: 'center' }}>Fetch Data</Text>
        //         </TouchableOpacity>
                
        //     </View>
        // </SafeAreaView>
    );
};
export default Home;
