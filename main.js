// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔧 Firebase config */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* 📌 DOM */
const moderatorBtn = document.getElementById("moderatorBtn");
const errorBox = document.getElementById("menuError");
const logoutBtn = document.getElementById("logoutBtn");

/* 🔐 Auth check */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "accounts", user.uid));
  if (!snap.exists()) {
    window.location.href = "login.html";
    return;
  }

  const data = snap.data();

  // блокировка
  if (data.situation === "blocked") {
    await signOut(auth);
    window.location.href = "login.html";
    return;
  }
});

/* 🧑‍⚖️ Меню модератора */
moderatorBtn.addEventListener("click", async () => {
  errorBox.textContent = "";

  const user = auth.currentUser;
  if (!user) return;

  const snap = await getDoc(doc(db, "accounts", user.uid));
  if (!snap.exists()) {
    errorBox.textContent = "Модерки нет";
    return;
  }

  const role = snap.data().role;

  if (role === "moderator" || role === "elder_moderator") {
    window.location.href = "moderator.html";
  } else {
    errorBox.textContent = "Модерки нет";
  }
});

/* 🚪 Выход */
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
