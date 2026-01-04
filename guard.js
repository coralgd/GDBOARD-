// guard.js
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    window.location.href = "index.html";
    return;
  }

  const data = snap.data();

  if (data.situation === "blocked") {
    document.body.innerHTML = "<h2>Аккаунт заблокирован</h2>";
    return;
  }

  if (data.situation !== "verified") {
    window.location.href = "nickname.html";
    return;
  }
});
