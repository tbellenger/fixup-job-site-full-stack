//fucntion to delete a thread
async function deleteThreadHandler(event) {
    event.preventDefault();
    //get the thread id
    const response = await fetch(`/api/dm/${event.target.dataset.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json" ,
        Authorization: "bearer " + auth_token,
      },
    });
  
    if (response.ok) {
      location.reload();
    } else {
      alert(response.statusText);
    }
  }

  //add event listener to take the delete action
  const delBtns = document.querySelectorAll(".delete-message");
  delBtns.forEach((element) => {
    element.addEventListener("click", deleteThreadHandler);
  });
  

  //function to create a a new thread
  async function newThreadHandler(event) {
    event.preventDefault();
    //declare all variables of inputs
  
    const dm = document.querySelector("textarea[name=message-input]").value.trim();
    //if not a user bring them into login section
    if (!auth_token) {
      alert("Please login or signup to start the conversation.");
    } else {
      //if user then ask them to input the data
      if (dm) {
        //validate their inputs
        const response = await fetch(`/api/dm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${auth_token}`,
          },
          //collect the inputs
          body: JSON.stringify({
            message: dm,
            from_id: event.target.dataset.id,
             to_id: event.target.dataset.id,
          }),
        });
        //assign them a nth_token
        if (response.ok) {
            location.reload();

        } else {
          alert(response.statusText);
        }
      }
    }
  }
  
  const replyEl = document.querySelector(".reply-msg");
  if (replyEl) {
    replyEl.addEventListener("click", newThreadHandler);
  }

