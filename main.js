const nickSpan = document.getElementById("nick");
const pointsSpan = document.getElementById("points");
const rankSpan = document.getElementById("rank");

auth.onAuthStateChanged(user => {
  if (!user) return;

  const uid = user.uid;
  const userDocRef = db.collection("users").doc(uid);

  userDocRef.get().then(doc => {
    const data = doc.data();
    nickSpan.textContent = data.nick || "-";
    pointsSpan.textContent = data.points || 0;

    // Вычисляем место пользователя среди всех verified
    db.collection("users")
      .where("situation", "==", "verified")
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
