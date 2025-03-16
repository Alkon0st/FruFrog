let budgetCategories = {
    Housing: [
        { name: "Rent Payments", amount: 1000 },
        { name: "Mortgage Payments", amount: 500 },
        { name: "Property Taxes", amount: 0 },
        { name: "HOA Payments", amount: 0 },
        { name: "Home Maintenance Costs", amount: 0 }
    ],
    Transportation: [
        { name: "Car Payments", amount: 0 },
        { name: "Car Warranty", amount: 0 },
        { name: "Gas", amount: 0 },
        { name: "Parking Fees", amount: 0 },
        { name: "Maintenance", amount: 0 }
    ],
    Food: [
        { name: "Groceries", amount: 0 },
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


export const addCategory = (categoryName) => {
    if (!budgetCategories[categoryName]) {
        budgetCategories[categoryName] = [];
    }
}

export const addSubCategory = (categoryName, subCategoryName, Amount) => {
    if (budgetCategories[categoryName]) {
        budgetCategories[categoryName].push({name: subCategoryName, amount: Amount});
    } else {
        budgetCategories[categoryName] = [{name: subCategoryName, amount: 0}];
    }
}

export const updateSubCategoryAmount = (categoryName, subCategoryName, amount) => {
    if (budgetCategories[categoryName]) {
        const subCategory = budgetCategories[categoryName].find(sub => sub.name === subCategoryName);
        if (subCategory) {
            subCategory.amount = amount;
        }
    }
}

export default budgetCategories;