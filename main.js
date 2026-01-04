const nickSpan = document.getElementById("nick");
const pointsSpan = document.getElementById("points");
const rankSpan = document.getElementById("rank");

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const uid = user.uid;
  const userDocRef = db.collection("users").doc(uid);

  try {
    const doc = await userDocRef.get();
    const data = doc.data();
    nickSpan.textContent = data.nick || "-";
    pointsSpan.textContent = data.points || 0;

    // Определяем место пользователя среди всех verified
    const snapshot = await db.collection("users")
      .where("situation", "==", "verified")
      .orderBy("points", "desc")
      .get();

    let rank = 1;
    snapshot.forEach(d => {
      if (d.id === uid) rankSpan.textContent = rank;
      rank++;
    });

  } catch (err) {
    console.error(err);
  }
});
