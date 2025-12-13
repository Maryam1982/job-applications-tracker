"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Application } from "../types";
import { statusColorMap } from "@/lib/statusColors";
import { getClientAdapter } from "@/lib/adapters";
import { useBuildRoute } from "@/app/hooks/useBuildRoute";

interface Props {
  application: Application;
  source: "db" | "guest";
  onDeleted?: (id: string) => void;
}

export default function JobItem({ application, onDeleted }: Props) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { buildRoute } = useBuildRoute();

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const adapter = await getClientAdapter();
      await adapter.delete(id);

      if (onDeleted) {
        onDeleted(id);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting application");
    } finally {
      setDeleting(false);
    }
  }

  const statusColor =
    statusColorMap[application.status] || "var(--color-text-secondary)";

  return (
    <article
      className="relative border border-border-divider p-4 rounded-md bg-surface
                 flex justify-between font-secondary transition-all duration-200
                 hover:shadow-md hover:border-primary hover:-translate-y-0.5"
    >
      {/* ✅ Stretched link: makes whole card clickable */}
      <Link
        href={`${buildRoute("/applications")}/${application.id}`}
        aria-label={`View application ${application.company}`}
        className="absolute inset-0 z-0"
      >
        <span className="sr-only">Open application {application.company}</span>
      </Link>

      {/* ✅ Left content (above overlay) */}
      <div className="relative z-10">
        <h3 className="font-semibold">{application.company}</h3>
        <p>{application.position}</p>

        <div className="flex flex-col sm:flex-row justify-items-start gap-1.5 sm:gap-2">
          <span className="font-normal text-border-focus">Applied on:</span>
          <p>{new Date(application.applied_on).toLocaleDateString()}</p>
        </div>
      </div>

      {/* ✅ Right content + actions (above overlay) */}
      <div className="relative z-10 flex flex-col items-end justify-between min-w-[90px] sm:min-w-0">
        <span style={{ color: statusColor }} className="font-medium">
          {application.status}
        </span>

        <div className="flex gap-2">
          <Link
            href={`${buildRoute(
              `/applications/${application.id}/edit`
            )}?from=/applications`}
          >
            <button className="bg-secondry hover:bg-secondry-dark">Edit</button>
          </Link>

          <button
            className="bg-slate-400 hover:bg-red-400 disabled:opacity-50"
            onClick={() => handleDelete(application.id)}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
