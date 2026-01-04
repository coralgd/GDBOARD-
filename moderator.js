// moderator.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const list = document.getElementById("users");
const error = document.getElementById("error");

onAuthStateChanged(auth, async (user) => {
  const me = await getDoc(doc(db, "users", user.uid));
  const myRole = me.data().role;

  if (!["moderator", "elder moderator"].includes(myRole)) {
    error.textContent = "Модерки нет";
    return;
  }

  const snap = await getDocs(collection(db, "users"));
  snap.forEach(d => {
    const u = d.data();
    if (u.role === "player" && u.situation === "verified") {
      const div = document.createElement("div");
      div.textContent = `${u.nick} — ${u.points}`;
      list.appendChild(div);
    }
  });
});
