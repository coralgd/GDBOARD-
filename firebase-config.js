// firebase-config.js
// Подключаем Firebase SDK
const firebaseConfig = {
  apiKey: "AIzaSyBs8vPfGYlPd-5C69h3SBCs-93gR_iolvs",
  authDomain: "gdboard-coral.firebaseapp.com",
  projectId: "gdboard-coral",
  storageBucket: "gdboard-coral.firebasestorage.app",
  messagingSenderId: "730451840482",
  appId: "1:730451840482:web:64de71b9b3963e421ebdbb"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

// Сохраняем ссылки на сервисы
const auth = firebase.auth();
const db = firebase.firestore();
