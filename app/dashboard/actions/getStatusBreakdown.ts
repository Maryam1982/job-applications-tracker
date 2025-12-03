"use server";

import { createClient } from "@/lib/supabase/serverClient";

export async function getStatusBreakdown() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job_applications")
    .select("status");

  if (error) {
    console.error("Error fetching status breakdown:", error);
    return [];
  }

  const counts: Record<string, number> = {};

  data.forEach((row) => {
    counts[row.status] = (counts[row.status] || 0) + 1;
  });

  return Object.entries(counts).map(([status, count]) => ({
    status,
    count,
  }));
}
