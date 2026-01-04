// guard.js — строгая проверка доступа, гарантированно
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
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;

  try {
    const doc = await db.collection("users").doc(uid).get();
    if (!doc.exists) {
      window.location.href = "index.html";
      return;
    }

    const data = doc.data();

    // Только verified пользователи
    if (!data.nick || data.situation !== "verified") {
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
