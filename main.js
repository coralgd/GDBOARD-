const nickSpan = document.getElementById("nick");
const pointsSpan = document.getElementById("points");
const rankSpan = document.getElementById("rank");

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    const uid = user.uid;
    db.collection("users").doc(uid).get().then(doc => {
      const data = doc.data();
      if (!data.nickname || data.status !== "approved") {
        window.location.href = "account.html";
      } else {
        nickSpan.textContent = data.nickname;
        pointsSpan.textContent = data.points;

        db.collection("users")
          .where("status", "==", "approved")
          .orderBy("points", "desc")
          .get().then(snapshot => {
            let rank = 1;
            snapshot.forEach(d => {
              if (d.id === uid) {
                rankSpan.textContent = rank;
              }
              rank++;
            });
          });
      }
    });
  }
});
