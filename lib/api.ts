import { Application, ApplicationRow } from "@/app/types";
import { fromApiResponse } from "./mappers";
import { supabaseAdmin } from "./supabaseAdmin";

const BASE_URL = "/api/applications";

export async function getAllApplications(): Promise<Application[]> {
  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
    .order("id", { ascending: false });

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
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch application ${id}`);
  }

  const row: ApplicationRow = await res.json();
  return fromApiResponse(row);
}
