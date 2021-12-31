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

function showModalMessage(message) {
  document.querySelector("#modal-content").innerHTML = message;
  document.querySelector("#modal").classList.add("is-active");
  document.querySelectorAll(".modal-close-btn").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      document.querySelector("#modal").classList.remove("is-active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Get all"navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  ); // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target); // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

function modalTemplate(title, message) {
  return `
<div class="card is-3">
  <div class="card-header">
    <div class="card-header-title">
      ${title}
    </div>
  </div>
  <div class="card-content">
    <div class="content">
      ${message}
    </div>
  </div>
  <div class="card-footer">
    <button class="card-footer-item button is-primary modal-close-btn">
      OK
    </button>
  </div>
</div>`;
}
