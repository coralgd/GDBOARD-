document.addEventListener("DOMContentLoaded", () => {
  const nickSpan = document.getElementById("nick");
  const pointsSpan = document.getElementById("points");
  const rankSpan = document.getElementById("rank");
  const moderatorBtn = document.getElementById("moderatorBtn");
  const moderatorError = document.getElementById("moderatorError");

  auth.onAuthStateChanged(async (user) => {
    if (!user) return;

    const uid = user.uid;
    let userData;

    try {
      const doc = await db.collection("users").doc(uid).get();
      if (!doc.exists) return;

      userData = doc.data();

      // Заполняем ник и очки
      nickSpan.textContent = userData.nick || "-";
      pointsSpan.textContent = userData.points || 0;

      // Вычисляем место среди verified
      const snapshot = await db.collection("users")
        .where("situation", "==", "verified")
        .orderBy("points", "desc")
        .get();

      let rank = 1;
      snapshot.forEach(d => {
        if (d.id === uid) rankSpan.textContent = rank;
        rank++;
      });

    } catch (err) {
      console.error("Ошибка при загрузке данных пользователя:", err);
      return;
    }

    // Добавляем обработчик кнопки после загрузки данных
    moderatorBtn.addEventListener("click", () => {
      if (!userData) return;

      if (userData.role === "moderator" || userData.role === "elder moderator") {
        window.location.href = "moderator.html";
      } else {
        moderatorError.textContent = "Модерки нет";
      }
    });
  });
});
