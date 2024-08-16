const url = `https://www.linkedin.com/voyager/api/voyagerJobsDashJobCards
?decorationId=com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollectionLite-80&count=7&q=jobSearch
&query=(origin:JOBS_HOME_SEARCH_CARDS,keywords:FLYR,locationUnion:(geoId:102890719),selectedFilters:(distance:List(25)),spellCorrectionEnabled:true)
&servedEventEnabled=false&start=0`;
const csrfToken = "7645530679632799790";
const bscookie =
  "v=1&202210171217457a76c57b-c16f-4b6c-8ed1-3887e1ef9632AQE-g97p5L6v345CwOFni5PqEOOHWWvT";
const liAt =
  "AQEDARqPcCIDgFHKAAABkQfpC_IAAAGReYwljE4AsRUGzCbpgk_MRBrMY30GAe2REyQA0ZmZYmeMNzNOmqbzn2Yw_22wOCGmuMXTOr2ZGLDNi4WIBoWPJ8FtmRQgr_jRIoNDJScLKWgBsng5MNvat6Au";
const cookie = `bscookie=${bscookie};  JSESSIONID="ajax:${csrfToken}";  li_at=${liAt};`;

interface Response {
  included: [];
}

fetch(url, {
  headers: {
    accept: "application/vnd.linkedin.normalized+json+2.1",
    "csrf-token": `ajax:${csrfToken}`,
    cookie: cookie,
  },
  body: null,
  method: "GET",
}).then((res) => {
  res.json().then((res) => {
    console.log(res.included);
  });
});
