interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  applied_on: Date;
  notes?: string;
}

const BASE_URL = "/api/applications";

export async function getAllApplications(): Promise<Application[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  return res.json();
}

export async function getApplication(id: string): Promise<Application> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch application ${id}`);
  }

  return res.json();
}

export async function createApplication(
  data: Omit<Application, "id">
): Promise<Application> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create application");
  }
  const result: Application = await res.json();

  return result;
}

export async function updateApplication(
  id: string,
  data: Partial<Application>
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to update application ${id}`);
  }
  return res.json();
}

export async function deleteApplication(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Failed to delete application ${id}`);
  }
  return res.json();
}
