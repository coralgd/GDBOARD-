const boardTable = document.getElementById("boardTable");

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  try {
    // Получаем всех verified пользователей
    const snapshot = await db.collection("users")
      .where("situation", "==", "verified")
      .orderBy("points", "desc") // ⚠️ Для этого нужен индекс в Firebase
      .get();

    boardTable.innerHTML = ""; // очищаем таблицу
    let rank = 1;

    snapshot.forEach(doc => {
      const data = doc.data();
      const nick = data.nick || "Без ника";
      const points = data.points || 0;

      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${rank}</td><td>${nick}</td><td>${points}</td>`;
      boardTable.appendChild(tr);
      rank++;
    });

  } catch (err) {
    console.error("Ошибка при загрузке лидерборда:", err);
    boardTable.innerHTML = `<tr><td colspan="3">Не удалось загрузить лидерборд</td></tr>`;
  }
});
