const saveNickBtn = document.getElementById("saveNickBtn");
const nickInput = document.getElementById("nickname");
const messageDiv = document.getElementById("message");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

saveNickBtn.addEventListener("click", async () => {
  const nickname = nickInput.value.trim();
  if (!nickname) return messageDiv.textContent = "Введите ник!";

  const query = await db.collection("users").where("nickname", "==", nickname).get();
  if (!query.empty) return messageDiv.textContent = "Ник занят!";

  const uid = auth.currentUser.uid;
  const userDoc = await db.collection("users").doc(uid).get();
  if (userDoc.data().nickname) return messageDiv.textContent = "Ник уже выбран!";

  await db.collection("users").doc(uid).update({
    nickname: nickname,
    status: "requested"
  });
  messageDiv.textContent = "Ник сохранён, ожидайте подтверждения.";
});
