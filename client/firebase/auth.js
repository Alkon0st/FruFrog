import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where, arrayUnion } from "firebase/firestore";
import {auth, db } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (username, email, password) => {
  try {
    // 1. Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // extract user from userCredential
    const user = userCredential.user

    // 2. Create user document in Firestore
    const userRef = doc(db, "users", user.uid); // Use the user's UID as the document ID
    const userData = {
      user_uid: user.uid,
      username: username,
      email: email,
      createdAt: new Date(),
    };
    await setDoc(userRef, userData);

    //sets user for profile
    // get firestone ref and query to set default profile = 1
    const profilesRef = collection(db, 'profiles')
    const q = query(profilesRef, where('profile_id', '==', 1))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('Unable to find profile document for profile_id=1')
      return
    }

    // updates profile (1) w/ user
    const profileDoc = querySnapshot.docs[0]
    const profileRef = profileDoc.ref

    await updateDoc(profileRef, {
      members: arrayUnion(user.uid)
    });

    return user; // Return the user object for further processing
  } catch (error) {
    // Handle errors (e.g., display error message to the user)
    console.error("Error creating user:", error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};


export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
      // Sign in user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Fetch the user's document from Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }
  
      const userData = userDoc.data();
  
      return {
        uid: user.uid,
        email: user.email,
        ...userData, // includes username, createdAt, etc.
      };
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };
  

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // result.user
    return result;
}

export const doSignOut = () => {
    return auth.signOut();
}