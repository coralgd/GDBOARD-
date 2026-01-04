import { auth, db } from "./firebase-config.js";

// Загрузка игроков
auth.onAuthStateChanged(async (user) => {
  if (!user) return;
  const uid = user.uid;
  const currentDoc = await db.collection("users").doc(uid).get();
  const currentUser = currentDoc.data();

  if (!currentUser.role || currentUser.role === "player") {
    document.getElementById("errorMsg").textContent = "Модерки нет";
    return;
  }

  const snapshot = await db.collection("users").get();
  const table = document.getElementById("moderatorTable");
  table.innerHTML = `
    <tr>
      <th>Ник</th>
      <th>Очки</th>
      <th>Действия</th>
    </tr>
  `;

  snapshot.forEach(d => {
    const data = d.data();
    if (!data.role || (data.role !== "moderator" && data.role !== "elder moderator")) {
      const tr = document.createElement("tr");
      const nick = data.nick || "(Без ника)";
      const points = data.points || 0;

      tr.innerHTML = `
        <td>${nick}${data.role==='moderator'?' 🔹':''}${data.role==='elder moderator'?' ⭐':''}</td>
        <td id="points-${d.id}">${points}</td>
        <td>
          <input type="number" id="input-${d.id}" placeholder="Очки">
          <button onclick="updatePoints('${d.id}')">Изменить</button>
          ${currentUser.role==='elder moderator' ? `
          <button onclick="blockUser('${d.id}')">Заблокировать</button>
          <button onclick="makeModerator('${d.id}')">Сделать модератором</button>
          ` : ''}
        </td>
      `;
      table.appendChild(tr);
    }
  });
});

// Изменение очков
window.updatePoints = async function(targetUid){
  const val = parseInt(document.getElementById(`input-${targetUid}`).value);
  if(isNaN(val)) return;
  await db.collection("users").doc(targetUid).update({points: val});
  document.getElementById(`points-${targetUid}`).textContent = val;
  document.getElementById(`input-${targetUid}`).value = '';
}

// Заблокировать пользователя
window.blockUser = async function(targetUid){
  await db.collection("users").doc(targetUid).update({situation: 'blocked'});
  document.getElementById(`points-${targetUid}`).textContent += " (заблокирован)";
}

// Сделать модератором
window.makeModerator = async function(targetUid){
  await db.collection("users").doc(targetUid).update({role: 'moderator'});
}
