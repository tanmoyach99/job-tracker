const jobsSection = document.getElementById("jobs");
const jobs = (jobsSection.innerHTML = jobListings.map((job) => {
  return `            <div class="card bg-base-100  w-full text-start">
  <div class="card-body ">
    <h2 class="card-title text-3xl font-bold">${job.companyName}</h2>
    <h6 class="text-gray-400 text-xl font-bold">${job.position}</h6>
    <div class="flex gap-6">
        <li>${job.location}</li>
        <li>${job.type}</li>
        <li>${job.salary}</li>
    </div>
    <button class="btn btn-soft w-36">${job.status}</button>
    <p>${job.description}</p>
   
    <div class="card-actions">
       <button class="btn btn-outline btn-success">Interview</button>
        <button class="btn btn-outline btn-error"> rejected</button>
    </div>
  </div>
</div> 
    `;
}));
