import { Application } from "../types";

export function createApplication(
  overrides: Partial<Application> = {}
): Application {
  return {
    id: crypto.randomUUID(),
    company: "Test Company",
    position: "Frontend Developer",
    status: "applied",
    applied_on: "2024-01-01",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    ...overrides,
  };
}
