import { detectLanguage, containsAnyFlag } from "./helpers.js";
import {
  listing_url,
  job_url,
  headers,
  greenFlags,
  redFlags,
} from "./constants.js";

async function fetchJob(jobId) {
  try {
    const url = job_url(jobId);
    const res = await fetch(url, {
      headers: headers,
      body: null,
      method: "GET",
    });

    if (!res.ok) throw new Error(`Failed to fetch job ${jobId}`);
    const jsonRes = await res.json();

    const {
      title,
      workRemoteAllowed,
      applyMethod,
      formattedLocation,
      jobPostingId,
    } = jsonRes.data;
    const jobData = {
      text: jsonRes.data.description.text,
      title,
      workRemoteAllowed,
      applyMethod,
      formattedLocation,
      jobPostingId,
    };

    return jobData;
  } catch (error) {
    console.error(`Error fetching job ${jobId}:`, error);
    return null;
  }
}

async function fetchJobs(filtrationLevel) {
  try {
    const res = await fetch(listing_url, {
      headers: headers,
      body: null,
      method: "GET",
    });
    const jsonData = await res.json();

    const { included } = jsonData;

    const urns = included
      .filter((item) => item.entityUrn.includes("jobPosting"))
      .map((item) => item.entityUrn);

    const numbers = urns.map((str) => {
      const match = str.match(/\d+/);
      return match ? match[0] : null;
    });

    const jobs = await Promise.all(numbers.map((id) => fetchJob(id)));

    // Filter out null values (non-relevant jobs)
    const relevantJobs = jobs.filter((jobData) => {
      const isAmsterdam = jobData.formattedLocation.includes("Amsterdam");
      if (
        filtrationLevel > 0 &&
        detectLanguage(jobData.text) === "English" &&
        isAmsterdam
      ) {
        if (filtrationLevel > 1) {
          // Check if the job has any green flags in the text or title
          const hasGreenFlags = containsAnyFlag(jobData.text, greenFlags);

          // Check if the job has any red flags in the text or title
          const hasRedFlags =
            containsAnyFlag(jobData.text, redFlags) ||
            containsAnyFlag(jobData.title, redFlags);

          return hasGreenFlags && !hasRedFlags;
        } else return false;
      }
    });

    return relevantJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

fetchJobs(1);

// Easy apply
// fetch(
//   "https://www.linkedin.com/voyager/api/voyagerJobsDashOnsiteApplyApplication?action=submitApplication",
//   {
//     headers: {
//       "csrf-token": `ajax:${csrfToken}`,
//       cookie,
//     },
//     body: JSON.stringify(body),
//     method: "POST",
//   }
// ).then(async (res) => {
//   const json = await res.json();
//   console.log("----> ", json);
// });
