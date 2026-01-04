const errorMsg = document.getElementById("errorMsg");
const moderatorTable = document.getElementById("moderatorTable");

auth.onAuthStateChanged(async user => {
  if (!user) return;

  const uid = user.uid;
  const doc = await db.collection("users").doc(uid).get();
  const data = doc.data();

  // Проверяем роль
  if (!data.role || data.role === "player") {
    errorMsg.textContent = "Ошибка: игрок не найден";
    return;
  }

  // moderator → загружаем всех обычных игроков
  try {
    const snapshot = await db.collection("users")
      .where("role", "==", "player")
      .get();

    moderatorTable.innerHTML = "";

    snapshot.forEach(d => {
      const userData = d.data();
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${userData.nick}</td>
        <td id="points-${d.id}">${userData.points || 0}</td>
        <td>
          <input type="number" id="input-${d.id}" placeholder="Очки">
          <button onclick="updatePoints('${d.id}')">Изменить</button>
        </td>
      `;
      moderatorTable.appendChild(tr);
    });

  } catch (err) {
    console.error(err);
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
