import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000'); 
            setData(response.data); 
        } catch (error) {
            setError(error);
            alert('API call is not working');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>
                {isLoading ? <Text>Loading...</Text> : <Text>Data: {JSON.stringify(data)}</Text>}
                {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}
                <TouchableOpacity onPress={fetchData} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Fetch Data</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default Home;
