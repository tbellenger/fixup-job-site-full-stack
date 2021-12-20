const token = JSON.parse(localStorage.getItem("token"));

async function newPostHandler(event) {
  event.preventDefault();

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
  // const category_name = document
  //   .querySelector('.category-name')
  //   .value.trim();
  // const username = document.querySelector(".username-input").value.trim();

  if (!token) {
    alert("Please login or signup to create post.");
  } else {
    if (
      title &&
      // category_name &&
      description &&
      salary &&
      zip_code &&
      payment_method
      // username
    ) {
      const response = await fetch(`/api/jobs/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          // category_name,
          description,
          salary,
          zip_code,
          payment_method,
          // username,
        }),
      });
      console.log(token);
      if (response.ok) {
        document.location.replace(`/dashboard?auth_token= ${token}`);
      } else {
        alert(response.statusText);
      }
    }
  }
}

//delete post from client to API
const deletePostHandler = async (event) => {
  event.preventDefault();

  const deletePostId = event.target.getAttribute("data-id");
  console.log("called delete of " + deletePostId);
  if (deletePostId) {
    const response = await fetch("/api/jobs/" + deletePostId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard?auth_token=" + token);
    } else {
      alert(
        "Failed to delete post. " + response.status + ": " + response.statusText
      );
    }
  }
};

//add event listeners
document
  .querySelector(".submit-post")
  .addEventListener("click", newPostHandler);

const deleteButtons = document.querySelectorAll(".delete-job");
deleteButtons.forEach((el) =>
  el.addEventListener("click", (event) => deletePostHandler(event))
);
