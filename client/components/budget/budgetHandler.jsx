import budgetCategories, { addCategory, addSubCategory, updateSubCategoryAmount } from './budgetCategories';
import { db } from "../../firebase/firebase"; // Adjust the path to your Firebase config
import { collection, doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";

export const handleAddCategory = async (categoryName, setIsCategoryModalVisible, setNewCategory) => {
    if (categoryName) {
        try {
            const categoryRef = doc(db, "budgets", categoryName);
            const categorySnapshot = await getDoc(categoryRef);

            if (!categorySnapshot.exists()) {
                await setDoc(categoryRef, { subcategories: [] }); // Initialize with an empty subcategories array
                console.log(`Category "${categoryName}" added to Firestore.`);
            } else {
                console.log(`Category "${categoryName}" already exists.`);
            }

            setIsCategoryModalVisible(false);
            setNewCategory('');
        } catch (error) {
            console.error("Error adding category:", error);
        }
    }
};
export const handleAddSubCategory = async (categoryName, subCategoryName, subCategoryAmount, setIsModalVisible, setNewSubCategory, setNewSubCategoryAmount) => {
    if (subCategoryName && categoryName && subCategoryAmount) {
        try {
            const categoryRef = doc(db, "budgets", categoryName);
            const categorySnapshot = await getDoc(categoryRef);

            if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.data();
                const subcategories = categoryData.subcategories || [];

                // Check if the subcategory already exists
                if (!subcategories.find(sub => sub.name === subCategoryName)) {
                    const updatedSubcategories = [
                        ...subcategories,
                        { name: subCategoryName, amount: parseFloat(subCategoryAmount) }
                    ];

                    await updateDoc(categoryRef, { subcategories: updatedSubcategories });
                    console.log(`Subcategory "${subCategoryName}" added to category "${categoryName}".`);
                } else {
                    console.log(`Subcategory "${subCategoryName}" already exists in category "${categoryName}".`);
                }
            } else {
                console.error(`Category "${categoryName}" does not exist.`);
            }

            setIsModalVisible(false);
            setNewSubCategory('');
            setNewSubCategoryAmount('');
        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    }
};

export const handleUpdateSubCategory = async (categoryName, selectedSubcategory, updatedSubCategoryName, updatedSubCategoryAmount, setIsEditModalVisible, setUpdatedSubCategoryName, setUpdatedSubCategoryAmount) => {
    if (categoryName && selectedSubcategory && updatedSubCategoryName && updatedSubCategoryAmount) {
        try {
            const categoryRef = doc(db, "budgets", categoryName);
            const categorySnapshot = await getDoc(categoryRef);

            if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.data();
                const subcategories = categoryData.subcategories || [];

                const subcategoryIndex = subcategories.findIndex(sub => sub.name === selectedSubcategory.name);
                if (subcategoryIndex !== -1) {
                    subcategories[subcategoryIndex] = {
                        name: updatedSubCategoryName,
                        amount: parseFloat(updatedSubCategoryAmount),
                    };

                    await updateDoc(categoryRef, { subcategories });
                    console.log(`Subcategory "${selectedSubcategory.name}" updated in category "${categoryName}".`);
                } else {
                    console.error(`Subcategory "${selectedSubcategory.name}" not found in category "${categoryName}".`);
                }
            } else {
                console.error(`Category "${categoryName}" does not exist.`);
            }

            setIsEditModalVisible(false);
            setUpdatedSubCategoryName('');
            setUpdatedSubCategoryAmount('');
        } catch (error) {
            console.error("Error updating subcategory:", error);
        }
    }
};

export const toggleCategoryVisibility = (category, setVisible) => {
    setVisible((prevState) => ({
        ...prevState,
        [category]: !prevState[category],
    }));
};

export const getTotalAmount = async (categoryName) => {
    try {
        const categoryRef = doc(db, "budgets", categoryName);
        const categorySnapshot = await getDoc(categoryRef);

        if (categorySnapshot.exists()) {
            const categoryData = categorySnapshot.data();
            const subcategories = categoryData.subcategories || [];
            return subcategories.reduce((total, subCategory) => total + subCategory.amount, 0);
        } else {
            console.error(`Category "${categoryName}" does not exist.`);
            return 0;
        }
    } catch (error) {
        console.error("Error calculating total amount:", error);
        return 0;
    }
};