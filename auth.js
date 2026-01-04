// auth.js
import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("register").addEventListener("click", async () => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    await setDoc(doc(db, "users", res.user.uid), {
      situation: "not requested",
      role: "player",
      points: 0
    });

    location.href = "account.html";
  } catch (e) {
    alert("Ошибка при регистрации: " + e.message);
  }
});

document.getElementById("login").addEventListener("click", async () => {
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const snap = await getDoc(doc(db, "users", res.user.uid));
    const data = snap.data();

    location.href = data.situation === "verified"
      ? "main.html"
      : "account.html";

  } catch (e) {
    alert("Ошибка при входе: " + e.message);
  }
});
