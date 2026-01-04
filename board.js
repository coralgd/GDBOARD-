const boardTable = document.getElementById("boardTable");

auth.onAuthStateChanged(user => {
  if (!user) return;

  // Отображаем только verified пользователей
  db.collection("users")
    .where("situation", "==", "verified")
    .orderBy("points", "desc")
    .onSnapshot(snapshot => {
      boardTable.innerHTML = "";
      let rank = 1;
      snapshot.forEach(doc => {
        const data = doc.data();
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${rank}</td><td>${data.nick}</td><td>${data.points}</td>`;
        boardTable.appendChild(tr);
        rank++;
      });
    });
});
