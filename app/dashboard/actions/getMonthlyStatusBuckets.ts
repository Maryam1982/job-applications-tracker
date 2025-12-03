"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { generateMonthlyStatusBuckets } from "@/lib/analytics";

export async function getMonthlyStatusBuckets() {
  const supabase = await createClient();

  const { data: rows } = await supabase
    .from("job_applications")
    .select("application_date, status");

  const normalized =
    rows?.map((row) => ({
      applied_on: row.application_date,
      status: row.status,
    })) ?? [];

  return generateMonthlyStatusBuckets(normalized);
}
