import { View, Text, TouchableOpacity,FlatList } from 'react-native';
import useFetch from '../hook/useFetch';

const hookComponent = () => {
    const {data, isLoading, error} = useFetch('http://localhost:5000')

    if (isLoading) return <Text>Loading...</Text>
    if (error) return <Text>Error: {error.message}</Text>

    return(
        <View>
            
            {isLoading ? <Text>Loading...</Text> : <Text>Data: {JSON.stringify(data)}</Text>}
            {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}
        </View>
    )
}

export default hookComponent;