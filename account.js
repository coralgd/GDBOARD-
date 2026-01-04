const saveNickBtn = document.getElementById("saveNickBtn");
const nickInput = document.getElementById("nickname");
const messageDiv = document.getElementById("message");

auth.onAuthStateChanged(async user => {
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
      // Проверяем уникальность
      const querySnapshot = await db.collection("users")
        .where("nick", "==", nickname)
        .get();

      if (!querySnapshot.empty) {
        messageDiv.textContent = "Никнейм занят!";
        return;
      }

      const userDoc = await userDocRef.get();
      if (!userDoc.exists) {
        messageDiv.textContent = "Ошибка: пользователь не найден!";
        return;
      }

      const data = userDoc.data();
      if (data.nick && data.nick.length > 0) {
        messageDiv.textContent = "Никнейм уже выбран!";
        return;
      }

      // Сохраняем ник и ставим situation = requested
      await userDocRef.update({
        nick: nickname,
        situation: "requested"
      });

      messageDiv.textContent = "Ник сохранён! Ожидайте подтверждения администратора.";
      nickInput.disabled = true;
      saveNickBtn.disabled = true;

    } catch (error) {
      console.error(error);
      messageDiv.textContent = "Произошла ошибка. Попробуйте ещё раз.";
    }
  });
});
