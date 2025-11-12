"use client";

import Link from "next/link";
import { Application } from "../types";
import { statusColorMap } from "@/lib/statusColors";
import { deleteApplication } from "@/lib/apiClient";

export default function JobItem({ application }: { application: Application }) {
  const statusColor =
    statusColorMap[application.status] || "var(--color-text-secondary)";

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmed) return;

    try {
      await deleteApplication(id);
      alert("Application deleted successfully");
      window.location.reload();
    } catch (err) {
      alert("Error deleting application");
      console.error(err);
    }
  }

  return (
    <div className="border border-border-divider p-4 rounded-md bg-surface flex justify-between font-secondary">
      <div>
        <h3 className="font-semibold">{application.company}</h3>
        <p>{application.position}</p>
        <div className="flex justify-between gap-2">
          <span className="font-normal text-border-focus">Applied on:</span>

          <p>{application.applied_on}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <span style={{ color: statusColor }}>{application.status}</span>
        <div className="flex gap-2">
          <Link href={`/edit/${application.id}`}>
            <button className="bg-secondry hover:bg-secondry-dark ">
              Edit
            </button>
          </Link>

          <button
            className="bg-slate-400 hover:bg-red-400"
            onClick={() => handleDelete(application.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
