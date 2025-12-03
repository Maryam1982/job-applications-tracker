"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { MONTH_ABBR } from "@/app/constants/months";

export async function getMonthlyApplications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job_applications")
    .select("id, application_date")
    .order("application_date", { ascending: true });

  if (error) {
    console.error("Failed to load monthly applications,", error);
    return [];
  }

  const counts: Record<string, number> = {};

  data.forEach((row) => {
    const date = new Date(row.application_date);
    const monthName = MONTH_ABBR[date.getMonth()];
    const year = date.getFullYear();

    const key = `${monthName} ${year}`;

    counts[key] = (counts[key] || 0) + 1;
  });

  return Object.keys(counts)
    .sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");

      if (yearA !== yearB) {
        return Number(yearA) - Number(yearB);
      }

      const monthIndexA = MONTH_ABBR.findIndex((m) => m === monthA);
      const monthIndexB = MONTH_ABBR.findIndex((m) => m === monthB);

      return monthIndexA - monthIndexB;
    })
    .map((month) => ({
      month,
      applications: counts[month],
    }));
}
