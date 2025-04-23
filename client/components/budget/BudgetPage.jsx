import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import styles from "./budgetPage.style";
import {
    toggleCategoryVisibility,
    getTotalAmount,
    handleAddCategory,
    handleAddSubCategory,
    handleUpdateSubCategory,
} from './budgetHandler';
import AddSubcategoryModal from './modals/addSubcategoryModal';
import AddCategoryModal from './modals/addCategoryModal';
import EditSubcategoryModal from './modals/editSubcategoryModal';
import HeaderNav from '../nav/HeaderNav';

const BudgetPage = () => {
    const [visible, setVisible] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const [budgetCategories, setBudgetCategories] = useState({});
    const [newCategory, setNewCategory] = useState('');
    const [newSubCategory, setNewSubCategory] = useState('');
    const [newSubCategoryAmount, setNewSubCategoryAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [updatedSubCategoryName, setUpdatedSubCategoryName] = useState('');
    const [updatedSubCategoryAmount, setUpdatedSubCategoryAmount] = useState('');

    const renderChevron = (category) => (
        <Text style={styles.chevron}>
            {visible[category] ? 'v' : '>'}
        </Text>
    );

    // Fetch budget categories in real-time
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const fetchBudgetCategories = async () => {
                try {
                    const pondsQuery = query(
                        collection(db, 'ponds'),
                        where('members', 'array-contains', user.uid)
                    );

                    const unsubscribePonds = onSnapshot(pondsQuery, (pondsSnapshot) => {
                        pondsSnapshot.forEach((pondDoc) => {
                            const pondId = pondDoc.id;

                            const categoriesRef = collection(db, "ponds", pondId, "budgetCategories");
                            const unsubscribeCategories = onSnapshot(categoriesRef, (categoriesSnapshot) => {
                                const data = {};
                                categoriesSnapshot.forEach((doc) => {
                                    data[doc.id] = doc.data().items;
                                });
                                setBudgetCategories(data);
                            });

                            // Cleanup listener for categories
                            return () => unsubscribeCategories();
                        });
                    });

                    // Cleanup listener for ponds
                    return () => unsubscribePonds();
                } catch (err) {
                    console.error("Failed to fetch budget categories: ", err);
                }
            };

            fetchBudgetCategories();
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#F1FEFE', '#B2F0EF']}
                style={styles.page}
            >
                <ScrollView>
                    <HeaderNav />
                    <Text style={styles.h1}>Budget Page</Text>

                    <Text style={styles.h2}>Spending Power</Text>

                    <Text style={styles.h2}>Graph</Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.h2}>Categories</Text>
                        <TouchableOpacity onPress={() => setIsCategoryModalVisible(true)} style={styles.addButtonCategory}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {Object.keys(budgetCategories).map((category) => (
                        <View key={category}>
                            <TouchableOpacity
                                onPress={() => toggleCategoryVisibility(category, setVisible)}
                                style={styles.categoryContainer}
                            >
                                <Text style={[styles.category, styles.h3]}>
                                    {category}: ${getTotalAmount(category, budgetCategories)}
                                </Text>
                                {renderChevron(category)}
                            </TouchableOpacity>

                            {visible[category] && (
                                <View>
                                    {budgetCategories[category].map((subCategory) => (
                                        <View key={subCategory.name} style={[styles.subCategoryContainer, styles.p]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelectedCategory(category);
                                                    setSelectedSubcategory(subCategory);
                                                    setUpdatedSubCategoryName(subCategory.name);
                                                    setUpdatedSubCategoryAmount(subCategory.amount.toString());
                                                    setIsEditModalVisible(true);
                                                }}
                                            >
                                                <Text style={styles.subCategory}>
                                                    {subCategory.name}: ${subCategory.amount}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedCategory(category);
                                            setIsModalVisible(true);
                                        }}
                                        style={styles.addButton}
                                    >
                                        <Text style={styles.addButtonText}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>
            </LinearGradient>

            <AddCategoryModal
                visible={isCategoryModalVisible}
                onClose={() => setIsCategoryModalVisible(false)}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                handleAddNewCategory={() =>
                    handleAddCategory(newCategory, setIsCategoryModalVisible, setNewCategory)
                }
            />

            <AddSubcategoryModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                selectedCategory={selectedCategory}
                newSubCategory={newSubCategory}
                setNewSubCategory={setNewSubCategory}
                newSubCategoryAmount={newSubCategoryAmount}
                setNewSubCategoryAmount={setNewSubCategoryAmount}
                handleAddNewSubCategory={() =>
                    handleAddSubCategory(
                        selectedCategory,
                        newSubCategory,
                        newSubCategoryAmount,
                        setIsModalVisible,
                        setNewSubCategory,
                        setNewSubCategoryAmount
                    )
                }
            />

            <EditSubcategoryModal
                visible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
                selectedSubcategory={selectedSubcategory}
                updatedSubCategoryName={updatedSubCategoryName}
                setUpdatedSubCategoryName={setUpdatedSubCategoryName}
                updatedSubCategoryAmount={updatedSubCategoryAmount}
                setUpdatedSubCategoryAmount={setUpdatedSubCategoryAmount}
                handleUpdateSubCategory={() =>
                    handleUpdateSubCategory(
                        selectedCategory,
                        selectedSubcategory,
                        updatedSubCategoryName,
                        updatedSubCategoryAmount,
                        setIsEditModalVisible,
                        setUpdatedSubCategoryName,
                        setUpdatedSubCategoryAmount
                    )
                }
            />
        </SafeAreaView>
    );
};

export default BudgetPage;