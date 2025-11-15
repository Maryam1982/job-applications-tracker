import { Application, ApplicationRow } from "@/app/types";
import { fromApiResponse } from "./mappers";
import { supabaseAdmin } from "./supabaseAdmin";

export async function getAllApplications(): Promise<Application[]> {
  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
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

export async function getApplication(id: string): Promise<Application> {
  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch application";
    throw new Error(message);
  }

  if (!data) {
    throw new Error(`No application found with ID ${id}`);
  }

  return fromApiResponse(data as ApplicationRow);
}
