const applicantBtns = document.querySelectorAll(".select-applicant-btn");
applicantBtns.forEach((element) => {
  element.addEventListener("click", handleApplicantSelection);
});

async function handleApplicantSelection(event) {
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

////
let userAverageDiv = document.querySelectorAll(".useraverage");
userAverageDiv.forEach(function (user) {
  user.querySelectorAll(".stars").forEach(function (star) {
    star.innerHTML = getStars(user.dataset.useraverage);
  });
});
// console.log(userAverageEl);
// let userAverageDivPEl = document.querySelector("#useraveragedivp");

function getStars(rating) {
  rating = Math.round(rating * 2) / 2;
  let output = [];

  for (var i = rating; i >= 1; i--)
    output.push(
      '<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  if (i == 0.5)
    output.push(
      '<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  for (let i = 5 - rating; i >= 1; i--)
    output.push(
      '<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;'
    );

  return output.join("");
}

// document.getElementById("stars").innerHTML = getStars(userAverageEl);
