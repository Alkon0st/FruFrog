import { useState } from 'react';
import { View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    FlatList
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import styles from "./budget.style";
import DATA from "./data"

const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

// const renderItem = ({item}) => {
//     const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
//     const color = item.id === selectedId ? 'white' : 'black';

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         backgroundColor={backgroundColor}
//         textColor={color}
//       />
//     );
//   };

  


const Budget = () => {
    return (
            <SafeAreaView>
                <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor = {item => item.id}
                />
                <Text>Categories</Text>
                <Text>Subcategories</Text>      
            </SafeAreaView>
    )
}

export default Budget