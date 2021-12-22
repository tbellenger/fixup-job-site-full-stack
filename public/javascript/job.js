//fucntion to delete a comment
async function deleteCommentHandler(event) {
  event.preventDefault();
  //get the comment id
  const response = await fetch(`/api/comments/${event.target.dataset.id}`, {
    method: "DELETE",
    headers: {
      Authorization: "bearer " + auth_token,
    },
  });

  if (response.ok) {
    location.reload();
  } else {
    alert(response.statusText);
  }
}
//add event listener to take the delete action
const deleteBtns = document.querySelectorAll(".delete-comment-btn");
deleteBtns.forEach((element) => {
  element.addEventListener("click", deleteCommentHandler);
});
//function to edit the comment
async function editCommentHandler(event) {
  event.preventDefault();

  const comment_text = document
    .querySelector(`textarea[name="comment-body-${event.target.dataset.id}"]`)
    .value.trim();
  const response = await fetch(`/api/comments/${event.target.dataset.id}`, {
    method: "PUT",
    body: JSON.stringify({
      comment_text,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + auth_token,
    },
  });
  //if id is existed

  if (response.ok) {
    location.reload();
  } else {
    alert(response.statusText);
  }
}
//call the add event listener to take the edit action
const editBtns = document.querySelectorAll(".edit-comment-btn");
editBtns.forEach((element) => {
  element.addEventListener("click", editCommentHandler);
});

//function to caete a job post
async function newCommentHandler(event) {
  event.preventDefault();
  //declare all variables of inputs

  const comment = document
    .querySelector("textarea[name=comment-input")
    .value.trim();
  //if not a user bring them into login section
  if (!auth_token) {
    alert("Please login or signup to create post.");
  } else {
    //if user then ask them to input the data
    if (comment) {
      //validate their inputs
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${auth_token}`,
        },
        //collect the inputs
        body: JSON.stringify({
          comment_text: comment,
          job_id: event.target.dataset.id,
        }),
      });
      //assign them a nth_token
      if (response.ok) {
        location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
}

document
  .querySelector(".submit-post")
  .addEventListener("click", newCommentHandler);

async function applyToJob() {
  try {
    const response = await fetch(`/api/jobs/${id}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${auth_token}`,
      },
    });
    if (response.ok) {
    } else {
      alert(response.statusText);
    }
  } catch (err) {
    console.log(err);
  }
}

const applyBtn = document.querySelector("#apply-to-job-btn");
if (applyBtn) {
  applyBtn.addEventListener("click", applyToJob);
}
