const signupInsteadBtn = document.querySelector("#signup-instead");
const loginInsteadBtn = document.querySelector("#login-instead");

signupInsteadBtn.addEventListener("click", toggleSignupLogin);
loginInsteadBtn.addEventListener("click", toggleSignupLogin);

function toggleSignupLogin() {
  event.preventDefault();

  const loginFormEl = document.querySelector("#login-form");
  const signupFormEl = document.querySelector("#signup-form");

  loginFormEl.classList.toggle("hide");
  signupFormEl.classList.toggle("hide");
}
