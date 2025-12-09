import {
  ApplicationCreate,
  Application,
  ApplicationRow,
  ApplicationUpdate,
} from "@/app/types";

export function toApiPayload(app: ApplicationCreate | ApplicationUpdate) {
  return {
    company_name: app.company,
    job_title: app.position,
    status: app.status,
    application_date: app.applied_on, // keep as string
    notes: app.notes ?? null,
    contract_type: app.contract_type ?? null,
    location: app.location ?? null,
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
    created_at: row.created_at,
    updated_at: row.updated_at,
    contract_type: row.contract_type ?? undefined,
    location: row.location ?? undefined,
  };
}
