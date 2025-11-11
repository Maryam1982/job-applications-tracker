export interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  applied_on: string;
  notes?: string;
}

export interface ApplicationRow {
  id: string; // UUID
  company_name: string;
  job_title: string;
  status: string;
  application_date: string; // e.g. "2025-11-10" from the DB
  notes?: string | null;
}

export type ApplicationCreate = Omit<Application, "id">;
export type ApplicationUpdate = Partial<ApplicationCreate>;
