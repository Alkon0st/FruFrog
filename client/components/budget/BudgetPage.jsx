import { useState } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import budgetCategories from './budgetCategories';
import styles from "./budgetPage.style";
import { handleAddCategory, handleAddSubCategory, toggleCategoryVisibility, getTotalAmount, handleUpdateAmount, deleteCategory, deleteSubCategory } from './budgetHandler';

const BudgetPage = () => {
    const [visible, setVisible] = useState({});
    const [isCategoryAdded, setIsCategoryAdded] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleAddNewCategory = () => {
        if (newCategory) {
            handleAddCategory(newCategory);
            setIsCategoryAdded(false);
            setNewCategory('');
        }
    };

    const handleAddNewSubCategory = () => {
        if (newSubCategory && selectedCategory) {
            handleAddSubCategory(selectedCategory, newSubCategory);
            setSelectedCategory(null);
            setNewSubCategory('');
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
                <TouchableOpacity onPress={() => setIsCategoryAdded(true)} style={styles.addButtonCategory}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                </View>
                {Object.keys(budgetCategories).filter(category => getTotalAmount(category, budgetCategories) > 0).map((category) => (
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
                                {/* <TouchableOpacity onPress={() => setSelectedCategory(category)} style={styles.addButtonCategory}>
                                    <Text style={styles.addButtonText}>+</Text>
                                </TouchableOpacity> */}
                            </View>
                        )}
                    </View>
                ))}
                
            </ScrollView>

            {isCategoryAdded && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isCategoryAdded}
                    onRequestClose={() => setIsCategoryAdded(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add New Category</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="New Category"
                                value={newCategory}
                                onChangeText={setNewCategory}
                            />
                            <Button title="Add" onPress={handleAddNewCategory} />
                            <Button title="Cancel" onPress={() => setIsCategoryAdded(false)} />
                        </View>
                    </View>
                </Modal>
            )}

            {selectedCategory && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={!!selectedCategory}
                    onRequestClose={() => setSelectedCategory(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add Subcategory to {selectedCategory}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="New Subcategory"
                                value={newSubCategory}
                                onChangeText={setNewSubCategory}
                            />
                            <Button title="Add" onPress={handleAddNewSubCategory} />
                            <Button title="Cancel" onPress={() => setSelectedCategory(null)} />
                        </View>
                    </View>
                </Modal>
            )}
        </SafeAreaView>
    );
};

export default BudgetPage;