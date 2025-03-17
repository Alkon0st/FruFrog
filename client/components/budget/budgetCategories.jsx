// This file contains the budgetCategories object which is used to store the categories and subcategories of the budget. It also contains functions to add, update, and delete categories and subcategories.

// budgetCategories object contains the categories and subcategories of the budget
// this is a sample object, you can add more categories and subcategories as needed; server will send the budgetCategories object to the client
let budgetCategories = {
    Housing: [
        { name: "Rent Payments", amount: 1000.15 },
        { name: "Mortgage Payments", amount: 500.10 },
        { name: "Property Taxes", amount: 0 },
        { name: "HOA Payments", amount: 0 },
        { name: "Home Maintenance Costs", amount: 0 }
    ],
    Transportation: [
        { name: "Car Payments", amount: 500.00 },
        { name: "Car Warranty", amount: 25.00 },
        { name: "Gas", amount: 0 },
        { name: "Parking Fees", amount: 0 },
        { name: "Maintenance", amount: 0 }
    ],
    Food: [
        { name: "Groceries", amount: 100 },
        { name: "Restaurants", amount: 0 },
        { name: "Pet Food", amount: 0 }
    ],
    Utilities: [
        { name: "Electricity", amount: 0 },
        { name: "Water", amount: 0 },
        { name: "Internet", amount: 0 },
        { name: "Phones", amount: 0 },
        { name: "Garbage", amount: 0 }
    ],
    Entertainment: [
        { name: "Subscriptions", amount: 0 },
        { name: "Concerts", amount: 0 },
        { name: "Movies", amount: 0 },
        { name: "Vacation", amount: 0 }
    ],
    Others: []
};

// Add a new category to the budgetCategories object
export const addCategory = (categoryName) => {
    if (!budgetCategories[categoryName]) {
        budgetCategories[categoryName] = [];
    }
}
// Add a new subcategory to the budgetCategories object
export const addSubCategory = (categoryName, subCategoryName, Amount) => {
    if (budgetCategories[categoryName]) {
        budgetCategories[categoryName].push({name: subCategoryName, amount: Amount});
    } else {
        budgetCategories[categoryName] = [{name: subCategoryName, amount: 0}];
    }
}
// Update the amount of a subcategory
export const updateSubCategoryAmount = (categoryName, subCategoryName, amount) => {
    if (budgetCategories[categoryName]) {
        const subCategory = budgetCategories[categoryName].find(sub => sub.name === subCategoryName);
        if (subCategory) {
            subCategory.amount = amount;
        }
    }
}
export const deleteCategory = (categoryName) => {
    delete budgetCategories[categoryName];
}

export const deleteSubCategory = (categoryName, subCategoryName) => {
    if (budgetCategories[categoryName]) {
        budgetCategories[categoryName] = budgetCategories[categoryName].filter(sub => sub.name !== subCategoryName);
    }
}

export default budgetCategories;