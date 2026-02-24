const allJobs = [...jobListings];
let interview = [];
let rejected = [];

const interviewNum = document.getElementById("interview-no");
const rejectedNum = document.getElementById("rejected-no");
const totalCount = document.getElementById("total-count");
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

function setActiveTab(activeBtn) {
  allBtn.className = "btn btn-outline btn-primary";
  interviewBtn.className = "btn btn-outline btn-success";
  rejectedBtn.className = "btn btn-outline btn-error";

  if (activeBtn === allBtn) {
    activeBtn.className = "btn btn-primary";
  } else if (activeBtn === interviewBtn) {
    activeBtn.className = "btn btn-success";
  } else if (activeBtn === rejectedBtn) {
    activeBtn.className = "btn btn-error";
  }
}

const renderList = (data, section, emptyMessage = "No Jobs Available") => {
  if (data.length === 0) {
    section.innerHTML = `
      <div class="card bg-base-100 w-full text-center">
        <div class="card-body items-center">
          <img src="./jobs.png" alt="" class="w-20">
          <h2 class="card-title text-3xl font-bold">${emptyMessage}</h2>
          <p>Check back soon for new jobs</p>
        </div>
      </div>`;
    return;
  }

  section.innerHTML = data
    .map(
      (job) => `
    <div class="card bg-base-100 w-full text-start shadow-sm border border-base-200 mb-4">
      <div class="card-body">
        
        <div class="flex justify-between items-start">
          <div>
            <h2 class="card-title text-3xl font-bold">${job.companyName}</h2>
            <h6 class="text-gray-400 text-xl font-bold">${job.position}</h6>
          </div>

          <button class="btn btn-outline btn-warning btn-sm" onclick="handleDelete(${job.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

        <div class="flex gap-6 list-none text-sm mt-2">
            <li>${job.location}</li>
            <li>${job.type}</li>
            <li>${job.salary}</li>
        </div>

        <button class="btn btn-soft w-36 mt-4 ${
          job.status === "Interviewing"
            ? "btn-success"
            : job.status === "Rejected"
              ? "btn-error"
              : ""
        }">${job.status}</button>

        <p class="py-2">${job.description}</p>
        
        <div class="card-actions mt-auto">
           <button class="btn btn-outline btn-success" onclick="updateJobStatus(${job.id}, 'Interviewing')">Interview</button>
           <button class="btn btn-outline btn-error" onclick="updateJobStatus(${job.id}, 'Rejected')">Rejected</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
};

// function updateUI() {
//   renderList(allJobs, document.getElementById("all-jobs"));
//   renderList(
//     interview,
//     document.getElementById("interview-jobs"),
//     "No Interviews Scheduled",
//   );
//   renderList(
//     rejected,
//     document.getElementById("rejected-jobs"),
//     "No Rejected Applications",
//   );
//   if (interviewNum) interviewNum.innerText = interview.length;
//   if (rejectedNum) rejectedNum.innerText = rejected.length;
// }

function updateUI() {
  renderList(allJobs, document.getElementById("all-jobs"));
  renderList(
    interview,
    document.getElementById("interview-jobs"),
    "No Interviews Scheduled",
  );
  renderList(
    rejected,
    document.getElementById("rejected-jobs"),
    "No Rejected Applications",
  );

  document.getElementById("total-no").innerText = allJobs.length;
  if (interviewNum) interviewNum.innerText = interview.length;
  if (rejectedNum) rejectedNum.innerText = rejected.length;

  const isInterviewVisible = !document
    .getElementById("interview-jobs")
    .classList.contains("hidden");
  const isRejectedVisible = !document
    .getElementById("rejected-jobs")
    .classList.contains("hidden");

  if (isInterviewVisible) {
    totalCount.innerText = `${interview.length} of ${allJobs.length} jobs`;
  } else if (isRejectedVisible) {
    totalCount.innerText = `${rejected.length} of ${allJobs.length} jobs`;
  } else {
    totalCount.innerText = `total ${allJobs.length} jobs`;
  }
}

updateUI();

function updateJobStatus(id, newStatus) {
  const job = allJobs.find((j) => j.id === id);

  if (job) {
    job.status = newStatus;

    if (newStatus === "Interviewing") {
      if (!interview.some((j) => j.id === id)) interview.push(job);
      rejected = rejected.filter((j) => j.id !== id);
    } else if (newStatus === "Rejected") {
      if (!rejected.some((j) => j.id === id)) rejected.push(job);
      interview = interview.filter((j) => j.id !== id);
    }

    updateUI();
  }
}
allBtn.addEventListener("click", function () {
  setActiveTab(allBtn);
  document.getElementById("all-jobs").classList.remove("hidden");
  document.getElementById("interview-jobs").classList.add("hidden");
  document.getElementById("rejected-jobs").classList.add("hidden");
  updateUI(); // Refresh the text
});

interviewBtn.addEventListener("click", function () {
  setActiveTab(interviewBtn);
  document.getElementById("all-jobs").classList.add("hidden");
  document.getElementById("interview-jobs").classList.remove("hidden");
  document.getElementById("rejected-jobs").classList.add("hidden");
  updateUI(); // Refresh the text
});

rejectedBtn.addEventListener("click", function () {
  setActiveTab(rejectedBtn);
  document.getElementById("all-jobs").classList.add("hidden");
  document.getElementById("interview-jobs").classList.add("hidden");
  document.getElementById("rejected-jobs").classList.remove("hidden");
  updateUI(); // Refresh the text
});
