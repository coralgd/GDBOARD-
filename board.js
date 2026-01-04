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
import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

(async () => {
  const snap = await getDocs(collection(db, "users"));
  console.log("Documents:", snap.docs.map(d => d.data()));
})();


