import {
  createApplication,
  updateApplication,
  deleteApplication,
} from "@/lib/apiClient";
import type { ApplicationsAPI } from "@/app/types";

export const clientAdapter: ApplicationsAPI = {
  getAll: async () => {
    throw new Error("getAll must be called on the server");
  },
  getById: async () => {
    throw new Error("getById must be called on the server");
  },
  create: createApplication,
  update: updateApplication,
  delete: deleteApplication,
};
