export const STATUS_LIST = [
  "Applied",
  "More Information Requested",
  "Phone Interview",
  "Technical Interview",
  "Offer Received",
  "Rejected",
  "No Response",
] as const;

export type ApplicationStatus = "" | (typeof STATUS_LIST)[number];
