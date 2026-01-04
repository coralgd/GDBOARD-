// main.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  const snap = await getDoc(doc(db, "users", user.uid));
  const d = snap.data();

  document.getElementById("nick").textContent = d.nick;
  document.getElementById("points").textContent = d.points;
});

document.getElementById("logout").onclick = async () => {
  await signOut(auth);
  location.href = "index.html";
};
