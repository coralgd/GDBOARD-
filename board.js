const boardTable = document.getElementById("boardTable");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    db.collection("users")
      .where("status", "==", "approved")
      .orderBy("points", "desc")
      .onSnapshot(snapshot => {
        boardTable.innerHTML = "";
        let rank = 1;
        snapshot.forEach(doc => {
          const data = doc.data();
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${rank}</td><td>${data.nickname}</td><td>${data.points}</td>`;
          boardTable.appendChild(tr);
          rank++;
        });
      });
  }
});
