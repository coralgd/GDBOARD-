const nickSpan = document.getElementById("nick");
const pointsSpan = document.getElementById("points");
const rankSpan = document.getElementById("rank");
const moderatorBtn = document.getElementById("moderatorBtn");
const moderatorError = document.getElementById("moderatorError");

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const uid = user.uid;
  let data;

  try {
    const doc = await db.collection("users").doc(uid).get();
    data = doc.data();

    nickSpan.textContent = data.nick || "-";
    pointsSpan.textContent = data.points || 0;

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
  }

  // Обработчик кнопки — только после загрузки данных
  moderatorBtn.addEventListener("click", () => {
    if (!data) return; // если что-то не загрузилось
    if (data.role === "moderator" || data.role === "elder moderator") {
      window.location.href = "moderator.html";
    } else {
      moderatorError.textContent = "Модерки нет";
    }
  });
});
