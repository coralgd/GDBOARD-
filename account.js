const saveNickBtn = document.getElementById("saveNickBtn");
const nickInput = document.getElementById("nickname");
const messageDiv = document.getElementById("message");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  const userDocRef = db.collection("users").doc(uid);

  userDocRef.get().then(doc => {
    if (doc.exists) nickInput.value = doc.data().nick || "";
  });

  saveNickBtn.addEventListener("click", async () => {
    const nickname = nickInput.value.trim();
    if (!nickname) {
      messageDiv.textContent = "Введите никнейм!";
      return;
    }

    try {
      const querySnapshot = await db.collection("users").where("nick", "==", nickname).get();
      if (!querySnapshot.empty) {
        messageDiv.textContent = "Никнейм занят!";
        return;
      }

      await userDocRef.update({ nick: nickname, situation: "requested" });
      messageDiv.textContent = "Ник сохранён! Переходим на главную...";
      nickInput.disabled = true;
      saveNickBtn.disabled = true;

      setTimeout(() => { window.location.href = "main.html"; }, 1000);
    } catch (error) {
      console.error(error);
      messageDiv.textContent = "Произошла ошибка. Попробуйте ещё раз.";
    }
  });
});
