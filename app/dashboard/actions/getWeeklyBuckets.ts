"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { generateWeeklyBuckets } from "@/lib/analytics";

export async function getWeeklyBuckets() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job_applications")
    .select("application_date")
    .order("application_date", { ascending: true });

  if (error) {
    console.error("Error fetching weekly buckets:", error);
    return [];
  }

  const apps = (data ?? []).map((row) => ({
    date_applied: row.application_date,
  }));

  return generateWeeklyBuckets(apps);
}
