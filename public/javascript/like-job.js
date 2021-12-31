async function likeClickHandler(event) {
  event.preventDefault();
  const job_id = event.target.dataset.id;
  console.log(job_id);
  console.log("button clicked");

  const response = await fetch(`/api/jobs/${job_id}/like`, {
    method: "PUT",
    body: JSON.stringify({
      job_id: job_id,
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

document.querySelectorAll(".thumbsup").forEach((item) => {
  item.addEventListener("click", likeClickHandler);
});
