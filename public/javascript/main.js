const arrayLinkEls = document.querySelectorAll("a");

const auth_token = JSON.parse(localStorage.getItem("token"));
if (auth_token) {
  // we are logged in with a token
  // update all dashboard links with the auth_token added in URL
  for (let i = 0; i < arrayLinkEls.length; i++) {
    if (arrayLinkEls[i].href.includes("dashboard")) {
      arrayLinkEls[i].href = arrayLinkEls[i].href + "?auth_token=" + auth_token;
    }
  }
}
