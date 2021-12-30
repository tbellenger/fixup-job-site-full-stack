//function to caete a job post
async function newPostHandler(event) {
  event.preventDefault();
  //declare all variables of inputs
  const title = document.querySelector("input[name=job-title]").value.trim();
  const description = document
    .querySelector("textarea[name=description-input")
    .value.trim();
  const salary = document.querySelector("input[name=salary-input").value.trim();
  const zip_code = document
    .querySelector("input[name=location-input")
    .value.trim();
  const payment_method = document
    .querySelector("input[name=payment-input")
    .value.trim();
  //const job_status = document
  //.querySelector("input[name=status-input")
  // .value.trim();
  const category_name = document.querySelector("#category-name").value.trim();
  const job_image = document.querySelector('input[type="file"]');
  console.log(job_image);
  // const username = document.querySelector(".username-input").value.trim();
  //if not a user bring them into login section
  if (!auth_token) {
    alert("Please login or signup to create post.");
  } else {
    //if user then ask them to input the data
    if (
      title &&
      category_name &&
      description &&
      salary &&
      zip_code &&
      payment_method
    ) {
      //validate their inputs
      const response = await fetch(`/api/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${auth_token}`,
        },
        //collect the inputs
        body: JSON.stringify({
          title,
          category_name,
          description,
          salary,
          zip_code,
          payment_method,

          // username,
        }),
      });

      if (response.ok) {
        json = await response.json();
        console.log(json);
        if (job_image.files.length > 0) {
          const formData = new FormData();
          formData.append("file", job_image.files[0]);
          const img_response = await fetch(`api/jobs/${json.id}/image`, {
            method: "POST",
            headers: {
              Authorization: "bearer " + auth_token,
            },
            body: formData,
          });
          if (img_response.ok) {
            console.log("image upload success");
            document.location.replace(`/dashboard?auth_token=${auth_token}`);
          } else {
            alert("image upload failed");
          }
        } else {
          console.log("no image to upload");
          location.replace(`/dashboard?auth_token=${auth_token}`);
        }
      } else {
        alert(response.statusText);
      }
    }
  }
}

//delete post from client to API
const deletePostHandler = async (event) => {
  event.preventDefault();
  //declare the variables of id to be deleted
  const deletePostId = event.target.getAttribute("data-id");
  console.log("called delete of " + deletePostId);
  if (deletePostId) {
    const response = await fetch("/api/jobs/" + deletePostId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + auth_token,
      },
    });
    //remove the token after deletion from the data
    if (response.ok) {
      document.location.replace("/dashboard?auth_token=" + auth_token);
    } else {
      alert(
        "Failed to delete post. " + response.status + ": " + response.statusText
      );
    }
  }
};

//add event listeners to take the actions
document
  .querySelector(".submit-post")
  .addEventListener("click", newPostHandler);

const deleteButtons = document.querySelectorAll(".delete-job");
deleteButtons.forEach((el) => el.addEventListener("click", deletePostHandler));

const fileBtn = document.querySelector("#file-input");
fileBtn.addEventListener("click", () => {
  //add spinner to show waiting
  document.querySelector("#spinner").classList.remove("hide");
});
const job_image = document.querySelector('input[type="file"]');
job_image.addEventListener("change", () => {
  // hide the spinner
  document.querySelector("#spinner").classList.add("hide");
  if (job_image.files[0].size > 3 * 1024 * 1024) {
    alert("File is too big");
    job_image.value = "";
  }
});

const completeJob = async (event) => {
  event.preventDefault();
  const jobId = event.target.dataset.id;
  const respone = await fetch(`/api/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + auth_token,
    },
    body: JSON.stringify({ job_status: "complete" }),
  });
  if (respone.ok) {
    document.querySelector(".modal").classList.add("is-active");
    document.querySelector("html").classList.add("is-clipped");
    document.location.replace("/dashboard?auth_token=" + auth_token);
  } else {
    // alert(response.statusText);
  }
};
document.querySelector(".complete-job").addEventListener("click", completeJob);
document.querySelector(".modal-close").addEventListener("click", function () {
  document.querySelector(".modal").classList.remove("is-active");
  document.querySelector("html").classList.remove("is-clipped");
});
const starRatingContainer = document.querySelector(".rating");
const starRatingItem = document.querySelectorAll(".rating-item");
starRatingContainer.onclick = async (e) => {
  // change the rating if the user clicks on a different star
  // moves active class to the star that was selected.
  // then sends the update to the server
  if (!e.target.classList.contains("active")) {
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
