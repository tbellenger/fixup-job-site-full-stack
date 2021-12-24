//function to caete a job post
async function editJobHandler(event) {
  event.preventDefault();
  console.log("calling update on job " + event.target.dataset.id);
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
  const category_name = document.querySelector("#category-name").value.trim();
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
      console.log(category_name);
      const jobId = event.target.dataset.id;
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
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
        }),
      });
      //assign them a new token
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        //document.location.replace(`/dashboard?auth_token=${auth_token}`);
      } else {
        alert(response.statusText);
      }
    }
  }
}

//add event listeners to take the actions
document
  .querySelector(".submit-post")
  .addEventListener("click", editJobHandler);
