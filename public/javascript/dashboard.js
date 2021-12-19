const token = JSON.parse(localStorage.getItem("token"));


async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value.trim();
    const description = document.querySelector('input[name="description"]').value.trim();
    const salary =  document.querySelector('input[name="salary"]').value.trim();
    const job_location = document.querySelector('input[name="job-location"]').value.trim();
    const payment_method = document.querySelector('input[name="payment-method"]').value.trim();
    const category_name = document.querySelector('input[name="category-name"]').value.trim();
    const user_id = document.querySelector(".logged-in-user_id").innerHTML;
    

    if(!token){
      alert("Please login or signup to create post.")
    } else{
      if(title && category_name && description && salary && job_location && payment_method)
    const response = await fetch(`/api/jobs`, {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Authorization":"bearer " + token,
      },
      body: JSON.stringify({
        title,
        category_name,
        description, 
        salary,
        job_location,
        payment_method
      }),
    });
  
    if (response.ok) {
      document.location.replace('/dashboard?auth_token='+token);
    } else {
      alert(response.statusText);
    }
  }
};

//delete post from client to API
const deletePostHandler = async (event) => {
    event.preventDefault();

    const deletePostId = event.target.getAttribute("data-id");
    if (deletePostId) {
        const response = await fetch("/api/job/" + deletePostId, {
            method: "DELETE",
            headers: { 
              "Content-Type": "application/json",
              "Authorization":"bearer " + token
             },
        });
        if (response.ok) {
            document.location.replace("/dashboard?auth_token=" + token);
        } else {
            alert(
                "Failed to delete post. " +
                    response.status +
                    ": " +
                    response.statusText
            );
        }
    }
};

//add event listeners
document
    .querySelector(".submit-post")
    .addEventListener("click", submitPostHandler);

const deleteButtons = document.querySelectorAll(".delete-post");
deleteButtons.forEach((el) =>
    el.addEventListener("click", (event) => deletePostHandler(event))
);

 
  