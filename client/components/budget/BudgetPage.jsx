import { useState } from 'react';
import { View, 
    Text, 
    Button,
    SafeAreaView, 
    TouchableOpacity
} from "react-native";
import budgetCategories, {addCategory, addSubCategory} from './budgetCategories';
import styles from "./budgetPage.style";


const BudgetPage = () => {
    // state to track if a category has been added
    const [visibleCategories, setVisibleCategories] = useState({});
    const [isCategoryAdded, setIsCategoryAdded] = useState(false);


    // add a new category and subcategories
    // this is just a test function to add a category
    const handleAddCategory = () => {
        addCategory("Health");
        addSubCategory("Health", "Insurance", 0);
        addSubCategory("Health", "Medical Bills", 0);
        setIsCategoryAdded(true)
    };

    // toggle the visibility of the subcategories
    const toggleCategoryVisibility = (category) => {
        setVisibleCategories((prevState) => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    return (
        <SafeAreaView>
            <Text>Categories</Text>
            {Object.keys(budgetCategories).map((category) => (
                <View key={category}>
                    {/* make the category clickable to toggle subcategories */}
                    <TouchableOpacity onPress={() => toggleCategoryVisibility(category)}>
                        <Text style={styles.category}>{category}</Text>
                    </TouchableOpacity>

                    {visibleCategories[category] && budgetCategories[category].map((subCategory) => (
                        
                        <Text key={subCategory.name} style={styles.subCategory}>
                            {subCategory.name}: ${subCategory.amount}
                        </Text>
                    ))}
                </View>
            ))}
            <Button title="Add Health Category" onPress={handleAddCategory} />
            {isCategoryAdded && console.log(`Health Category is added`)}
        </SafeAreaView> 
    );
};


export default BudgetPage;