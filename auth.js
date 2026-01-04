const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const messageDiv = document.getElementById("message");

// Вход
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    messageDiv.textContent = "Введите email и пароль!";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      window.location.href = "main.html";
    })
    .catch(error => {
      messageDiv.textContent = error.message;
    });
});

// Регистрация
registerBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    messageDiv.textContent = "Введите email и пароль!";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;

      // Создаём документ пользователя
      db.collection("users").doc(uid).set({
        points: 0,
        email: email
      })
      .then(() => {
        messageDiv.textContent = "Аккаунт создан!";
        window.location.href = "main.html";
      })
      .catch(err => {
        console.error(err);
        messageDiv.textContent = "Ошибка при создании документа пользователя.";
      });
    })
    .catch(error => {
      messageDiv.textContent = error.message;
    });
});
