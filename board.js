const boardTable = document.getElementById("boardTable");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  db.collection("users").doc(uid).get().then(doc => {
    if (!doc.exists || doc.data().situation !== "verified") {
      window.location.href = "account.html";
      return;
    }

    // Показываем всех verified пользователей
    db.collection("users")
      .where("situation", "==", "verified")
      .orderBy("points", "desc")
      .onSnapshot(snapshot => {
        boardTable.innerHTML = "";
        let rank = 1;
        snapshot.forEach(d => {
          const data = doc.data();
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${rank}</td><td>${data.nick}</td><td>${data.points}</td>`;
          boardTable.appendChild(tr);
          rank++;
        });
      });
  });
});
