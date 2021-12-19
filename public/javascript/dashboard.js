
const submitFormHandler = async (event) =>{
    event.preventDefault();
  
    const title = document.querySelector('.title-input').value.trim();
    const description = document.querySelector('.decription-input').value.trim();
    const salary =  document.querySelector('.salary-input').value.trim();
    const job_location = document.querySelector('.location-input').value.trim();
    const payment_method = document.querySelector('.payment-input').value.trim();
    const category_name = document.querySelector('.category-input').value.trim();
  

    if(title && category_name && description && salary && job_location && payment_method)

    const response = await fetch(`/api/user`, {
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
  const json = await response.json();
if (json.token) {
        localStorage.setItem("token", JSON.stringify(json.token));
        window.location.replace(`/?auth_token=${json.token}`);
      }
  } 

//add event listeners
document
    .querySelector(".submit-post")
    .addEventListener("click", submitFormHandler);


 
  