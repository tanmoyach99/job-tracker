const allJobs = [...jobListings];
let interview = [];
let rejected = [];

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
}

updateUI();

function updateJobStatus(id, newStatus) {
  // 1. Find the job in the master array
  const job = allJobs.find((j) => j.id === id);

  if (job) {
    // 2. ONLY the status is updated here
    job.status = newStatus;

    // 3. Update the specific tracking arrays
    if (newStatus === "Interviewing") {
      // Add to interview if not there, remove from rejected
      if (!interview.some((j) => j.id === id)) interview.push(job);
      rejected = rejected.filter((j) => j.id !== id);
    } else if (newStatus === "Rejected") {
      // Add to rejected if not there, remove from interview
      if (!rejected.some((j) => j.id === id)) rejected.push(job);
      interview = interview.filter((j) => j.id !== id);
    }

    // 4. Refresh the UI
    updateUI();
  }
}
