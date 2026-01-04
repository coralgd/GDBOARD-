import { db } from "./firebase-config.js";

async function loadLeaderboard() {
  const snapshot = await db.collection("users")
    .where("situation","==","verified")
    .orderBy("points","desc")
    .get();

  const table = document.getElementById("leaderboardTable");
  table.innerHTML = "<tr><th>Ник</th><th>Очки</th></tr>";

  snapshot.forEach(doc => {
    const data = doc.data();
    const nick = data.nick || "(Без ника)";
    const points = data.points || 0;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nick}${data.role==='moderator'?' 🔹':''}${data.role==='elder moderator'?' ⭐':''}</td>
      <td>${points}</td>
    `;
    table.appendChild(tr);
  });
}

loadLeaderboard();
