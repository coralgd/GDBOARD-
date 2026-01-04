// account.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("nick");
const msg = document.getElementById("msg");

onAuthStateChanged(auth, (user) => {
  if (!user) location.href = "index.html";
});

document.getElementById("send").onclick = async () => {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    nick: input.value.trim(),
    situation: "requested"
  });

  msg.textContent = "Ник отправлен";
};
