const errorMsg = document.getElementById("errorMsg");
const moderatorTable = document.getElementById("moderatorTable");

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const uid = user.uid;

  try {
    // Получаем данные текущего пользователя
    const doc = await db.collection("users").doc(uid).get();
    const currentUser = doc.data();

    // Проверка роли
    if (!currentUser.role || currentUser.role === "player") {
      // Не модератор → показываем сообщение вместо таблицы
      errorMsg.textContent = "Модерки нет";
      moderatorTable.innerHTML = ""; // очищаем таблицу
      return;
    }

    // Если модератор → загружаем игроков
    const snapshot = await db.collection("users").get();
    moderatorTable.innerHTML = "";

    snapshot.forEach(d => {
      const data = d.data();

      // Показываем только обычных игроков
      if (!data.role || (data.role !== "moderator" && data.role !== "elder moderator")) {
        const tr = document.createElement("tr");
        const nick = data.nick || "(Без ника)";
        const points = data.points || 0;

        tr.innerHTML = `
          <td>${nick}</td>
          <td id="points-${d.id}">${points}</td>
          <td>
            <input type="number" id="input-${d.id}" placeholder="Очки">
            <button onclick="updatePoints('${d.id}')">Изменить</button>
          </td>
        `;

        moderatorTable.appendChild(tr);
      }
    });

  } catch (err) {
    console.error("Ошибка загрузки пользователей:", err);
    errorMsg.textContent = "Не удалось загрузить пользователей";
  }
});

// Функция изменения очков
async function updatePoints(targetUid) {
  const input = document.getElementById(`input-${targetUid}`);
  const value = parseInt(input.value);

  if (isNaN(value)) return;

  const userRef = db.collection("users").doc(targetUid);

  try {
    await userRef.update({ points: value });
    document.getElementById(`points-${targetUid}`).textContent = value;
    input.value = "";
  } catch (err) {
    console.error(err);
  }
}
