// Получаем элементы формы
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

// Регистрация пользователя
registerBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Введите email и пароль");
    return;
  }

  try {
    // Создаём пользователя в Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const uid = user.uid;

    // Создаём документ пользователя в Firestore со всеми полями
    await db.collection("users").doc(uid).set({
      nick: "",                  // пока ник не выбран
      points: 0,                 // начальные очки
      situation: "not requested",// статус ника
      role: "player"             // роль по умолчанию
    });

    alert("Аккаунт успешно создан!");
    // Перенаправляем на страницу выбора ника
    window.location.href = "account.html";

  } catch (error) {
    console.error(error);
    alert("Ошибка при регистрации: " + error.message);
  }
});

// Вход пользователя
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Введите email и пароль");
    return;
  }

  try {
    await auth.signInWithEmailAndPassword(email, password);
    // После входа проверяем статус ника
    const user = auth.currentUser;
    const doc = await db.collection("users").doc(user.uid).get();
    const data = doc.data();

    if (!data.nick) {
      window.location.href = "account.html"; // выбрать ник
    } else if (data.situation !== "verified") {
      window.location.href = "account.html"; // ждем верификации
    } else {
      window.location.href = "main.html"; // основной сайт
    }

  } catch (error) {
    console.error(error);
    alert("Ошибка при входе: " + error.message);
  }
});
