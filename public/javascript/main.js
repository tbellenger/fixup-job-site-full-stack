const arrayLinkEls = document.querySelectorAll("a");
const loginBtn = document.querySelector("#login-button");
const logoutBtn = document.querySelector("#logout-button");

const auth_token = JSON.parse(localStorage.getItem("token"));
if (auth_token) {
  // we are logged in with a token
  // update all dashboard links with the auth_token added in URL
  for (let i = 0; i < arrayLinkEls.length; i++) {
    if (arrayLinkEls[i].href.includes("dashboard")) {
      arrayLinkEls[i].href = arrayLinkEls[i].href + "?auth_token=" + auth_token;
    }
  }

  loginBtn.classList.add("hide");
  logoutBtn.classList.remove("hide");
} else {
  loginBtn.classList.remove("hide");
  logoutBtn.classList.add("hide");
}

logoutBtn.addEventListener("click", () => {
  event.preventDefault();
  localStorage.removeItem("token");
  location.replace("/");
});

