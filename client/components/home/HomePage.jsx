import React, {useState, useEffect } from 'react';
import {Modal, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ant-design';
import { getSelectedPond } from '../billSplit/getSelectedPond';
import { getAuth } from 'firebase/auth';
import Bill from '../billSplit/bill';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, orderBy, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { PieChart } from 'react-native-chart-kit';

import HeaderNav from '../nav/HeaderNav';

function HomePage() {
    const [bills, setBills] = useState([]);
    const [budgetCategories, setBudgetCategories] = useState({});
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchBills = async () => {
            try {
            const user = getAuth().currentUser;
            if (!user) return;
            const pond = await getSelectedPond(user.uid);
            if (!pond) return;
            const q = query(collection(db, `ponds/${pond.id}/bills`), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q)
            const billsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setBills(billsData)
            } catch (err) {
            console.error('Failed to fetch bills:', err)
            }
        }
        
        fetchBills()
    }, []);


    useEffect(() => {
        const user = getAuth().currentUser;
        if (!user) return;
    
        let unsubscribeUsers = []; // store individual user snapshot unsubscribers
        let unsubscribeCategories = () => {}; // default cleanup
    
        const setupIncomeAndCategories = async () => {
            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userDocRef);
                const userData = userSnap.data();
                const currentPondId = userData?.currentPondId;
                if (!currentPondId) return;
                const pondRef = doc(db, "ponds", currentPondId);
                const pondSnap = await getDoc(pondRef);
                if (!pondSnap.exists()) return;
                const pondData = pondSnap.data();
                const uniqueUserUids = Array.from(new Set([
                    pondData.owner,
                    ...(pondData.members || [])
                ]));
    
                unsubscribeUsers = uniqueUserUids.map(uid => {
                    const uRef = doc(db, "users", uid);
                    return onSnapshot(uRef, (userSnap) => {
                        if (!userSnap.exists()) return;
    
                        const updatedUsers = {};
                        unsubscribeUsers.forEach((_, i) => {
                            const userData = userSnap.data();
                            updatedUsers[uid] = userData?.income?.amount || 0;
                        });
                        Promise.all(
                            uniqueUserUids.map(id => getDoc(doc(db, "users", id)))
                        ).then(docs => {
                            const totalIncome = docs.reduce((sum, d) => {
                                const data = d.data();
                                return sum + (data?.income?.amount || 0);
                            }, 0);
                            setIncomeAmount(totalIncome);
                        });
                    });
                });
                const categoriesRef = collection(db, "ponds", currentPondId, "budgetCategories");
                unsubscribeCategories = onSnapshot(categoriesRef, (snapshot) => {
                    const data = {};
                    snapshot.forEach(doc => {
                        data[doc.id] = doc.data().items;
                    });
                    setBudgetCategories(data);
                });
            } catch (err) {
                console.error("Error setting up income and categories:", err);
            }
        };
    
        setupIncomeAndCategories();
        return () => {
            unsubscribeUsers.forEach(unsub => unsub && unsub());
            unsubscribeCategories();
        };
    }, []);
    

    useEffect(() => {
        const fetchUsername = async () => {
          try {
            const user = getAuth().currentUser;
            if (!user) {console.warn("No user signed in.");
              return;
            }
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              setUsername(userData.username || "User");
            } else {console.warn("User document does not exist.")}
          } catch (err) {console.error("Error fetching user:", err)}
        };
        fetchUsername();
      }, []);
      
    
      const getColorForCategory = (category) => {
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
        const index = Object.keys(budgetCategories).indexOf(category) % colors.length;
        return colors[index];
      };
      
    
    const getCategoryTotalsForPie = (categories) => {
    return Object.entries(categories).map(([category, subcategories]) => {
        const total = subcategories.reduce((sum, sub) => sum + sub.amount, 0);
        return {
            name: category,
            total,
            color: getColorForCategory(category), 
        };
    });
};
    const totalSpent = Object.values(budgetCategories).reduce((sum, category) => {
        return sum + category.reduce((subSum, sub) => subSum + sub.amount, 0);
    }, 0);
    
    const leftoverAmount = incomeAmount - totalSpent;

    return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
        <LinearGradient colors = {['#F1FEFE', '#B2F0EF']} style={{ flex: 1 }}>
            <ScrollView style={styles.viewStyle}>
                <HeaderNav />     
                <Text style={styles.greeting}>Hello, {username}!</Text>
                <View style={styles.budgetContainer}> 
                    <View>
                    <Text style ={styles.budgetOverview}>Budget Overview</Text>
                    <View>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View style={styles.budgetOverviewContainer}>
                                <View>
                                    <Text style={styles.plannedExpenses}>Planned Expenses</Text>
                                </View>
                                <Text style={styles.plannedExpensesText}>${totalSpent.toFixed(2)}</Text>
                                <View style={styles.leftoverAmountContainer}>  
                                    <Text style={styles.leftoverAmount}>${leftoverAmount.toFixed(2)} Left to budget</Text>
                                </View>
                            </View>
                            {Object.keys(budgetCategories).length > 0 && (
                            <PieChart
                                data={getCategoryTotalsForPie(budgetCategories)}
                                width={Dimensions.get('window').width - 30}
                                height={175}
                                accessor="total"
                                backgroundColor="transparent"
                                paddingLeft="15"
                                absolute
                                chartConfig={{
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                }}
                                hasLegend={false}
                                />
                            )}
                        </View>
                        <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {Object.entries(budgetCategories).map(([category, subcategories]) => {
                            const total = subcategories.reduce((sum, sub) => sum + sub.amount, 0);
                            const color = getColorForCategory(category);
                            return (
                                <View
                                key={category}
                                style={{
                                    backgroundColor: color,
                                    borderRadius: 12,
                                    padding: 30,
                                    marginRight: 12,
                                    width: 120,
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 3
                                }}
                                >
                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ffff' }}>{category}</Text>
                                <Text style={{ fontSize: 15, color: '#ffff' }}>${total}</Text>
                                </View>
                            );
                            })}
                        </ScrollView>
                        </View>
                    </View>
                    </View>
                </View>

                {/* Bill Listing */}
                <View style={styles.billList}>
                    {bills.map((bill, index) => (
                    <Bill key={index} {...bill} />
                    ))}
                </View>
            
                
            </ScrollView>

        </LinearGradient>

        </SafeAreaView>
        </SafeAreaProvider>

    );
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    viewStyle: {
        display: 'flex'
    },
    textStyle: {
        fontSize: 20,
        color: '#309c61',
        textAlign: 'center',
    },
    headingStyle: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    page: {  
        flex: 1,
        justifyContent:'flex-start',
    },
    billList: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    greeting: {
        fontSize: 30,
        color: '#22470C',
        fontWeight: 'bold',
        marginTop: 20,
        paddingLeft: 20,
    },
    budgetContainer:{
        flexDirection: 'column',
        backgroundColor: '#E0FDD9',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        marginTop: 1,
        border:"1px solid #3F5830",
    },
    budgetOverview:{
        fontSize: 30,
        color: '#22470C',
    },
    budgetOverviewContainer:{
        flexDirection: 'column',
        color: '#22470C',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },
    plannedExpenses:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#22470C',
    },
    budgetOverviewText:{
        fontSize: 20,
        color: '#22470C',
    },
    plannedExpensesText:{
        fontSize: 30,
        color: '#22470C',
        paddingBottom: 2,
    },
    leftoverAmountContainer:{
        border:"1px solid #3F5830",
        borderRadius: 10,
        padding: 2,
    },

    leftoverAmount:{
        fontSize: 15,
        color: '#22470C',
        
    },

});

export default HomePage