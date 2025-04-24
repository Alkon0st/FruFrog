import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import styles from "./historyPage.style";
import HeaderNav from '../nav/HeaderNav';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const expenseData = [
    { date: '01 - Wednesday', category: 'Food', icon: 'fastfood', name: "Domino's", amount: '$12.89' },
    { date: '02 - Thursday', category: 'Entertainment', icon: 'receipt', name: 'Escape Room', amount: '$60 (Owe: $15)' },
    { date: '02 - Thursday', category: 'Food', icon: 'fastfood', name: "Dave's Hot Chicken", amount: '$11.56' },
    { date: '05 - Sunday', category: 'Food', icon: 'shopping-cart', name: "Trader Joe's", amount: '$39.77' },
    { date: '05 - Sunday', category: 'Others', icon: 'local-gas-station', name: 'Chevron', amount: '$48.60' },
    { date: '05 - Sunday', category: 'Others', icon: 'shopping-cart', name: 'Walmart', amount: '$10.51' },
    { date: '15 - Wednesday', category: 'Rent', icon: 'your-mom-house', name: "my place", amount: '$1,599' },
    { date: '17 - Friday', category: 'Utilities', icon: 'build', name: 'Oil Change', amount: '$50.67' },
    { date: '17 - Friday', category: 'Food', icon: 'shopping-cart', name: "Farmer's Market", amount: '$33.72' },
    { date: '17 - Friday', category: 'Food', icon: 'shopping-cart', name: 'Target', amount: '$3.15' },
];

function HistoryPage() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const categories = ['All', 'Food', 'Entertainment', 'Rent', 'Others', 'Utilities'];

    const filteredData = expenseData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.expenseRow}>
                <Icon name={item.icon} size={20} color="#008000" style={styles.icon} />
                <View style={styles.expenseDetails}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                    <Text style={styles.nameText}>{item.name}</Text>
                    <TouchableOpacity
                        style={styles.buttonText}
                        onPress={() => navigation.navigate('Bill Split')}
                    >
                        <Text style={styles.buttonTextStyle}>View Bill</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.amountText}>{item.amount}</Text>
            </View>
        </View>
    );

    return (
        <LinearGradient
            locations={[0, 0.47, 1]}
            colors={['#F1FFFF', '#FEFFF5', '#B1F1EF']}
            style={styles.LinearGradient}
        >
            <HeaderNav navigation={navigation} title="History" />
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Expense Records</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Keywords Here..."
                    placeholderTextColor={"#A9A9A9"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <View style={styles.filterContainer}>
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.filterButton,
                                selectedCategory === category && styles.filterButtonActive
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedCategory === category && styles.filterTextActive
                            ]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>January 2025</Text>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                />
            </ScrollView>
        </LinearGradient>
    );
}
export default HistoryPage;