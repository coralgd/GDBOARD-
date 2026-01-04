// account.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("nick");
const msg = document.getElementById("msg");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }
});

document.getElementById("send").addEventListener("click", async () => {
  const user = auth.currentUser;

  if (!user) {
    msg.textContent = "Ошибка: пользователь не найден";
    return;
  }

  const nickValue = input.value.trim();
  if (!nickValue) {
    msg.textContent = "Введите ник";
    return;
  }

  try {
    await updateDoc(doc(db, "users", user.uid), {
      nick: nickValue,
      situation: "requested"
    });

    msg.textContent = "Ник отправлен на проверку";
  } catch (e) {
    console.error(e);
    msg.textContent = "Ошибка при отправке ника: " + e.message;
  }
});
