import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { collection, query, where, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebase';
import styles from "./budgetPage.style";
import {
    toggleCategoryVisibility,
    handleAddCategory,
    handleAddSubCategory,
    handleUpdateSubCategory,
} from './budgetHandler';
import CategoryModal from './modals/CategoryModal';
import SubcategoryModal from './modals/SubcategoryModal';
import EditSubcategoryModal from './modals/EditSubcategoryModal';
import HeaderNav from '../nav/HeaderNav';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const BudgetPage = () => {
    const [visible, setVisible] = useState({});
    const [budgetCategories, setBudgetCategories] = useState({});
    const [pondId, setPondId] = useState(null);

    // Modal state
    const [modalState, setModalState] = useState({
        showCategoryModal: false,
        showSubcategoryModal: false,
        showEditModal: false,
    });

    // Category/Subcategory details
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [form, setForm] = useState({
        newCategory: '',
        subName: '',
        subAmount: '',
        updatedName: '',
        updatedAmount: '',
    });

    const toggleModal = (key, value) => {
        setModalState((prev) => ({ ...prev, [key]: value }));
    };
    const getCategoryTotalsForPie = () => {
        return Object.entries(budgetCategories).map(([category, subcategories]) => {
            const total = subcategories.reduce((sum, sub) => sum + sub.amount, 0);
            return {
                name: category,
                total: total,
                color: getColorForCategory(category),
                legendFontColor: "#7F7F7F",
                legendFontSize: 14,
                
            };
        });
    };
    
    const getColorForCategory = (category) => {
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
        const index = Object.keys(budgetCategories).indexOf(category) % colors.length;
        return colors[index];
    };
    
    const screenWidth = Dimensions.get('window').width;
    

    useEffect(() => {
        const user = getAuth().currentUser;
        if (!user) return;
    
        const userDocRef = doc(db, "users", user.uid);
    
        // Listen to the user's document for changes (e.g., currentPondId updates)
        const unsubscribeUser = onSnapshot(userDocRef, (userSnapshot) => {
            const userData = userSnapshot.data();
            const currentPondId = userData?.currentPondId;
    
            if (!currentPondId) {
                console.warn("No currentPondId found for user.");
                setPondId(null);
                setBudgetCategories({});
                return;
            }
    
            setPondId(currentPondId);
    
            // Reference the selected pond's budgetCategories
            const categoriesRef = collection(db, "ponds", currentPondId, "budgetCategories");
    
            // Set up a real-time listener for categories
            const unsubscribeCategories = onSnapshot(categoriesRef, (snapshot) => {
                const data = {};
                snapshot.forEach(doc => {
                    data[doc.id] = doc.data().items;
                });
                setBudgetCategories(data);
            });
    
            // Clean up the categories listener when pond changes
            return () => unsubscribeCategories();
        });
    
        return () => unsubscribeUser();
    }, []);

    const renderCategory = (category) => (
        <View key={category}>
            <TouchableOpacity
                onPress={() => toggleCategoryVisibility(category, setVisible)}
                style={styles.category}
            >
                <Text style={styles.h3}>{category}</Text>
                <View style={styles.categoryText}>
                    <Text style={styles.h3}>${getTotal(category)}</Text>
                    <Text style={styles.chevron}>
                        {visible[category] ? '▼' : '⯈'}
                    </Text>
                </View>
                
            </TouchableOpacity>

            {visible[category] && (
                <View>
                    {budgetCategories[category].map((subCategory) => (
                        <TouchableOpacity
                            key={subCategory.name}
                            style={styles.subCategoryContainer}
                            onPress={() => {
                                setSelectedCategory(category);
                                setSelectedSubcategory(subCategory);
                                setForm({
                                    ...form,
                                    updatedName: subCategory.name,
                                    updatedAmount: subCategory.amount.toString()
                                });
                                toggleModal("showEditModal", true);
                            }}
                        >   <View style={styles.subCategoryText}>
                                <Text>{subCategory.name}</Text>
                                <Text>${subCategory.amount}</Text>
                            </View>
                            
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                            setSelectedCategory(category);
                            toggleModal("showSubcategoryModal", true);
                        }}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    const getTotal = (category) =>
        budgetCategories[category]?.reduce((total, sub) => total + sub.amount, 0);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#F1FEFE', '#B2F0EF']} style={styles.page}>
                <ScrollView>
                    <HeaderNav />
                    <View style={styles.spendingContainer}>
                        <Text style={styles.h2}>Spending Power</Text>
                    </View>

                    <View style={styles.graphContainer}>
                        <Text style={styles.h2}>Chart</Text>
                            {Object.keys(budgetCategories).length > 0 && (
                                <PieChart 
                                    data={getCategoryTotalsForPie()}
                                    width={screenWidth - 20}
                                    height={220}
                                    accessor="total"
                                    backgroundColor="transparent"
                                    paddingLeft="15"
                                    absolute
                                    chartConfig={{
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    }}
                                />
                            )}
                    </View>
                    
                    <View style={styles.categoryContainer}>
                        <View style={styles.categoryTitle}>
                            <Text style={styles.h2}>Categories</Text>
                            <TouchableOpacity
                                onPress={() => toggleModal("showCategoryModal", true)}
                                style={styles.addButtonCategory}
                            >
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        {Object.keys(budgetCategories).map(renderCategory)}
                    </View>
                    

                    
                </ScrollView>
            </LinearGradient>

            {/* Modals */}
            <CategoryModal
                visible={modalState.showCategoryModal}
                onClose={() => toggleModal("showCategoryModal", false)}
                value={form.newCategory}
                onChange={(text) => setForm({ ...form, newCategory: text })}
                onSubmit={() => {
                    handleAddCategory(pondId, form.newCategory, toggleModal, setForm);
                    toggleModal("showCategoryModal", false);
                    setForm({ ...form, newCategory: '' });
                }}
            />

            <SubcategoryModal
                visible={modalState.showSubcategoryModal}
                onClose={() => toggleModal("showSubcategoryModal", false)}
                category={selectedCategory}
                name={form.subName}
                amount={form.subAmount}
                onChangeName={(text) => setForm({ ...form, subName: text })}
                onChangeAmount={(text) => setForm({ ...form, subAmount: text })}
                onSubmit={() => {
                    handleAddSubCategory(pondId, selectedCategory, form.subName, parseFloat(form.subAmount));
                    toggleModal("showSubcategoryModal", false);
                    setForm({ ...form, subName: '', subAmount: '' });
                }}
            />

            <EditSubcategoryModal
                visible={modalState.showEditModal}
                onClose={() => toggleModal("showEditModal", false)}
                name={form.updatedName}
                amount={form.updatedAmount}
                onChangeName={(text) => setForm({ ...form, updatedName: text })}
                onChangeAmount={(text) => setForm({ ...form, updatedAmount: text })}
                onSubmit={() => {
                    handleUpdateSubCategory(pondId, selectedCategory, selectedSubcategory.name, form.updatedName, parseFloat(form.updatedAmount));
                    toggleModal("showEditModal", false);
                    setForm({ ...form, updatedName: '', updatedAmount: '' });
                }}
            />
        </SafeAreaView>
    );
};

export default BudgetPage;
