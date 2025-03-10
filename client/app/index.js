import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Reac, {useState} from 'react';
import { Stack, useRouter } from 'expo-router';
import HookComponent from '../components/hookComponent';

const Home = () => {
    const [showHookComponent, setShowHookComponent] = useState(false);
    const router = useRouter();

    const fetchData = () => {
    setShowHookComponent(true);
    };

    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>
                {/* this section is for api call testing*/}
                {showHookComponent && <HookComponent />}
                <TouchableOpacity onPress={fetchData} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Fetch Data</Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    );
};
export default Home;
