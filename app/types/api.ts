import type {
  Application,
  ApplicationCreate,
  ApplicationUpdate,
} from "@/app/types";

export interface ApplicationsAPI {
  getAll(): Promise<Application[]>;
  getById(id: string): Promise<Application | null | undefined>;
  create(data: ApplicationCreate): Promise<Application>;
  update(
    id: string,
    data: ApplicationUpdate
  ): Promise<Application | null | undefined>;
  delete(id: string): Promise<void>;
}
