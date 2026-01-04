const nickSpan = document.getElementById("nick");
const pointsSpan = document.getElementById("points");
const rankSpan = document.getElementById("rank");
const checkBtn = document.getElementById("checkBtn");

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const uid = user.uid;
  const doc = await db.collection("users").doc(uid).get();
  const data = doc.data();

  nickSpan.textContent = data.nick || "-";
  pointsSpan.textContent = data.points || 0;

  // Кнопка "Проверить" только для модераторов
  if (data.role === "moderator" || data.role === "elder moderator") {
    checkBtn.style.display = "inline-block";
  }

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
});
