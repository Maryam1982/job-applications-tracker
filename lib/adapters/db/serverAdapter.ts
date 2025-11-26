import { getAllApplications, getApplication } from "@/lib/api";
import type { ApplicationsAPI } from "@/app/types";

export const dbServerAdapter: ApplicationsAPI = {
  getAll: getAllApplications,
  getById: getApplication,
  create: async () => {
    throw new Error("create must be called on client");
  },
  update: async () => {
    throw new Error("update must be called on client");
  },
  delete: async () => {
    throw new Error("delete must be called on client");
  },
};
