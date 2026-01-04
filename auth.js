const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const messageDiv = document.getElementById("message");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    messageDiv.textContent = "Введите email и пароль!";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      checkUserState(userCredential.user.uid);
    })
    .catch(error => {
      messageDiv.textContent = error.message;
    });
});

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

      db.collection("users").doc(uid).set({
        nick: "",
        points: 0,
        email: email,
        situation: "not requested"
      })
      .then(() => {
        checkUserState(uid);
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

function checkUserState(uid) {
  db.collection("users").doc(uid).get().then(doc => {
    const data = doc.data();
    if (!data.nick || data.situation === "not requested") {
      window.location.href = "account.html";
    } else {
      window.location.href = "main.html";
    }
  });
}
