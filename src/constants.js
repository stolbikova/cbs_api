import dotenv from "dotenv";
dotenv.config();

export const COUNT = 20;
export const listing_url = `https://www.linkedin.com/voyager/api/voyagerJobsDashJobCards\n?decorationId=com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollectionLite-80&count=${COUNT}&q=jobSearch\n&query=(origin:JOBS_HOME_SEARCH_CARDS,locationUnion:(geoId:102890719),selectedFilters:(distance:List(25)),spellCorrectionEnabled:true)\n`;
export const job_url = (jobId) =>
  `https://www.linkedin.com/voyager/api/jobs/jobPostings/${jobId}?decorationId=com.linkedin.voyager.deco.jobs.web.shared.WebLightJobPosting-23&`;

const cookie = `bscookie=${process.env.BSCOOKIE};  JSESSIONID="ajax:${process.env.CSRF_TOKEN}";  li_at=${process.env.LI_AT};`;
export const headers = {
  accept: "application/vnd.linkedin.normalized+json+2.1",
  "csrf-token": `ajax:${process.env.CSRF_TOKEN}`,
  cookie,
};

export const redFlags = ["dutch speaking"];
export const greenFlags = ["frontend", "react", "javascript", "typescript"];
