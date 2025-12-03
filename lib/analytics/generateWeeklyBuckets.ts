import { buildWeekLabel } from "@/lib/date";

export interface WeeklyBucket {
  start: Date;
  end: Date;
  label: string;
  count: number;
}

export function generateWeeklyBuckets(apps: { date_applied: string }[]) {
  if (apps.length === 0) return [];

  // 1. Sort by date_applied
  const sorted = [...apps].sort(
    (a, b) =>
      new Date(a.date_applied).getTime() - new Date(b.date_applied).getTime()
  );

  const firstDate = new Date(sorted[0].date_applied);
  const lastDate = new Date(sorted[sorted.length - 1].date_applied);

  // Normalize firstDate to Monday
  const firstDay = firstDate.getDay();
  const offset = firstDay === 0 ? -6 : 1 - firstDay; // Sunday fix
  const firstMonday = new Date(firstDate);
  firstMonday.setDate(firstMonday.getDate() + offset);

  // 2. Build all buckets
  const buckets: WeeklyBucket[] = [];
  const cursor = new Date(firstMonday);

  while (cursor <= lastDate) {
    const start = new Date(cursor);
    const end = new Date(cursor);
    end.setDate(end.getDate() + 6);

    buckets.push({
      start,
      end,
      label: buildWeekLabel(start, end),
      count: 0,
    });

    cursor.setDate(cursor.getDate() + 7);
  }

  const last = buckets[buckets.length - 1];

  // If the bucket end is after the actual last application → trim
  if (last.end > lastDate) {
    last.label = buildWeekLabel(last.start, lastDate);
  }

  // 3. Categorize each application by scanning buckets (O(n * buckets) worst case, but buckets are tiny)
  for (const app of sorted) {
    const d = new Date(app.date_applied);

    for (const bucket of buckets) {
      if (d >= bucket.start && d <= bucket.end) {
        bucket.count++;
        break;
      }
    }
  }

  return buckets;
}
