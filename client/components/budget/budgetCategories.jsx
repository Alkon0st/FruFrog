// This file contains the budgetCategories object which is used to store the categories and subcategories of the budget. It also contains functions to add, update, and delete categories and subcategories.

// budgetCategories object contains the categories and subcategories of the budget
// this is a sample object, you can add more categories and subcategories as needed; server will send the budgetCategories object to the client
import { doc, setDoc, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

// Add a new category with empty items
export const addCategory = async (pondId, categoryName) => {
    const categoryRef = doc(db, "ponds", pondId, "budgets", categoryName);
    await setDoc(categoryRef, { items: [] });
};

// Add a new subcategory (or create category if it doesn't exist)
export const addSubCategory = async (pondId, categoryName, subCategoryName, amount) => {
    const categoryRef = doc(db, "ponds", pondId, "budgets", categoryName);
    const categorySnap = await getDoc(categoryRef);

    let updatedItems = [];

    if (categorySnap.exists()) {
        updatedItems = categorySnap.data().items;
    }

    updatedItems.push({ name: subCategoryName, amount });

    await setDoc(categoryRef, { items: updatedItems });
};

// Update amount of a specific subcategory
export const updateSubCategoryAmount = async (pondId, categoryName, subCategoryName, newAmount) => {
    const categoryRef = doc(db, "ponds", pondId, "budgets", categoryName);
    const categorySnap = await getDoc(categoryRef);

    if (!categorySnap.exists()) return;

    const updatedItems = categorySnap.data().items.map(sub =>
        sub.name === subCategoryName ? { ...sub, amount: newAmount } : sub
    );

    await updateDoc(categoryRef, { items: updatedItems });
};

// Delete a category
export const deleteCategory = async (pondId, categoryName) => {
    const categoryRef = doc(db, "ponds", pondId, "budgets", categoryName);
    await deleteDoc(categoryRef);
};

// Delete a subcategory
export const deleteSubCategory = async (pondId, categoryName, subCategoryName) => {
    const categoryRef = doc(db, "ponds", pondId, "budgets", categoryName);
    const categorySnap = await getDoc(categoryRef);

    if (!categorySnap.exists()) return;

    const filteredItems = categorySnap.data().items.filter(sub => sub.name !== subCategoryName);
    await updateDoc(categoryRef, { items: filteredItems });
};