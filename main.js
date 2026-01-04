const nickSpan = document.getElementById("nick");
const pointsSpan = document.getElementById("points");
const rankSpan = document.getElementById("rank");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;

  db.collection("users").doc(uid).get().then(doc => {
    const data = doc.data();
    nickSpan.textContent = data.nick || "-";
    pointsSpan.textContent = data.points || 0;

    db.collection("users")
      .orderBy("points", "desc")
      .get()
      .then(snapshot => {
        let rank = 1;
        snapshot.forEach(d => {
          if (d.id === uid) rankSpan.textContent = rank;
          rank++;
        });
      });
  });
});
