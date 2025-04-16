import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import styles from "./historyPage.style";
import HeaderNav from '../nav/HeaderNav';
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const expenseData = [
    { id: '1', date: '01 - Wednesday', category: 'Food', icon: 'fastfood', name: "Domino's", amount: '$12.89' },
    { id: '2', date: '02 - Thursday', category: 'Bill', icon: 'receipt', name: 'Escape Room', amount: '$60 (Owe: $15)' },
    { id: '3', date: '02 - Thursday', category: 'Food', icon: 'fastfood', name: "Dave's Hot Chicken", amount: '$11.56' },
    { id: '4', date: '05 - Sunday', category: 'Grocery', icon: 'shopping-cart', name: "Trader Joe's", amount: '$39.77' },
    { id: '5', date: '05 - Sunday', category: 'Gas', icon: 'local-gas-station', name: 'Chevron', amount: '$48.60' },
    { id: '6', date: '05 - Sunday', category: 'Grocery', icon: 'shopping-cart', name: 'Walmart', amount: '$10.51' },
    { id: '7', date: '17 - Friday', category: 'Maintenance', icon: 'build', name: 'Oil Change', amount: '$50.67' },
    { id: '8', date: '17 - Friday', category: 'Grocery', icon: 'shopping-cart', name: "Farmer's Market", amount: '$33.72' },
    { id: '9', date: '17 - Friday', category: 'Grocery', icon: 'shopping-cart', name: 'Target', amount: '$3.15' },
];

function HistoryPage() {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.expenseRow}>
                <Icon name={item.icon} size={24} color="#008000" style={styles.icon} />
                <View style={styles.expenseDetails}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                    <Text style={styles.nameText}>{item.name}</Text>
                </View>
                <Text style={styles.amountText}>{item.amount}</Text>
            </View>
        </View>
    );
        
    return (
        <LinearGradient
            locations={[0, 0.47, 1]}
            colors = {['#F1FFFF', '#FEFFF5', '#B1F1EF']}
            style={styles.LinearGradient}
            >
            <HeaderNav navigation={navigation} title="History" />
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Expense Records</Text>
            </View>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Keywords Here..."
                placeholderTextColor={"#A9A9A9"}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>January 2025</Text>
                </View>
                <FlatList
                    data={expenseData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                />
                <View style={styles.toggleContainer}>
                    <TouchableOpacity style={styles.toggleButton}>
                        <Icon name="calendar-day" size={24} color="#4CAF50" />
                        <Text style={styles.toggleText}>Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButton}>
                        <Icon name="calendar-week" size={24} color="#4CAF50" />
                        <Text style={styles.toggleText}>Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButton}>
                        <Icon name="calendar-month" size={24} color="#4CAF50" />
                        <Text style={styles.toggleText}>Month</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

export default HistoryPage;