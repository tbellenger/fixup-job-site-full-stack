//declare the variable for apply button and add event listener 
const applicantBtns = document.querySelectorAll(".select-applicant-btn");
applicantBtns.forEach((element) => {
  element.addEventListener("click", handleApplicantSelection);
});
//function to select the applicant and gather them into owner dashboard applicant lists for certain job post
async function handleApplicantSelection() {
  event.preventDefault();
//declare the variables for job id and aplicant id
  const jobId = event.target.dataset.job;
  const applicantId = event.target.dataset.applicant;

  console.log("Applicant " + applicantId);
  console.log("Job " + jobId);
  
//fetch the api jobs id 
  const response = await fetch(`/api/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + auth_token,
    },
    body: JSON.stringify({ employee_id: applicantId, job_status: "filled"}),
  });
  if (response.ok) {
    location.replace("/dashboard?auth_token=" + auth_token);
  } else {
    alert(response.statusText);
  }
}
