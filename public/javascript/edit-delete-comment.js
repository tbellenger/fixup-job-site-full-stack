//declare the file path of comments to be edited or deleted
const id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];
//fucntion to delete a comment
async function deleteCommentHandler(event) {
  event.preventDefault();
//get the comment id
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
  //if comment id is existed
//update the comment data after after deletion
  const json = await response.json();
  if (json) {
    if (json.token) {
      localStorage.setItem("token", JSON.stringify(json.token));
      window.location.replace(`/dashboard/?auth_token=${json.token}`);
    }
  } else {
    alert(response.statusText);
  }
}
//add event listener to take the delete action
document
  .querySelector(`#delete-comment-btn${id}`)
  .addEventListener("click", deleteCommentHandler);
//function to edit the comment
async function editCommentHandler(event) {
  event.preventDefault();

  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();
  const response = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      comment_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
//if id is existed
//after deletion update the comment data
  const json = await response.json();
  if (json) {
    if (json.token) {
      localStorage.setItem("token", JSON.stringify(json.token));
      window.location.replace(`/dashboard/?auth_token=${json.token}`);
    }
  }
}
//call the add event listener to take the edit action
document
  .querySelector(`#edit-comment-btn${id}`)
  .addEventListener("click", editCommentHandler);

console.log(id);
