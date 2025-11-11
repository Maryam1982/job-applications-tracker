import {
  Application,
  ApplicationCreate,
  ApplicationRow,
  ApplicationUpdate,
} from "@/app/types";
import { toApiPayload, fromApiResponse } from "./mappers";
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

// export async function createApplication(
//   data: ApplicationCreate
// ): Promise<Application> {
//   const res = await fetch(BASE_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(toApiPayload(data)),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create application");
//   }
//   const result: ApplicationRow = await res.json();

//   return fromApiResponse(result);
// }

// export async function updateApplication(id: string, data: ApplicationUpdate) {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(toApiPayload(data as ApplicationCreate)),
//   });
//   if (!res.ok) {
//     throw new Error(`Failed to update application ${id}`);
//   }

//   const result: ApplicationRow = await res.json();
//   return fromApiResponse(result);
// }

// export async function deleteApplication(id: string) {
//   const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
//   if (!res.ok) {
//     throw new Error(`Failed to delete application ${id}`);
//   }
//   return res.json();
// }
