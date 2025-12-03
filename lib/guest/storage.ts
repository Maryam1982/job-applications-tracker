import type { Application } from "@/app/types";
import type { ApplicationCreate, ApplicationUpdate } from "@/app/types";

// --- Storage Key ---
export const STORAGE_KEY = "guest_applications";

// --- Helpers ---
async function load(): Promise<Application[]> {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch {
    console.warn("Failed to parse guest applications.");
    return [];
  }
}

function save(apps: Application[] | null | undefined): void {
  if (!apps || !apps.length) {
    // If there's nothing to save, store an empty list
    localStorage.setItem(STORAGE_KEY, "[]");
    console.log("Inside storage.ts-save() function");
    return;
  }

  try {
    const data = JSON.stringify(apps);
    localStorage.setItem(STORAGE_KEY, data);
  } catch {
    console.warn("Failed to save applications to local storage.");
  }
}

export async function getAllApplications(): Promise<Application[]> {
  try {
    const applications = await load();
    return applications;
  } catch {
    console.warn("Failed to load applications from local storage.");
    return [];
  }
}

export async function getApplicationById(
  id: string
): Promise<Application | undefined> {
  try {
    const applications = await load();
    const result = applications.find((item) => item.id === id);
    return result;
  } catch {
    console.warn("The application was not found.");
    return undefined;
  }
}

export async function createApplication(
  data: ApplicationCreate
): Promise<Application> {
  try {
    const applications = await load();

    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const application: Application = {
      id,
      ...data,
      created_at: now,
      updated_at: now,
    };

    applications.push(application);
    save(applications);

    return application;
  } catch {
    console.warn("Failed to create a new application.");
    return {} as Application;
  }
}

export async function updateApplication(
  id: string,
  data: ApplicationUpdate
): Promise<Application | undefined> {
  try {
    const applications = await load();
    const existing = applications.find((app) => app.id === id);
    if (!existing) return undefined;

    const updated: Application = {
      ...existing,
      ...data,
    };

    const updatedList = applications.map((app) =>
      app.id === id ? updated : app
    );

    save(updatedList);
    return updated;
  } catch {
    console.warn("Failed to update application.");
    return undefined;
  }
}

export async function deleteApplication(id: string): Promise<void> {
  try {
    const applications = await load();
    const remaining = applications.filter((item) => item.id !== id);
    save(remaining);
  } catch {
    console.warn("Failed to delete the application.");
  }
}

export function deleteAll(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.warn("Failed to clear guest applications.");
  }
}

export function hasGuestData(): boolean {
  if (typeof window === "undefined") return false; // SSR safety

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0;
  } catch {
    console.warn("Failed to check local storage for guest data.");
    return false;
  }
}
