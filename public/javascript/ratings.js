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

const starRatingContainer = document.querySelector(".rating");
const starRatingItem = document.querySelectorAll(".rating-item");
starRatingContainer.onclick = async (e) => {
  // change the rating if the user clicks on a different star
  // moves active class to the star that was selected.
  // then sends the update to the server
  if (e.target.classList.contains("active")) {
    // remove active class from all the star items then
    // add it back on the selected one
    starRatingItem.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active"); // add active class to the clicked star
  }
  if (!auth_token) {
    alert("Please login or signup to create post.");
  } else {
    //validate their inputs
    const response = await fetch(`/api/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + auth_token,
      },
      //collect the inputs
      body: JSON.stringify({
        user_id: parseInt(starRatingContainer.dataset.id),
        rating: parseInt(e.target.dataset.rate),
      }),
    });

    if (response.ok) {
      location.replace(
        `/dashboard/user/${starRatingContainer.dataset.id}?auth_token=` +
          auth_token
      );
    } else {
      alert(response.statusText);
    }
  }
};
