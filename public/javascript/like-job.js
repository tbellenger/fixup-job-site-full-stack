//function to manipulate the likes click
async function likeClickHandler(event) {
  event.preventDefault();
  const job_id = event.currentTarget.dataset.id;
  //fetch the api jobs and add like to each job id being likes.
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

//add event listener for click function
document.querySelectorAll(".thumbsup").forEach((item) => {
  item.addEventListener("click", likeClickHandler);
});
