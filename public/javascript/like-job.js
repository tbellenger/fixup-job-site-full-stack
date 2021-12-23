async function likeClickHandler(event) {
  event.preventDefault();

  console.log("button clicked");
  //   const id = window.location.toString().split("/")[
  //     window.location.toString().split("/").length - 1
  //   ];

  //   console.log(id);
  const response = await fetch("/api/jobs/like", {
    method: "PUT",
    body: JSON.stringify({
      job_id: event.target.dataset.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#thumbsup").addEventListener("click", likeClickHandler);
