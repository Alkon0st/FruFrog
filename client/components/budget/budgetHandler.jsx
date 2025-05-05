import { db } from "../../firebase/firebase"; // Adjust the path to your Firebase config
import { collection, doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";

export const handleAddCategory = async (pondId, categoryName, setIsCategoryModalVisible, setNewCategory) => {
    if (pondId && categoryName) {
        try {
            const categoryRef = doc(db, "ponds", pondId, "budgetCategories", categoryName);
            const categorySnapshot = await getDoc(categoryRef);

            if (!categorySnapshot.exists()) {
                await setDoc(categoryRef, { items: [] }); // Initialize with an empty items array
                console.log(`Category "${categoryName}" added to Firestore under pond "${pondId}".`);
            } else {
                console.log(`Category "${categoryName}" already exists under pond "${pondId}".`);
            }

            setIsCategoryModalVisible(false);
            setNewCategory('');
        } catch (error) {
            console.error("Error adding category:", error);
        }
    } else {
        console.error("Pond ID or category name is missing.");
    }
};

export const handleAddSubCategory = async (pondId,categoryName,subCategoryName,subCategoryAmount) => {
    if (pondId && categoryName && subCategoryName && subCategoryAmount) {
        try {
            const categoryRef = doc(db, "ponds", pondId, "budgetCategories", categoryName);
            const categorySnapshot = await getDoc(categoryRef);

            if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.data();
                const subcategories = categoryData.items || [];

                // Check if subcategory already exists
                if (!subcategories.find(sub => sub.name === subCategoryName)) {
                    const updatedSubcategories = [
                        ...subcategories,
                        {
                            name: subCategoryName,
                            amount: parseFloat(subCategoryAmount)
                        }
                    ];

                    await updateDoc(categoryRef, { items: updatedSubcategories });
                    console.log(`Subcategory "${subCategoryName}" added to category "${categoryName}".`);
                } else {
                    console.log(`Subcategory "${subCategoryName}" already exists.`);
                }
            } else {
                console.error(`Category "${categoryName}" does not exist.`);
            }
        } catch (error) {
            console.error("Error adding subcategory:", error);
        }
    } else {
        console.error("Missing pond ID, category name, or subcategory details.");
    }
};

export const handleUpdateSubCategory = async (categoryName, selectedSubcategory, updatedSubCategoryName, updatedSubCategoryAmount, setIsEditModalVisible, setUpdatedSubCategoryName, setUpdatedSubCategoryAmount) => {
    if (pondId && categoryName && selectedSubcategory && updatedSubCategoryName && updatedSubCategoryAmount) {
        try {
            const categoryRef = doc(db, "ponds", pondId, "budgetCategories", categoryName);
            const categorySnapshot = await getDoc(categoryRef);

            if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.data();
                const subcategories = categoryData.items || [];

                // Find the index of the subcategory to update
                const subcategoryIndex = subcategories.findIndex(
                    (sub) => sub.name === selectedSubcategory.name
                );

                if (subcategoryIndex !== -1) {
                    // Update the subcategory
                    subcategories[subcategoryIndex] = {
                        name: updatedSubCategoryName,
                        amount: parseFloat(updatedSubCategoryAmount),
                    };

                    // Update Firestore
                    await updateDoc(categoryRef, { items: subcategories });
                    console.log(
                        `Subcategory "${selectedSubcategory.name}" updated in category "${categoryName}".`
                    );
                } else {
                    console.error(
                        `Subcategory "${selectedSubcategory.name}" not found in category "${categoryName}".`
                    );
                }
            } else {
                console.error(`Category "${categoryName}" does not exist.`);
            }

            // Reset modal and form state
            setIsEditModalVisible(false);
            setUpdatedSubCategoryName('');
            setUpdatedSubCategoryAmount('');
        } catch (error) {
            console.error("Error updating subcategory:", error);
        }
    } else {
        console.error("Missing pond ID, category name, or subcategory details.");
    }
};

export const toggleCategoryVisibility = (category, setVisible) => {
    setVisible((prevState) => ({
        ...prevState,
        [category]: !prevState[category],
    }));
};
