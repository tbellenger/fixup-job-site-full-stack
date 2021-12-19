const id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 1
];
async function deleteCommentHandler(event) {
  event.preventDefault();

  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });

  const json = await response.json();
  if (json) {
    if (json.token) {
      localStorage.setItem("token", JSON.stringify(json.token));
      window.location.replace(`/?auth_token=${json.token}`);
    }
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(`#delete-comment-btn${id}`)
  .addEventListener("click", deleteCommentHandler);

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

  const json = await response.json();
  if (json) {
    if (json.token) {
      localStorage.setItem("token", JSON.stringify(json.token));
      window.location.replace(`/?auth_token=${json.token}`);
    }
  }
}

document
  .querySelector(`#edit-comment-btn${id}`)
  .addEventListener("click", editCommentHandler);

console.log(id);
