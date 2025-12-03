"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { fromApiResponse } from "@/lib/mappers";

export async function getLastUpdatedApplication() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching last updated application:", error);
    return null;
  }

  return data ? fromApiResponse(data) : null;
}
