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

        // If the job was successfully posted to the DB then
        // try to upload the image
        // Uses form data in POST so we are doing it separately
        // as the other POST uses JSON body
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
const completePostHandler = async (event) => {
  event.preventDefault();
  //declare the variables of id to be deleted
  const completePostId = event.target.dataset.id;
  console.log("called mark complete of " + completePostId);
  if (completePostId) {
    const response = await fetch("/api/jobs/" + completePostId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + auth_token,
      },
      body: JSON.stringify({
        job_status: "complete",
      }),
    });
    //remove the token after deletion from the data
    if (response.ok) {
      showModalMessage(ratingTemplate(event.target.dataset.employee));
      ratingsJs();
    } else {
      alert(
        "Failed to update post. " + response.status + ": " + response.statusText
      );
    }
  }
};
const completeButtons = document.querySelectorAll(".complete-job");
completeButtons.forEach((el) =>
  el.addEventListener("click", completePostHandler)
);

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

// Image file selection can lead to a pause with no indication
// on the UI. Put this spinner in to show that something is
// happening to the user.
const fileBtn = document.querySelector("#file-input");
fileBtn.addEventListener("click", () => {
  //add spinner to show waiting
  document.querySelector("#spinner").classList.remove("hide");
  document.querySelector("#upload-file-name").classList.add("hide");
});
const job_image = document.querySelector('input[type="file"]');
job_image.addEventListener("change", () => {
  // hide the spinner
  document.querySelector("#spinner").classList.add("hide");
  document.querySelector("#upload-file-name").classList.remove("hide");
  if (job_image.files.length === 0) {
    document.querySelector("#upload-file-name").innerHTML = "No file selected";
  } else {
    document.querySelector("#upload-file-name").innerHTML =
      job_image.files[0].name;
  }
  if (job_image.files[0].size > 3 * 1024 * 1024) {
    alert("File is too big");
    job_image.value = "";
  }
});

// Handle Bulma notification display and dismissal
// removes the notification from the DOM when the
// delete button on the notification is clicked
document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});

function ratingTemplate(id) {
  return `
  <div class="card is-3">
    <div class="card-header">
      <div class="card-header-title">
        How well was the job completed?
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        <label class="label">Your rating </label>
        <ul class="rating" id="ratings-select" data-id="${id}">
          <li class="rating-item" data-rate="1"></li>
          <li class="rating-item" data-rate="2"></li>
          <li class="rating-item" data-rate="3"></li>
          <li class="rating-item" data-rate="4"></li>
          <li class="rating-item active" data-rate="5"></li>
        </ul>
      </div>
    </div>
</div>
`;
}

function ratingsJs() {
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
        location.replace(`/dashboard?auth_token=` + auth_token);
      } else {
        alert(response.statusText);
      }
    }
  };
}
