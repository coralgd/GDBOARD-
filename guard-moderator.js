// guard-moderator.js — проверка доступа к меню модератора
document.body.style.display = "none"; // скрываем контент до проверки

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

    // Проверка никнейма и верификации
    if (!data.nick || data.situation !== "verified") {
      window.location.href = "account.html";
      return;
    }

    // Проверка роли: доступ только moderator или elder moderator
    if (data.role !== "moderator" && data.role !== "elder moderator") {
      alert("У вас нет доступа к этому меню");
      window.location.href = "main.html";
      return;
    }

    // Всё ок — показываем страницу
    document.body.style.display = "block";

  } catch (err) {
    console.error("Ошибка guard-moderator.js:", err);
    window.location.href = "main.html";
  }
});
