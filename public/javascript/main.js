//declare the variables 
const arrayLinkEls = document.querySelectorAll("a");
const navLoginBtn = document.querySelector("#nav-login-button");
const navLogoutBtn = document.querySelector("#nav-logout-button");
//declare the authentication token 
let auth_token = JSON.parse(localStorage.getItem("token"));

// handle expired token
const params = new URLSearchParams(location.search);
if (params.get("msg") && params.get("msg") === "unauthorized") {
  auth_token = false;
  localStorage.removeItem("token");
}

if (auth_token) {
  // we are logged in with a token
  // update all dashboard links with the auth_token added in URL
  for (let i = 0; i < arrayLinkEls.length; i++) {
    if (arrayLinkEls[i].href.includes("dashboard")) {
      arrayLinkEls[i].href = arrayLinkEls[i].href + "?auth_token=" + auth_token;
    }
  }
//buttons that can remove or add
  navLoginBtn.classList.add("hide");
  navLogoutBtn.classList.remove("hide");
} else {
  navLoginBtn.classList.remove("hide");
  navLogoutBtn.classList.add("hide");
}
//add event listener to manipulate the action to this function
navLogoutBtn.addEventListener("click", () => {
  event.preventDefault();
  localStorage.removeItem("token");
  location.replace("/");
});
