const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const messageDiv = document.getElementById("message");

// Вход
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Создаём документ с nick пустым и situation = not requested
      db.collection("users").doc(userCredential.user.uid).set({
        nick: "",
        situation: "not requested",
        points: 0,
        email: email
      });
      window.location.href = "account.html";
    })
    .catch(error => {
      messageDiv.textContent = error.message;
    });
});

// Проверка доступа
function checkAccess(uid) {
  db.collection("users").doc(uid).get().then(doc => {
    const data = doc.data();
    if (!data.nick) {
      // Ник ещё не выбран
      window.location.href = "account.html";
    } else if (data.situation !== "verified") {
      // Ник выбран, но не подтверждён
      window.location.href = "account.html";
    } else {
      // Доступ разрешён
      window.location.href = "main.html";
    }
  });
}
