"use server";

import { createClient } from "@/lib/supabase/serverClient";

export async function getTotalApplications() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("job_applications")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching total applications:", error);
    return 0;
  }

  return count ?? 0;
}
