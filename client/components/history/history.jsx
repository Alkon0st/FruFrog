import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './historyPage.style';
import HeaderNav from '../nav/HeaderNav';
import { useNavigation } from '@react-navigation/native';

function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [expenseData, setExpenseData] = useState(data || []);

  const navigation = useNavigation();

  const categories = ['All', ...new Set(expenseData.map(item => item.category))];

  const filteredData = expenseData.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = async (item) => {
    try {
      const updated = parseFloat(editAmount);
      if (isNaN(updated)) return;

      if (item.source === "api") {
        await fetch(`http://localhost:5000/api/bills/${item.fullBill._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item.fullBill, total: updated }),
        });
      }

      const newData = expenseData.map(expense =>
        expense.id === item.id ? { ...expense, amount: updated } : expense
      );
      setExpenseData(newData);
      setEditAmount('');
      setEditingId(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

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
            onPress={() => navigation.navigate('BillSplit', { bill: item.fullBill })}
          >
            <Text style={styles.buttonTextStyle}>View Bill</Text>
          </TouchableOpacity>
        </View>

        {editingId === item.id ? (
          <TextInput
            style={styles.editInput}
            keyboardType="numeric"
            value={editAmount}
            onChangeText={setEditAmount}
            onBlur={() => handleEdit(item)}
          />
        ) : (
          <TouchableOpacity
            onLongPress={() => {
              setEditingId(item.id);
              setEditAmount(item.amount.toString());
            }}
          >
            <Text style={styles.amountText}>${item.amount}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or category..."
          placeholderTextColor="#A9A9A9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default History;
