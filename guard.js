// guard.js — строгая проверка доступа
document.body.style.display = "none"; // скрываем тело до проверки

(async function() {
  let user = auth.currentUser;

  // Если текущий пользователь ещё не доступен, ждём события
  if (!user) {
    user = await new Promise(resolve => {
      const unsubscribe = auth.onAuthStateChanged(u => {
        unsubscribe();
        resolve(u);
      });
    });
  }

  if (!user) {
    // не залогинен — на главную страницу
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;

  try {
    const doc = await db.collection("users").doc(uid).get();

    if (!doc.exists) {
      // Если документа ещё нет — создаём новый с situation = "new"
      await db.collection("users").doc(uid).set({
        nick: "",
        points: 0,
        situation: "new"
      });
      window.location.href = "account.html";
      return;
    }

    const data = doc.data();

    // Если пользователь не verified — на страницу с ником
    if (data.situation !== "verified") {
      window.location.href = "account.html";
      return;
    }

    // Всё ок — показываем страницу
    document.body.style.display = "block";

  } catch (err) {
    console.error("Ошибка guard.js:", err);
    window.location.href = "index.html";
  }
})();
