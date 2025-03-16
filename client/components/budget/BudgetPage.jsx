import { useState } from 'react';
import { View, 
    Text, 
    Button,
    SafeAreaView, 
    TextInput,
    TouchableOpacity
} from "react-native";
import budgetCategories, {addCategory, addSubCategory, updateSubCategoryAmount} from './budgetCategories';
import styles from "./budgetPage.style";


const BudgetPage = () => {
    // state to track if a category has been added
    const [visibleCategories, setVisibleCategories] = useState({});
    const [isCategoryAdded, setIsCategoryAdded] = useState(false);


    // add a new category and subcategories
    // this is just a test function to add a category
    const handleAddCategory = () => {
        addCategory("Health");
        addSubCategory("Health", "Insurance", 10);
        addSubCategory("Health", "Medical Bills", 25);
        setIsCategoryAdded(true)
    };


    // toggle the visibility of the subcategories
    const toggleCategoryVisibility = (category) => {
        setVisibleCategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    // calculate the total amount for a category
    const getTotalAmount = (category) => {
        return budgetCategories[category].reduce((total, subCategory) => total + subCategory.amount, 0);
    };

    // handle updating the amount for a subcategory and update the state
    const handleUpdateAmount = () => (category, subCategoryName, amount) => {
        updateSubCategoryAmount(category, subCategoryName, amount);
        setVisibleCategories({...visibleCategories})
    };



    return (
        <SafeAreaView>
            <Text>Categories</Text>
            {Object.keys(budgetCategories).map((category) => (
                <View key={category}>
                    {/* make the category clickable to toggle subcategories */}
                    <TouchableOpacity onPress={() => toggleCategoryVisibility(category)}>
                        <Text style={styles.category}>
                            {category}: ${getTotalAmount(category)}
                        </Text>
                    </TouchableOpacity>

                    {/* display the subcategories if the category is visible */}
                    {visibleCategories[category] && budgetCategories[category].map((subCategory) => (
                    <View key={subCategory.name} style={styles.subCategoryContainer}>
                        <Text style={styles.subCategory}>
                            {subCategory.name}: ${subCategory.amount}
                        </Text>
                        {/* <TextInput
                            placeholder="Enter Amount"
                            keyboardType="numeric"
                            onChangeText={(text) => handleUpdateAmount(category, subCategory.name, text)}
                        /> */}
                    </View>
                    ))}

                </View>
            ))}
            <Button title="Add Health Category" onPress={handleAddCategory} />
            {/* {isCategoryAdded && console.log(`Health Category is added`)} */}
        </SafeAreaView> 
    );
};


export default BudgetPage;