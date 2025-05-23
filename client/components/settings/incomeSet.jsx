import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Picker} from 'react-native';
import { db } from '../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const IncomeForm = ({
  visible, 
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [incomeData, setIncomeData] = useState({
    amount: 0,
    currency: 'USD',
    frequency: 'monthly',
    lastUpdated: 'Not set',
  });
  const [prevIncomeData, setPrevIncomeData] = useState({
    amount: 0,
    currency: 'USD',
    frequency: 'monthly',
    lastUpdated: 'Not set',
  })

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$'
  };

  const handleSubmit = async() => {
    setShowSuccessMessage(true);
    const auth = getAuth();
    const user = auth.currentUser;
  
    try {
      //adds the current date to the incomeData for submission
      const updatedIncome = {
        ...incomeData,
        lastUpdated: new Date().toLocaleDateString(),
      }

      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { income: updatedIncome }, { merge: true });

      setPrevIncomeData(updatedIncome)
  
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  useEffect(() => {
    if (!visible) return

    //reset content of form
    setIncomeData({
      amount: 0,
      currency: 'USD',
      frequency: 'monthly',
      lastUpdated: 'Not set',
    })

    const fetchIncomeData = async () => {
      const auth = getAuth()
      const user = auth.currentUser
      if(!user) return

      try {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          const userData = userSnap.data()
          if (userData.income) {
            setPrevIncomeData(userData.income)
          }
        }
      } catch (error) {
        console.error('Error fetching income data:', error)
      }
    }
    
    fetchIncomeData()
  }, [visible])

  
  if (!visible) return null;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.pickerContainer}>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={incomeData.amount ? incomeData.amount.toString() : ''}
                onChangeText={(text) => setIncomeData({...incomeData, amount: parseFloat(text) || 0})}
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Currency</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={incomeData.currency}
                onValueChange={(value) => setIncomeData({...incomeData, currency: value})}
              >
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="GBP" value="GBP" />
                <Picker.Item label="JPY" value="JPY" />
                <Picker.Item label="CAD" value="CAD" />
              </Picker>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={incomeData.frequency}
                onValueChange={(value) => setIncomeData({...incomeData, frequency: value})}
              >
              {/* Need each of the following to display the check icon while selected   */}
                <Picker.Item label="Hourly" value="hourly" color={incomeData.frequency === "hourly" ? "#4CAF50" : "#000"} />
                <Picker.Item label="Daily" value="daily" color={incomeData.frequency === "daily" ? "#4CAF50" : "#000"} />  
                <Picker.Item label="Weekly" value="weekly" color={incomeData.frequency === "weekly" ? "#4CAF50" : "#000"}  />
                <Picker.Item label="Biweekly" value="biweekly" color={incomeData.frequency === "biweekly" ? "#4CAF50" : "#000"} />
                <Picker.Item label="Monthly" value="monthly" color={incomeData.frequency === "monthly" ? "#4CAF50" : "#000"}/>
                <Picker.Item label="Annually" value="annually" color={incomeData.frequency === "annually" ? "#4CAF50" : "#000"} />
              

              </Picker>
            </View>
          </View>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Update Income</Text>
          </TouchableOpacity>
          
          {showSuccessMessage && (
            <View style={styles.successMessage}>
              <Text style={styles.successMessageText}>Income updated successfully!</Text>
            </View>
          )}
          
          <View style={styles.incomeDisplay}>
            <Text style={styles.subtitle}>Income details</Text>
            <View style={styles.incomeItem}>
              <Text style={styles.incomeLabel}>Amount:</Text>
              <Text style={styles.incomeValue}>
                {currencySymbols[incomeData.currency]}{prevIncomeData.amount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.incomeItem}>
              <Text style={styles.incomeLabel}>Currency:</Text>
              <Text style={styles.incomeValue}>{prevIncomeData.currency}</Text>
            </View>
            <View style={styles.incomeItem}>
              <Text style={styles.incomeLabel}>Frequency:</Text>
              <Text style={styles.incomeValue}>{prevIncomeData.frequency}</Text>
            </View>
            <View style={styles.incomeItem}>
              <Text style={styles.incomeLabel}>Last Updated:</Text>
              <Text style={styles.incomeValue}>{prevIncomeData.lastUpdated}</Text>
            </View>
          </View>
          
          
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: '#85BB65',
    padding: 20,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 10,
    borderColor: '#B2E196',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    backgroundColor: '#DFF2BF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  successMessageText: {
    color: '#4F8A10',
    textAlign: 'center',
  },
  incomeDisplay: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  incomeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  incomeLabel: {
    fontSize: 16,
    color: '#555',
  },
  incomeValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  budgetDisplay: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default IncomeForm;