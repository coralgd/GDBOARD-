const statusContainer = document.getElementById("statusContainer");
const inputContainer = document.getElementById("inputContainer");
const nickInput = document.getElementById("nickInput");
const sendNickBtn = document.getElementById("sendNickBtn");

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const uid = user.uid;
  const userRef = db.collection("users").doc(uid);

  try {
    const doc = await userRef.get();
    const data = doc.data();

    // Если ник уже отправлен
    if (data.nick) {
      inputContainer.style.display = "none";

      if (data.situation === "verified") {
        statusContainer.innerHTML = `<p>Ник: <strong>${data.nick}</strong> — Верифицировано ✅</p>`;
      } else {
        statusContainer.innerHTML = `<p>Ник: <strong>${data.nick}</strong> — Отправлено ⏳</p>`;
      }
    }

  } catch (err) {
    console.error(err);
  }
});

// Отправка ника
sendNickBtn.addEventListener("click", async () => {
  const nick = nickInput.value.trim();
  if (!nick) return;

  const user = auth.currentUser;
  if (!user) return;

  const userRef = db.collection("users").doc(user.uid);

  try {
    await userRef.set({ nick: nick, situation: "pending" }, { merge: true });

    // Скрываем форму сразу после отправки
    inputContainer.style.display = "none";

    statusContainer.innerHTML = `<p>Ник: <strong>${nick}</strong> — Отправлено ⏳</p>`;

  } catch (err) {
    console.error("Ошибка при отправке ника:", err);
  }
});
