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

export const handleUpdateSubCategory = async (pondId, categoryId, originalSubcategoryName, updatedName, updatedAmount) => {
    if (!pondId || !categoryId || !originalSubcategoryName || !updatedName || isNaN(updatedAmount)) {
      console.error("Missing or invalid inputs for subcategory update.");
      return;
    }
  
    try {
      const categoryRef = doc(db, "ponds", pondId, "budgetCategories", categoryId);
      const categorySnap = await getDoc(categoryRef);
  
      if (!categorySnap.exists()) {
        console.error(`Category "${categoryId}" not found.`);
        return;
      }
  
      const data = categorySnap.data();
      const items = Array.isArray(data?.items) ? data.items : [];
  
      const index = items.findIndex((sub) => sub.name === originalSubcategoryName);
      if (index === -1) {
        console.error(`Subcategory "${originalSubcategoryName}" not found in category "${categoryId}".`);
        return;
      }
  
      const updatedItems = [...items];
      updatedItems[index] = {
        ...updatedItems[index],
        name: updatedName.trim(),
        amount: updatedAmount,
      };
  
      await updateDoc(categoryRef, { items: updatedItems });
  
      console.log(`Updated subcategory "${originalSubcategoryName}" to "${updatedName}".`);
    } catch (err) {
      console.error("Error updating subcategory:", err);
    }
  };

export const toggleCategoryVisibility = (category, setVisible) => {
    setVisible((prevState) => ({
        ...prevState,
        [category]: !prevState[category],
    }));
};
