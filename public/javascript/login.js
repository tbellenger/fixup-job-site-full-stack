//declare all variables
const signupInsteadBtn = document.querySelector("#signup-instead");
const loginInsteadBtn = document.querySelector("#login-instead");
const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#signup");
//add event listener to manipulate the actions
signupInsteadBtn.addEventListener("click", toggleSignupLogin);
loginInsteadBtn.addEventListener("click", toggleSignupLogin);
loginBtn.addEventListener("click", login);
signupBtn.addEventListener("click", signup);
//create functions to manipulate the form whether to show or hide
function toggleSignupLogin() {
  event.preventDefault();

  const loginFormEl = document.querySelector("#login-form");
  const signupFormEl = document.querySelector("#signup-form");

  loginFormEl.classList.toggle("hide");
  signupFormEl.classList.toggle("hide");
}
//create functions for a login action
async function login() {
  event.preventDefault();
  const usernameEl = document.querySelector("#username-login");
  const passwordEl = document.querySelector("#password-login");
  const email = usernameEl.value.trim();
  const password = passwordEl.value.trim();
  //declare the post method to get the users
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //collect the user information into the storage
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  //save/store the user information into the local storage
  const json = await response.json();
  
  if (json) {
    if (json.token) {
      localStorage.setItem("token", JSON.stringify(json.token));
      location.replace(`/dashboard?auth_token=${json.token}`);
    }
  }
}
//function for a sign up action
async function signup() {
  event.preventDefault();
  const nameEl = document.querySelector("#name-signup");
  const usernameEl = document.querySelector("#username-signup");
  const passwordEl = document.querySelector("#password-signup");
  const username = nameEl.value.trim();
  const email = usernameEl.value.trim();
  const password = passwordEl.value.trim();
  //call the method post
  const signup = await fetch("/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //collect the user informations
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });

  //condition to store the user data info
  if (signup.ok) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //then collect the data
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    //and store/save it into the local storage
    const json = await response.json();
    if (json) {
      if (json.token) {
        localStorage.setItem("token", JSON.stringify(json.token));
        location.replace(`/dashboard?auth_token=${json.token}`);
      }
    }
  }
}
