// Скрываем тело страницы до проверки
document.body.style.display = "none";

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    // Не залогинен → на страницу входа
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

    // Проверка состояния
    if (!data.nick || data.situation !== "verified") {
      // Ник не выбран или не verified → на страницу выбора ника
      window.location.href = "account.html";
      return;
    }

    // Всё ок — показываем страницу
    document.body.style.display = "block";

  } catch (err) {
    console.error("Ошибка guard.js:", err);
    window.location.href = "index.html";
  }
});
