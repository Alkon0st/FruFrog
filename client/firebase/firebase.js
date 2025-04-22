// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, doc, setDoc, getDocs, updateDoc, deleteDoc, query, where} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP19XJ2v9-lvdFWxbYWJWZJ0RX403Xo-s",
  authDomain: "frufrog-c042c.firebaseapp.com",
  projectId: "frufrog-c042c",
  storageBucket: "frufrog-c042c.firebasestorage.app",
  messagingSenderId: "207150953896",
  appId: "1:207150953896:web:ca280780525ddcb6cf199d",
  measurementId: "G-KXHB2MWZJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const analytics = getAnalytics(app);

export {app, db, auth}