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
      checkAccess(userCredential.user.uid);
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

      // Создаём документ пользователя в Firestore
      db.collection("users").doc(uid).set({
        nick: "",
        situation: "not requested",
        points: 0,
        email: email
      })
      .then(() => {
        messageDiv.textContent = "Аккаунт создан! Пожалуйста, выберите ник.";
        window.location.href = "account.html";
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

// Проверка доступа
function checkAccess(uid) {
  db.collection("users").doc(uid).get().then(doc => {
    const data = doc.data();
    if (!data) {
      messageDiv.textContent = "Документ пользователя не найден!";
      return;
    }

    if (!data.nick) {
      window.location.href = "account.html";
    } else if (data.situation !== "verified") {
      window.location.href = "account.html";
    } else {
      window.location.href = "main.html";
    }
  });
}
