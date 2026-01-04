import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

onAuthStateChanged(auth, async (user) => {
  // ❌ Не залогинен
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    // ❌ Документа нет
    if (!snap.exists()) {
      await signOut(auth);
      window.location.href = "login.html";
      return;
    }

    const data = snap.data();

    // ❌ Аккаунт заблокирован
    if (data.situation === "blocked") {
      await signOut(auth);
      alert("Ваш аккаунт заблокирован");
      window.location.href = "login.html";
      return;
    }

    // ❌ Ник не подтверждён
    if (data.situation !== "verified") {
      window.location.href = "nickname.html";
      return;
    }

    // ✅ Всё ок — доступ разрешён
    // ничего не делаем, страница загружается

  } catch (err) {
    console.error("Guard error:", err);
    await signOut(auth);
    window.location.href = "login.html";
  }
});
