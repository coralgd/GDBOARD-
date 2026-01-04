// guard.js — проверка доступа для страниц main и board
auth.onAuthStateChanged(user => {
  if (!user) {
    // Не залогинен → на главную регистрацию
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  const userDocRef = db.collection("users").doc(uid);

  userDocRef.get().then(doc => {
    if (!doc.exists) {
      // Пользователь есть в auth, но нет документа
      window.location.href = "index.html";
      return;
    }

    const data = doc.data();

    // Если ник не выбран или пользователь не верифицирован
    if (!data.nick || data.situation !== "verified") {
      window.location.href = "account.html";
      return;
    }

    // Всё ок, пользователь verified → страница доступна
  }).catch(err => {
    console.error("Ошибка при проверке guard.js:", err);
    window.location.href = "index.html";
  });
});
