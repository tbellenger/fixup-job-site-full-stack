async function tagHandler(event) {
    event.preventDefault();
    const job_id = event.target.dataset.id;
    const tag_id = even.target.dataset.id;
    const tag_name = event.target.dataset.id;
    const response = await fetch(`/api/jobs/${job_id}/tag`, {
      method: "PUT",
      body: JSON.stringify({
        tag_name: tag_name,
        tag_id: tag_id,
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
  
  document.querySelectorAll(".tag").forEach((item) => {
    item.addEventListener("click", likeClickHandler);
  });
  