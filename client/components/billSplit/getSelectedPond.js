import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const getSelectedPond = async (userId) => {
  const q = query(
    collection(db, 'ponds'),
    where('members', 'array-contains', userId)
  );

  const snapshot = await getDocs(q);
  const ponds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return ponds.find(p => p.selected?.includes(userId)) || null;
};