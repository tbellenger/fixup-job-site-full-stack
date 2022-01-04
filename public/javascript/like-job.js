document.querySelectorAll(".thumbsup").forEach((item) => {
  item.addEventListener("click", likeClickHandler);
});
async function likeClickHandler(event) {
  event.preventDefault();
  const jobId = event.target.dataset.id;
  console.log(jobId);
  console.log("button clicked");

  const response = await fetch(`/api/jobs/${jobId}/like`, {
    method: "PUT",
    body: JSON.stringify({
      job_id: jobId,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${auth_token}`,
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

// document.querySelectorAll(".thumbsup").forEach((item) => {
//   item.addEventListener("click", likeClickHandler);
// });
