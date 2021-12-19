async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value.trim();
    const description = document.querySelector('input[name="description"]').value.trim();
    const salary =  document.querySelector('input[name="salary"]').value.trim();
    const job_location = document.querySelector('input[name="job-location"]').value.trim();
    const payment_method = document.querySelector('input[name="payment-method"]').value.trim();
    const category_name = document.querySelector('input[name="category-name"]').value.trim();
   

    if(!username){
      alert("Please login or signup to create post.")
    } else{
      if(title && category_name && description && salary && job_location && payment_method)
    const response = await fetch(`/api/jobs`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        category_name,
        description, 
        salary,
        job_location,
        payment_method
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};


//add event listeners
document
    .querySelector(".submit-post")
    .addEventListener("click", newFormHandler);


 
  