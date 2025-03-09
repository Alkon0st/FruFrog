import { View, Text, TouchableOpacity,FlatList } from 'react-native';
import useFetch from '../hook/useFetch';

const {data} = useFetch()

console.log(data)

const hookTryOut = () => {
    return (
        <View>
            <TouchableOpacity
                onPress={useFetch}
            >
                apiCall
            </TouchableOpacity>
        </View>
    )
}

export default hookTryOut;