import { Application, ApplicationRow } from "@/app/types";
import { fromApiResponse } from "./mappers";
import { supabaseAdmin } from "./supabaseAdmin";
import { getUserId } from "@/lib/auth/getUserId";

// --------------------------------------------------
// Fetch ALL applications for the logged-in user
// --------------------------------------------------
export async function getAllApplications(): Promise<Application[]> {
  const user_id = await getUserId();
  if (!user_id) throw new Error("Not authenticated");

  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
    .eq("user_id", user_id) //  IMPORTANT
    .order("created_at", { ascending: false });

  if (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch applications";
    throw new Error(message);
  }

  if (!data) {
    throw new Error("No data received from Supabase");
  }

  return data.map(fromApiResponse);
}

// --------------------------------------------------
// Fetch a single application by ID, but ONLY if it
// belongs to the logged-in user.
// --------------------------------------------------
export async function getApplication(id: string): Promise<Application> {
  const user_id = await getUserId();
  if (!user_id) throw new Error("Not authenticated");

  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id) //  SECURITY: prevent cross-user access
    .single();

  if (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch application";
    throw new Error(message);
  }

  if (!data) {
    throw new Error(`Application not found or permission denied`);
  }

  return fromApiResponse(data as ApplicationRow);
}
