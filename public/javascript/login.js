const signupInsteadBtn = document.querySelector("#signup-instead");
const loginInsteadBtn = document.querySelector("#login-instead");
const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#signup");

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
  event.preventDefault();
  const usernameEl = document.querySelector("#username-login");
  const passwordEl = document.querySelector("#password-login");
  const email = usernameEl.value.trim();
  const password = passwordEl.value.trim();

  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const json = await response.json();
  if (json) {
    if (json.token) {
      localStorage.setItem("token", JSON.stringify(json.token));
      window.location.replace(`/?auth_token=${json.token}`);
    }
  }
}

async function signup() {
  event.preventDefault();
  const usernameEl = document.querySelector("#username-signup");
  const passwordEl = document.querySelector("#password-signup");
  const email = usernameEl.value.trim();
  const password = passwordEl.value.trim();

  const response = await fetch("/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const json = await response.json();
  if (json) {
    if (json.token) {
      localStorage.setItem("token", JSON.stringify(json.token));
      window.location.replace(`/?auth_token=${json.token}`);
    }
  }
}
