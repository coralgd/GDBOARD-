const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const messageDiv = document.getElementById("message");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      checkNickname(userCredential.user.uid);
    })
    .catch(error => {
      messageDiv.textContent = error.message;
    });
});

registerBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      db.collection("users").doc(userCredential.user.uid).set({
        nickname: "",
        status: "",
        points: 0,
        email: email
      });
      window.location.href = "account.html";
    })
    .catch(error => {
      messageDiv.textContent = error.message;
    });
});

function checkNickname(uid) {
  db.collection("users").doc(uid).get().then(doc => {
    const data = doc.data();
    if (!data.nickname) {
      window.location.href = "account.html";
    } else if (data.status !== "approved") {
      window.location.href = "account.html";
    } else {
      window.location.href = "main.html";
    }
  });
}
