const allJobs = [...jobListings];
let interview = [];
let rejected = [];

const interviewNum = document.getElementById("interview-no");
const rejectedNum = document.getElementById("rejected-no");
const totalCount = document.getElementById("total-count");
const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

allBtn.addEventListener("click", function () {
  allBtn.classList.add = "btn-primary";
  interviewBtn.classList.remove = "btn-success";
  rejectedBtn.classList.remove = "btn-error";
  totalCount.innerText = `${allJobs.length} jobs`;
});
interviewBtn.addEventListener("click", function () {
  allBtn.classList.remove = "btn-primary";
  interviewBtn.classList.add = "btn-success";
  rejectedBtn.classList.remove = "btn-error";
  totalCount.innerText = `${interview.length} of ${allJobs.length} jobs`;
});
rejectedBtn.addEventListener("click", function () {
  allBtn.classList.remove = "btn-primary";
  interviewBtn.classList.remove = "btn-success";
  rejectedBtn.classList.add = "btn-error";
  totalCount.innerText = `${rejected.length} of ${allJobs.length} jobs`;
});

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
  if (interviewNum) interviewNum.innerText = interview.length;
  if (rejectedNum) rejectedNum.innerText = rejected.length;
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
