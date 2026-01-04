const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const messageDiv = document.getElementById("message");

// Вход
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    messageDiv.textContent = "Введите email и пароль!";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // После входа сразу на страницу выбора ника
      window.location.href = "account.html";
    })
    .catch(error => {
      messageDiv.textContent = error.message;
    });
});

// Регистрация
registerBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    messageDiv.textContent = "Введите email и пароль!";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;

      // Создаём документ пользователя с полем nick пустым
      db.collection("users").doc(uid).set({
        nick: "",        // пустой ник
        points: 0,
        email: email
      })
      .then(() => {
        console.log("Документ пользователя создан!");
        // После успешной записи сразу на выбор ника
        window.location.href = "account.html";
      })
      .catch(err => {
        console.error("Ошибка Firestore:", err);
        messageDiv.textContent = "Ошибка при создании документа пользователя.";
      });
    })
    .catch(error => {
      messageDiv.textContent = error.message;
    });
});
