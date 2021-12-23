const applicantBtns = document.querySelectorAll(".select-applicant-btn");
applicantBtns.forEach((element) => {
  element.addEventListener("click", handleApplicantSelection);
});

async function handleApplicantSelection() {
  event.preventDefault();

  const jobId = event.target.dataset.job;
  const applicantId = event.target.dataset.applicant;

  console.log("Applicant " + applicantId);
  console.log("Job " + jobId);

  const response = await fetch(`/api/jobs/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + auth_token,
    },
    body: JSON.stringify({ employee_id: applicantId, job_status: "filled" }),
  });
  if (response.ok) {
    location.replace("/dashboard?auth_token=" + auth_token);
  } else {
    alert(response.statusText);
  }
}
