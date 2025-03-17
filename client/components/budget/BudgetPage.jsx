import { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import budgetCategories from './budgetCategories';
import styles from "./budgetPage.style";
import { toggleCategoryVisibility, getTotalAmount, handleUpdateAmount } from './budgetHandler';
import AddCategoryModal from './addCategoryModal';
import AddSubcategoryModal from './addSubcategoryModal';


const BudgetPage = () => {
    // useState to manage the visibility of categories and modals
    const [visible, setVisible] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const [newSubCategoryAmount, setNewSubCategoryAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Function to handle adding a new category
    const handleAddNewCategory = () => {
        if (newCategory) {
            budgetCategories[newCategory] = [];
            setIsCategoryModalVisible(false);
            setNewCategory('');
        }
    };

    // Function to handle adding a new subcategory to the selected category
    const handleAddNewSubCategory = () => {
        if (newSubCategory && selectedCategory && newSubCategoryAmount) {
            // Add the new subcategory to the selected category
            budgetCategories[selectedCategory].push({ name: newSubCategory, amount: parseFloat(newSubCategoryAmount) });
            setIsModalVisible(false);
            setNewSubCategory('');
            setNewSubCategoryAmount('');
        }
    };

    // Function to render the chevron icon based on category visibility
    const renderChevron = (category) => (
        <Text style={styles.chevron}>
            {visible[category] ? 'v' : '>'}
        </Text>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.h1}>Budget Page</Text>

                <Text style={styles.h2}>Spending Power</Text>

                <Text style={styles.h2}>Graph</Text>
                <View style={styles.categoryContainer}>
                    <Text style={styles.h2}>Categories</Text>
                    <TouchableOpacity onPress={() => setIsCategoryModalVisible(true)} style={styles.addButtonCategory}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                
                {/* {Object.keys(budgetCategories).filter(category => getTotalAmount(category, budgetCategories) > 0).map((category) => ( */}
                {Object.keys(budgetCategories).map((category) => (
                    <View key={category}>
                        <TouchableOpacity onPress={() => toggleCategoryVisibility(category, setVisible)} style={styles.categoryContainer}>
                            <Text style={[styles.category, styles.h3]}>
                                {category}: ${getTotalAmount(category, budgetCategories)}
                            </Text>
                            {renderChevron(category)}
                        </TouchableOpacity>

                        {visible[category] && (
                            <View>
                                {budgetCategories[category].filter(subCategory => subCategory.amount > 0).map((subCategory) => (
                                    <View key={subCategory.name} style={[styles.subCategoryContainer, styles.p]}>
                                        <TouchableOpacity onPress={() => handleUpdateAmount(category, subCategory.name, subCategory.amount, setVisible, visible)}>
                                            <Text style={styles.subCategory}>
                                                {subCategory.name}: ${subCategory.amount}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                <TouchableOpacity onPress={() => { setSelectedCategory(category); setIsModalVisible(true); }} style={styles.addButton}>
                                    <Text style={styles.addButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>

            <AddCategoryModal
                visible={isCategoryModalVisible}
                onClose={() => setIsCategoryModalVisible(false)}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                handleAddNewCategory={handleAddNewCategory}
            />

            <AddSubcategoryModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                selectedCategory={selectedCategory}
                newSubCategory={newSubCategory}
                setNewSubCategory={setNewSubCategory}
                newSubCategoryAmount={newSubCategoryAmount}
                setNewSubCategoryAmount={setNewSubCategoryAmount}
                handleAddNewSubCategory={handleAddNewSubCategory}
            />
        </SafeAreaView>
    );
};

export default BudgetPage;