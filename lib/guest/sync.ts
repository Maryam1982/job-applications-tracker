import {
  getAllApplications as getGuestApps,
  deleteAll as clearGuest,
  STORAGE_KEY,
} from "./storage";
import { createApplication as createDbApplication } from "../apiClient";
import type { ApplicationCreate } from "@/app/types";

export function hasGuestData(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function clearGuestData(): void {
  clearGuest();
}

export async function syncGuestToDatabase(): Promise<void> {
  try {
    const applications = await getGuestApps();
    if (applications.length === 0) return;

    for (const app of applications) {
      try {
        const payload: ApplicationCreate = {
          company: app.company,
          position: app.position,
          status: app.status,
          applied_on: app.applied_on,
          notes: app.notes,
        };

        await createDbApplication(payload);
      } catch (err) {
        console.warn("Failed to sync one application:", err);
      }
    }

    clearGuestData();
    alert("Syncing data was successful.");
  } catch (err) {
    console.error("Sync failed.", err);
    throw err;
  }
}
