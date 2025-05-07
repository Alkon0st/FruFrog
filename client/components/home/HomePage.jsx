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
        const user= getAuth().currentUser;
        if (!user) return;
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeUser = onSnapshot(userDocRef, (userSnapshot) =>  {
            const userData = userSnapshot.data();
            const currentPondId = userData?.currentPondId;
            if (!currentPondId) return;
            if (userData?.income?.amount && typeof userData.income.amount === 'number') {
                setIncomeAmount(userData.income.amount);
            }
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
      
    
    const getColorForCategory = (index) => {
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
        return colors[index % colors.length];
    };
    
    const getCategoryTotalsForPie = (categories) => {
        return Object.entries(categories).map(([category, subcategories], index) => {
            const total = subcategories.reduce((sum, sub) => sum + sub.amount, 0);
            return {
                name: category,
                total,
                color: getColorForCategory(index),
                legendFontSize: 0,
            };
        });
    };
    const totalSpent = Object.values(budgetCategories).reduce((sum, category) => {
        return sum + category.reduce((subSum, sub) => subSum + sub.amount, 0);
    }, 0);
    
    const leftoverAmount = incomeAmount - totalSpent;

    return (
        <SafeAreaProvider>
        <SafeAreaView>
        <LinearGradient colors = {['#F1FEFE', '#B2F0EF']}>
            <ScrollView>
                <View style={styles.viewStyle}>
                <HeaderNav />
                <View style={styles.page}>
                    <Text style={styles.headingStyle}>Hello, {username}!</Text>
                <View style={styles.budgetContainer}> 
                    <View>
                    <Text style ={styles.headingStyle}>Budget Overview</Text>
                    <View>
                        
                        <View>
                            <Text style ={styles.textStyle}>Planned Expenses</Text>
                            <Text style ={styles.textStyle}>${totalSpent.toFixed(2)}</Text>
                            <View>
                                <Text style ={styles.textStyle}>${leftoverAmount.toFixed(2)} Left to budget</Text>
                            </View>
                        </View>
                        
                        </View>
                    </View>
                    
                        <View>
                        <Text style ={styles.textStyle}>PieChart</Text>
                        {Object.keys(budgetCategories).length > 0 && (
                        <PieChart
                            data={getCategoryTotalsForPie(budgetCategories)}
                            width={Dimensions.get('window').width - 20}
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
                    </View>
                    
                
                    
                    <View>
                        <Text style ={styles.textStyle}>Category Cards</Text>
                    </View>
                </View>

                {/* Bill Listing */}
                <View style={styles.billList}>
                    {bills.map((bill, index) => (
                    <Bill key={index} {...bill} />
                    ))}
                </View>
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
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flex: 1,
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
        justifyContent:'flex-end',
        backgroundColor: 'white',
    },
    billList: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    budgetContainer:{
        backgroundColor: '#E0FDD9',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        marginTop: 1,
        border:"1px solid #3F5830",

    },
    budgetOverview: {
        backgroundColor: '#EAFFCB',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        marginTop: 1,
        border:"1px solid #85BB65",
    },
});

export default HomePage