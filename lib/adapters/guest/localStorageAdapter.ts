import type { ApplicationsAPI } from "@/app/types";
import * as storage from "@/lib/guest/storage";

export const localStorageAdapter: ApplicationsAPI = {
  getAll: storage.getAllApplications,
  getById: storage.getApplicationById,
  create: storage.createApplication,
  update: storage.updateApplication,
  delete: storage.deleteApplication,
};
