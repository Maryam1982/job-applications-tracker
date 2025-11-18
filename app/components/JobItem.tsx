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
    <div
      className="border border-border-divider p-4 rounded-md bg-surface flex justify-between font-secondary flex-nowrap transition-all duration-200 
  hover:shadow-md hover:border-primary hover:-translate-y-0.5"
    >
      <div>
        <h3 className="font-semibold">{application.company}</h3>
        <p>{application.position}</p>
        <div className="flex flex-col sm:flex-row justify-between gap-1.5 sm:gap-2">
          <span className="font-normal text-border-focus ">Applied on:</span>

          <p>{application.applied_on}</p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between min-w-[90px] sm:min-w-0">
        <span style={{ color: statusColor }} className="font-medium">
          {application.status}
        </span>
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
