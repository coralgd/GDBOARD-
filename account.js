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

  saveNickBtn.addEventListener("click", async () => {
    const nickname = nickInput.value.trim();
    if (!nickname) {
      messageDiv.textContent = "Введите никнейм!";
      return;
    }

    try {
      // Проверяем уникальность ника
      const querySnapshot = await db.collection("users")
        .where("nick", "==", nickname)
        .get();

      if (!querySnapshot.empty) {
        messageDiv.textContent = "Никнейм занят!";
        return;
      }

      // Обновляем документ с ником
      await userDocRef.update({ nick: nickname });
      messageDiv.textContent = "Ник сохранён! Переходим на главную...";
      saveNickBtn.disabled = true;
      nickInput.disabled = true;

      setTimeout(() => {
        window.location.href = "main.html";
      }, 1000);

    } catch (error) {
      console.error(error);
      messageDiv.textContent = "Произошла ошибка. Попробуйте ещё раз.";
    }
  });
});
