import { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import budgetCategories from './budgetCategories';
import styles from "./budgetPage.style";
import { toggleCategoryVisibility, getTotalAmount, handleUpdateAmount } from './budgetHandler';
import AddSubcategoryModal from './modals/addSubcategoryModal';
import AddCategoryModal from './modals/addCategoryModal';
import EditSubcategoryModal from './modals/editSubcategoryModal';

const BudgetPage = () => {
    const [visible, setVisible] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const [newSubCategoryAmount, setNewSubCategoryAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [updatedSubCategoryName, setUpdatedSubCategoryName] = useState('');
    const [updatedSubCategoryAmount, setUpdatedSubCategoryAmount] = useState('');

    const handleAddNewCategory = () => {
        if (newCategory) {
            budgetCategories[newCategory] = [];
            setIsCategoryModalVisible(false);
            setNewCategory('');
        }
    };

    const handleAddNewSubCategory = () => {
        if (newSubCategory && selectedCategory && newSubCategoryAmount) {
            budgetCategories[selectedCategory].push({ name: newSubCategory, amount: parseFloat(newSubCategoryAmount) });
            setIsModalVisible(false);
            setNewSubCategory('');
            setNewSubCategoryAmount('');
        }
    };

    const handleUpdateSubCategory = () => {
        if (selectedCategory && selectedSubcategory && updatedSubCategoryName && updatedSubCategoryAmount) {
            const subcategories = budgetCategories[selectedCategory];
            const subcategoryIndex = subcategories.findIndex(sub => sub.name === selectedSubcategory.name);
            if (subcategoryIndex !== -1) {
                subcategories[subcategoryIndex] = {
                    name: updatedSubCategoryName,
                    amount: parseFloat(updatedSubCategoryAmount)
                };
                setIsEditModalVisible(false);
                setUpdatedSubCategoryName('');
                setUpdatedSubCategoryAmount('');
            }
        }
    };

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
                                {/* {budgetCategories[category].filter(subCategory => subCategory.amount > 0).map((subCategory) => ( */}
                                {budgetCategories[category].map((subCategory) => (    
                                    <View key={subCategory.name} style={[styles.subCategoryContainer, styles.p]}>
                                        <TouchableOpacity onPress={() => { setSelectedCategory(category); setSelectedSubcategory(subCategory); setUpdatedSubCategoryName(subCategory.name); setUpdatedSubCategoryAmount(subCategory.amount.toString()); setIsEditModalVisible(true); }}>
                                            <Text style={styles.subCategory}>
                                                {subCategory.name}: ${subCategory.amount}
                                            </Text>
                                        </TouchableOpacity>
                                    </View> 
                                ))}
                                <TouchableOpacity onPress={() => { setSelectedCategory(category); setIsModalVisible(true); }} style={styles.addButton}>
                                        <Text style={styles.addButtonText}>Add</Text>
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

            <EditSubcategoryModal
                visible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
                selectedSubcategory={selectedSubcategory}
                updatedSubCategoryName={updatedSubCategoryName}
                setUpdatedSubCategoryName={setUpdatedSubCategoryName}
                updatedSubCategoryAmount={updatedSubCategoryAmount}
                setUpdatedSubCategoryAmount={setUpdatedSubCategoryAmount}
                handleUpdateSubCategory={handleUpdateSubCategory}
            />
        </SafeAreaView>
    );
};

export default BudgetPage;