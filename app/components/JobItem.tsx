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

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    e.stopPropagation();

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

  function handleNavigate() {
    router.push(`${buildRoute("/applications")}/${application.id}`);
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleNavigate();
      }}
      className="relative border border-border-divider p-4 rounded-md bg-surface
                 flex justify-between font-secondary transition-all duration-200
                 hover:shadow-md hover:border-primary hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Left content */}
      <div className="relative z-10">
        <h3 className="font-semibold">{application.company}</h3>
        <p>{application.position}</p>

        <div className="flex flex-col sm:flex-row justify-items-start gap-1.5 sm:gap-2">
          <span className="font-normal text-border-focus">Applied on:</span>
          <p>{new Date(application.applied_on).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Right content + actions */}
      <div className="relative z-10 flex flex-col items-end justify-between min-w-[90px] sm:min-w-0">
        <span style={{ color: statusColor }} className="font-medium">
          {application.status}
        </span>

        <div className="flex gap-2">
          <Link
            href={`${buildRoute(
              `/applications/${application.id}/edit`
            )}?from=/applications`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="bg-secondry hover:bg-secondry-dark">Edit</button>
          </Link>

          <button
            className="bg-slate-400 hover:bg-red-400 disabled:opacity-50"
            onClick={(e) => handleDelete(e, application.id)}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
