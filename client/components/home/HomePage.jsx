import React, {useState, useEffect } from 'react';
import {Modal, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/ant-design';
import { getSelectedPond } from '../billSplit/getSelectedPond';
import { getAuth } from 'firebase/auth';
import Bill from '../billSplit/bill';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import HeaderNav from '../nav/HeaderNav';

function HomePage() {
    const [bills, setBills] = useState([]);

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

    return (
        <SafeAreaProvider>
        <SafeAreaView style ={styles.viewStyle}>
        <LinearGradient
            colors = {['#F1FEFE', '#B2F0EF']}
            style = {styles.page}
        >
            <ScrollView>
                <HeaderNav />
                <Text style ={styles.headingStyle}>Hello, (user)</Text>
                <View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', padding: '20'}}> 
                    <Text style ={styles.textStyle}>Budget Overview</Text>
                    <Text style ={styles.textStyle}>Planned Expenses</Text>
                    <Text style ={styles.textStyle}>$$$$$$$$</Text>
                    <Text style ={styles.textStyle}>$$$$$$Left to budget</Text>
                    </View>
                    <View>
                        <Text style ={styles.textStyle}>Category Cards</Text>
                    </View>
                    <View>
                        <Text style ={styles.textStyle}>PieChart</Text>
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
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
});

export default HomePage