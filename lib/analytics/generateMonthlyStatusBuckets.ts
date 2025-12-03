import { MONTH_ABBR } from "@/app/constants/months";

export interface MonthlyStatusRow {
  month: string;
  [status: string]: string | number;
}

export function generateMonthlyStatusBuckets(
  apps: { applied_on: string; status: string }[]
): MonthlyStatusRow[] {
  const buckets = new Map<string, Record<string, number>>();
  console.log("apps received from the backend:", apps);

  for (const app of apps) {
    const date = new Date(app.applied_on);
    const month = MONTH_ABBR[date.getMonth()];
    const status = app.status;

    if (!buckets.has(month)) {
      buckets.set(month, {});
    }

    const counts = buckets.get(month)!;
    counts[status] = (counts[status] ?? 0) + 1;
  }

  console.log("buckets:", buckets);

  return Array.from(
    buckets,
    ([month, counts]) =>
      ({
        month,
        ...counts,
      } as MonthlyStatusRow)
  );
}
