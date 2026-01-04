const table = document.getElementById("moderatorTable");

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  try {
    const snapshot = await db.collection("users")
      .where("role", "==", "player") // только обычные игроки
      .get();

    table.innerHTML = "";

    snapshot.forEach(doc => {
      const data = doc.data();
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${data.nick || "Без ника"}</td>
        <td>${data.points || 0}</td>
        <td>
          <button onclick="changePoints('${doc.id}', 10)">+10</button>
          <button onclick="changePoints('${doc.id}', -10)">-10</button>
        </td>
      `;
      table.appendChild(tr);
    });

  } catch (err) {
    console.error(err);
  }
});

function changePoints(uid, delta) {
  const userRef = db.collection("users").doc(uid);

  userRef.update({
    points: firebase.firestore.FieldValue.increment(delta)
  }).then(() => {
    console.log(`Очки пользователя ${uid} изменены на ${delta}`);
  }).catch(err => console.error(err));
}
