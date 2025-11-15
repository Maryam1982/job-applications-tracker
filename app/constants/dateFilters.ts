export const DATE_FILTERS = [
  "All Dates",
  "Last 7 Days",
  "Last 30 Days",
  "This Month",
] as const;

export type DateFilter = "" | (typeof DATE_FILTERS)[number];
