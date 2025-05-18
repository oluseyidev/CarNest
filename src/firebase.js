// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your current config (unchanged)
const firebaseConfig = {
  apiKey: "AIzaSyBj8Xhu4Wfh-ly9IOmWOaiJ7H35HyuhO7k",
  authDomain: "carapp-d9481.firebaseapp.com",
  projectId: "carapp-d9481",
  storageBucket: "carapp-d9481.firebasestorage.app",
  messagingSenderId: "426282696634",
  appId: "1:426282696634:web:4fa015070769155620e783",
  measurementId: "G-QDTKBDG1HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth helper functions (safe additions)
export const signUpUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export default app;



