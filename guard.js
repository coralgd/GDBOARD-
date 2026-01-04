// guard.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) {
    location.href = "index.html";
    return;
  }

  const data = snap.data();

  if (data.situation === "blocked") {
    document.body.innerHTML = "<h2>Аккаунт заблокирован</h2>";
    return;
  }

  if (data.situation !== "verified") {
    location.href = "account.html";
  }
});
