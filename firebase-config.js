// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBs8vPfGYlPd-5C69h3SBCs-93gR_iolvs",
  authDomain: "gdboard-coral.firebaseapp.com",
  projectId: "gdboard-coral",
  storageBucket: "gdboard-coral.firebasestorage.app",
  messagingSenderId: "730451840482",
  appId: "1:730451840482:web:64de71b9b3963e421ebdbb"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
