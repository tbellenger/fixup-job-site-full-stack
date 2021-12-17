const signupInsteadBtn = document.querySelector("#signup-instead");
const loginInsteadBtn = document.querySelector("#login-instead");
const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#signup");
const usernameEl = document.querySelector("#username-login");
const passwordEl = document.querySelector("#password-login");

signupInsteadBtn.addEventListener("click", toggleSignupLogin);
loginInsteadBtn.addEventListener("click", toggleSignupLogin);
loginBtn.addEventListener("click", login);
signupBtn.addEventListener("click", signup);

function toggleSignupLogin() {
  event.preventDefault();

  const loginFormEl = document.querySelector("#login-form");
  const signupFormEl = document.querySelector("#signup-form");

  loginFormEl.classList.toggle("hide");
  signupFormEl.classList.toggle("hide");
}

async function login() {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: {
      email: usernameEl.value().trim(),
      password: passwordEl.value().trim(),
    },
  });
  const json = await response.json();
  if (json) {
    if (json.token) {
      localStorage.setItem("token", json.token);
    }
  }
}

function signup() {}
