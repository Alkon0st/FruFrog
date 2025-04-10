//list of ponds
let pondList = {
    "Current Pond": [
        { name: "Thumbnail", list: ["1"] },
        { name: "Members", list: ["You", "Sofiki123"] },
    ],
};

// Add a new pond object
export const addPond = (pondName) => {
    if (!pondList[pondName]) {
        pondList[pondName] = [];
    }
}

// delete pond object
export const deletePond = (pondName) => {
    if (pondList[pondName]) {
        delete pondList[pondName];
    }
}

export const renamePond = ( oldPondName, newPondName ) => {
    if (pondList[oldPondName]) {
        pondList[newPondName] = pondList[oldPondName];
        delete pondList[oldPondName];
    }
}

export default pondList;