const nickSpan = document.getElementById("nick");
const pointsSpan = document.getElementById("points");
const rankSpan = document.getElementById("rank");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  const userDocRef = db.collection("users").doc(uid);

  userDocRef.get().then(doc => {
    if (!doc.exists) {
      window.location.href = "index.html";
      return;
    }

    const data = doc.data();

    // Проверка situation: доступ только для verified
    if (data.situation !== "verified") {
      window.location.href = "account.html";
      return;
    }

    nickSpan.textContent = data.nick || "-";
    pointsSpan.textContent = data.points || 0;

    // Определяем место в лидерборде
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
