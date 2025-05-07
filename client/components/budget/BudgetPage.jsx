import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { collection, query, where, onSnapshot, getDoc, doc, getDocs } from 'firebase/firestore';
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
import EditSubcategoryModal from './modals/editSubcategoryModal';
import HeaderNav from '../nav/HeaderNav';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import ProfilePicture from '../profile/img/profilePicture';


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
    
    //income detail
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [incomeModalVisible, setIncomeModalVisible] = useState(false);
    const [pondUsers, setPondUsers] = useState([]);

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
    const getMembersWithDetails = async (uids) => {
        const profilesSnapshot = await getDocs(collection(db, 'profiles'));
        const usersQuery = query(collection(db, 'users'), where('user_uid', 'in', uids));
        const usersSnap = await getDocs(usersQuery);
    
        return uids.map(uid => {
            const userDoc = usersSnap.docs.find(doc => doc.data().user_uid === uid);
            const userData = userDoc?.data() || {};
            const profileDoc = profilesSnapshot.docs.find(doc => {
                const profileData = doc.data();
                return profileData.members?.includes(uid);
            });
    
            return {
                uid,
                username: userData.username || "Unknown",
                income: userData.income?.amount || 0,
                profileId: profileDoc?.data()?.profile_id || null,
            };
        });
    };
    
    

    useEffect(() => {
        const user = getAuth().currentUser;
        if (!user) return;
    
        const userDocRef = doc(db, "users", user.uid);
    
        const unsubscribeUser = onSnapshot(userDocRef, async (userSnapshot) => {
            const userData = userSnapshot.data();
            const currentPondId = userData?.currentPondId;
    
            if (!currentPondId) {
                console.warn("No currentPondId found for user.");
                setPondId(null);
                setBudgetCategories({});
                return;
            }
    
            setPondId(currentPondId);
    
            const pondRef = doc(db, "ponds", currentPondId);
            const pondSnap = await getDoc(pondRef);
            const pondData = pondSnap.data();
    
           
            const uniqueUserUids = Array.from(new Set([pondData.owner, ...(pondData.members || [])]));

            const detailedUsers = await getMembersWithDetails(uniqueUserUids);
            setPondUsers(detailedUsers);
    
            const totalIncome = detailedUsers.reduce((sum, u) => sum + u.income, 0);
            setIncomeAmount(totalIncome);
    
            const categoriesRef = collection(db, "ponds", currentPondId, "budgetCategories");
            const unsubscribeCategories = onSnapshot(categoriesRef, (snapshot) => {
                const data = {};
                snapshot.forEach(doc => {
                    data[doc.id] = doc.data().items;
                });
                setBudgetCategories(data);
            });
            
    
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
    
    const totalAmount = Object.values(budgetCategories).reduce((sum, category) => {
        return sum + category.reduce((subSum, sub) => subSum + sub.amount, 0);
    }, 0);

    const progress = totalAmount / incomeAmount;

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#F1FEFE', '#B2F0EF']} style={styles.page}>
                <ScrollView>
                    <HeaderNav />
                    <TouchableOpacity onPress={() => setIncomeModalVisible(true)}>
                        <View style={styles.spendingContainer}>
                            <Text style={styles.h2}>Spending Power</Text>
                            <View style={styles.progressBarContainer}>
                                <LinearGradient
                                    colors={['#00BFFF', '#1E90FF']}
                                    style={{
                                        height: 20,
                                        width: '100%',
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                        marginVertical: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            height: '100%',
                                            width: `${Math.min(progress * 100, 100)}%`,
                                            backgroundColor: '#FF6347',
                                        }}
                                    />
                                </LinearGradient>
                                <Text style={styles.h3}>
                                    ${totalAmount} / ${incomeAmount}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>


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
            <Modal
                visible={incomeModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 20,
                        maxHeight: '80%',
                    }}>
                        <TouchableOpacity
                            style={{alignSelf: 'flex-end', padding: 10}}
                            onPress={() => setIncomeModalVisible(false)}
                        >
                            <Text style={{ color: 'red' }}>X</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, paddingLeft: 110 }}>Contributors</Text>
                        <ScrollView>
                            {pondUsers.map(({ uid, username, profileId, income }, index) => (
                                <View key={`${uid}-${index}`} style={{ flex: 1, flexDirection: 'row', alignContent: 'center'}}>
                                    <ProfilePicture selection={profileId}/>
                                    <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between'}}>
                                        <Text style={{ paddingLeft: 5, fontSize:20 }}>{username}</Text>
                                        <Text style={{ paddingLeft: 5, fontSize:20  }}> ${income}</Text>
                                    </View>
                                    
                                </View>
                            ))}

                            
                        </ScrollView>
                        
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default BudgetPage;
