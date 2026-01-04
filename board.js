const boardTable = document.getElementById("boardTable");

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  try {
    const snapshot = await db.collection("users")
      .where("situation", "==", "verified")
      .orderBy("points", "desc")
      .get();

    boardTable.innerHTML = "";
    let rank = 1;
    snapshot.forEach(doc => {
      const data = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${rank}</td><td>${data.nick}</td><td>${data.points}</td>`;
      boardTable.appendChild(tr);
      rank++;
    });

  } catch (err) {
    console.error(err);
  }
});
