import { MONTH_ABBR } from "@/app/constants/months";

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export function buildWeekLabel(start: Date, end: Date): string {
  const sm = MONTH_ABBR[start.getMonth()];
  const em = MONTH_ABBR[end.getMonth()];

  const sd = start.getDate();
  const ed = end.getDate();

  // Same month → "Nov 4–10"
  if (start.getMonth() === end.getMonth()) {
    return `${sm} ${sd}–${ed}`;
  }

  // Different month → "Oct 30–Nov 5"
  return `${sm} ${sd}–${em} ${ed}`;
}
