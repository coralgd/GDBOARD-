// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs8vPfGYlPd-5C69h3SBCs-93gR_iolvs",
  authDomain: "gdboard-coral.firebaseapp.com",
  projectId: "gdboard-coral",
  storageBucket: "gdboard-coral.firebasestorage.app",
  messagingSenderId: "730451840482",
  appId: "1:730451840482:web:64de71b9b3963e421ebdbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
