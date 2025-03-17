import { addCategory, addSubCategory, updateSubCategoryAmount } from './budgetCategories';

export const handleAddCategory = (categoryName, setIsCategoryAdded) => {
    addCategory(categoryName);
    setIsCategoryAdded(false);
};

export const handleAddSubCategory = (categoryName, subCategoryName, setSelectedCategory) => {
    addSubCategory(categoryName, subCategoryName, 0);
    setSelectedCategory(null);
};

export const toggleCategoryVisibility = (category, setVisible) => {
    setVisible((prevState) => ({
        ...prevState,
        [category]: !prevState[category]
    }));
};

export const getTotalAmount = (category, budgetCategories) => {
    return budgetCategories[category].reduce((total, subCategory) => total + subCategory.amount, 0);
};

export const handleUpdateAmount = (category, subCategoryName, amount, setVisible, visible) => {
    updateSubCategoryAmount(category, subCategoryName, amount);
    setVisible({ ...visible });
};