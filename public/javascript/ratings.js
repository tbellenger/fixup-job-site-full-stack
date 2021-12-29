let userAverageDiv = document.querySelector("#useraverage");
let userAverageEl = document.querySelector("#useraveragep").innerText;
// let userAverageDivPEl = document.querySelector("#useraveragedivp");

function getStars(rating) {
  rating = Math.round(rating * 2) / 2;
  let output = [];

  for (var i = rating; i >= 1; i--)
    output.push(
      '<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  if (i == 0.5)
    output.push(
      '<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  for (let i = 5 - rating; i >= 1; i--)
    output.push(
      '<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  return output.join("");
}
document.getElementById("stars").innerHTML = getStars(userAverageEl);
const container = document.querySelector(".rating");
const items = container.querySelectorAll(".rating-item");
container.onclick = (e) => {
  const elClass = e.target.classList;
  // change the rating if the user clicks on a different star
  if (!elClass.contains("active")) {
    items.forEach(
      // reset the active class on the star
      (item) => item.classList.remove("active")
    );
    let rating = e.target.dataset.rate;
    console.log(rating);
    container.dataset.rate = rating;
    let userId = e.target.dataset.user;
    container.dataset.user = userId;
    console.log(e.target.getAttribute("data-rate"));
    elClass.add("active"); // add active class to the clicked star
  }
};

// console.log(items.event.target.value);
// let rating = items.forEach((item) => console.log(item.value));
// console.log(rating);
// userAverageDivPEl.style.display = "none";
// var userAverageText = userAverageEl.innerText;
// console.log(userAverageText);
// var userAverageNum = Number(userAverageText);
// console.log(userAverageNum);

// if (userAverageEl === 0.5) {
//   userAverageDiv.innerHTML = '<i class="fas fa-star-half"></i>';
// }
// items.forEach((item) => console.log(items[item].value));

async function submitRatings(event) {
  event.preventDefault();
  //declare all variables of inputs
  const userId = event.target.dataset.user;
  console.log(userId);
  // let rating = document.querySelector("#ratings-select").value;
  // let rating = items.forEach(
  //   // reset the active class on the star
  //   (item) => console.log(item.value)
  // );
  const rating = event.target.dataset.rate;
  console.log(rating);
  if (rating > 5) {
    rating = 5;
  } else if (rating < 0) {
    rating = 0;
  }

  //if not a user bring them into login section
  if (!auth_token) {
    alert("Please login or signup to create post.");
  } else {
    if (rating) {
      //validate their inputs
      const response = await fetch(`/api/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + auth_token,
        },
        //collect the inputs
        body: JSON.stringify({
          user_id: userId,
          rating: rating,
        }),
      });
      //assign them a nth_token
      if (response.ok) {
        location.reload();
        // location.replace(`/dashboard/user/${userId}?auth_token=` + auth_token);
      } else {
        alert(response.statusText);
      }
    }
  }
}

// document.querySelector(".rating-btn").addEventListener("click", submitRatings);
container.addEventListener("click", submitRatings);
