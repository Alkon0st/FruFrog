import { addPond } from './ponds';

export const handleAddPond = (pondName, setIsPondAdded, thumbnail) => {
    addPond(pondName, thumbnail);
    setIsPondAdded(false);
};