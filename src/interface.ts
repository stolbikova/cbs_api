interface IncludedItem {
  entityUrn: string;
}

export interface Response {
  included: IncludedItem[];
}

export interface JobsData {
  text: string;
  title: string;
  workRemoteAllowed: string;
  applyMethod: string;
  formattedLocation: string;
  jobPostingId: string;
}
