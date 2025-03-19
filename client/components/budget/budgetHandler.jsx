import budgetCategories, { addCategory, addSubCategory, updateSubCategoryAmount } from './budgetCategories';


export const handleAddCategory = (categoryName, setIsCategoryModalVisible, setNewCategory) => {
    // Check if the category name is not empty and if the category name does not already exist
    if (categoryName || budgetCategories[categoryName]) {
        addCategory(categoryName);
        setIsCategoryModalVisible(false);
        setNewCategory('');
    }
};

export const handleAddSubCategory = (categoryName, subCategoryName, subCategoryAmount, setIsModalVisible, setNewSubCategory, setNewSubCategoryAmount) => {
    // Check if the subcategory name, category name, amount are not empty, and if the subcategory name exists in the category (need to fix this)
    if (subCategoryName && categoryName && subCategoryAmount && budgetCategories[categoryName].findIndex(sub => sub.name === subCategoryName) === -1) {
        addSubCategory(categoryName, subCategoryName, parseFloat(subCategoryAmount));
        setIsModalVisible(false);
        setNewSubCategory('');
        setNewSubCategoryAmount('');
    }
};

export const handleUpdateSubCategory = (categoryName, selectedSubcategory, updatedSubCategoryName, updatedSubCategoryAmount, setIsEditModalVisible, setUpdatedSubCategoryName, setUpdatedSubCategoryAmount) => {
    // Check if the category name, selected subcategory, updated subcategory name, and updated subcategory amount are not empty
    if (categoryName && selectedSubcategory && updatedSubCategoryName && updatedSubCategoryAmount) {
        const subcategories = budgetCategories[categoryName];
        const subcategoryIndex = subcategories.findIndex(sub => sub.name === selectedSubcategory.name);
        if (subcategoryIndex !== -1) {
            subcategories[subcategoryIndex] = {
                name: updatedSubCategoryName,
                amount: parseFloat(updatedSubCategoryAmount),
            };
            setIsEditModalVisible(false);
            setUpdatedSubCategoryName('');
            setUpdatedSubCategoryAmount('');
        }
    }
};

export const toggleCategoryVisibility = (category, setVisible) => {
    setVisible((prevState) => ({
        ...prevState,
        [category]: !prevState[category],
    }));
};

export const getTotalAmount = (category, budgetCategories) => {
    return budgetCategories[category].reduce((total, subCategory) => total + subCategory.amount, 0);
};