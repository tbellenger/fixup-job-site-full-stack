// var url = encodeURIComponent(window.location.href);

// const id = window.location.toString().split("/").pop().split("?")[0][
//   window.location.toString().split("/").pop().split("?").length - 1
// ];
// console.log(id);
// const id = window.location.toString().split("/").pop().split("?")[
//   window.location.toString().split("/").pop().split("?").length - 1
// ];
// console.log(id);
// function getURL() {
//   console.log("The URL of this page is: " + window.location.href);
// }
// getURL();

async function submitRatings(event) {
  event.preventDefault();
  //declare all variables of inputs
  const userId = event.target.dataset.user;
  console.log(userId);
  const rating = document.querySelector("#ratings-select").value;

  //   let url = window.location.toString();
  //   console.log(url);
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
        // location.reload();
        location.replace(`/dashboard/user/${userId}?auth_token=` + auth_token);
      } else {
        alert(response.statusText);
      }
    }
  }
}

document.querySelector(".rating-btn").addEventListener("click", submitRatings);
