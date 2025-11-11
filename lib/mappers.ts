import { ApplicationCreate, Application, ApplicationRow } from "@/app/types";

export function toApiPayload(app: ApplicationCreate) {
  return {
    company_name: app.company,
    job_title: app.position,
    status: app.status,
    application_date: app.applied_on, // keep as string
    notes: app.notes ?? null,
  };
}

export function fromApiResponse(row: ApplicationRow): Application {
  return {
    id: String(row.id),
    company: row.company_name,
    position: row.job_title,
    status: row.status,
    applied_on: row.application_date,
    notes: row.notes ?? undefined,
  };
}
