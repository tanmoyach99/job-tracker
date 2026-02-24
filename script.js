const allJobs = [...jobListings];
let interview = [];
let rejected = [];

const interviewNum = document.getElementById("interview-no");
const rejectedNum = document.getElementById("rejected-no");
const jobs = document.getElementById("all-jobs");
const interviewJobs = document.getElementById("interview-jobs");
const rejectedJobs = document.getElementById("rejected-jobs");
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
      <div class="card-body p-4 md:p-8"> <div class="flex justify-between items-start gap-2">
          <div>
            <h2 class="card-title text-xl md:text-3xl font-bold">${job.companyName}</h2>
            <h6 class="text-gray-400 text-lg md:text-xl font-bold">${job.position}</h6>
          </div>

          <button class="btn btn-outline btn-warning btn-xs md:btn-sm" onclick="handleDelete(${job.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

        <div class="flex flex-wrap gap-3 md:gap-6 list-none text-xs md:text-sm mt-2">
            <li>${job.location}</li>
            <li>${job.type}</li>
            <li>${job.salary}</li>
        </div>

        <button class="btn btn-soft btn-xs md:btn-sm w-32 md:w-36 mt-4 ${
          job.status === "Interviewing"
            ? "btn-success"
            : job.status === "Rejected"
              ? "btn-error"
              : ""
        }">${job.status}</button>

        <p class="py-2 text-sm md:text-base">${job.description}</p>
        
           <div class="card-actions sm:flex-row sm:gap-y-6 mt-auto">

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
  renderList(interview, interviewJobs, "No Interviews Scheduled");
  renderList(rejected, rejectedJobs, "No Rejected Applications");

  document.getElementById("total-no").innerText = allJobs.length;
  if (interviewNum) interviewNum.innerText = interview.length;
  if (rejectedNum) rejectedNum.innerText = rejected.length;

  const isInterviewVisible = !interviewJobs.classList.contains("hidden");
  const isRejectedVisible = !rejectedJobs.classList.contains("hidden");

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
  jobs.classList.remove("hidden");
  interviewJobs.classList.add("hidden");
  rejectedJobs.classList.add("hidden");
  updateUI(); // Refresh the text
});

interviewBtn.addEventListener("click", function () {
  setActiveTab(interviewBtn);
  jobs.classList.add("hidden");
  interviewJobs.classList.remove("hidden");
  rejectedJobs.classList.add("hidden");
  updateUI(); // Refresh the text
});

rejectedBtn.addEventListener("click", function () {
  setActiveTab(rejectedBtn);
  jobs.classList.add("hidden");
  interviewJobs.classList.add("hidden");
  rejectedJobs.classList.remove("hidden");
  updateUI(); // Refresh the text
});

function handleDelete(id) {
  const confirmDelete = confirm("Are you sure you want to delete this job?");

  if (confirmDelete) {
    const jobIndex = allJobs.findIndex((job) => job.id === id);
    if (jobIndex !== -1) {
      allJobs.splice(jobIndex, 1);
    }

    interview = interview.filter((job) => job.id !== id);
    rejected = rejected.filter((job) => job.id !== id);

    updateUI();
  }
}
