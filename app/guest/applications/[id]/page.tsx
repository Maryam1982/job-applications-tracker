"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Field from "@/app/components/ui/Field";
import { statusColorMap } from "@/lib/statusColors";
import { getClientAdapter } from "@/lib/adapters";

import { useBuildRoute } from "@/app/hooks/useBuildRoute";
import { Application } from "@/app/types";

export default function GuestApplicationDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const router = useRouter();
  const { buildRoute } = useBuildRoute();
  const [application, setApplication] = useState<
    Application | null | undefined
  >(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Load data from localStorage
  // ------------------------------
  useEffect(() => {
    (async () => {
      try {
        const adapter = await getClientAdapter(); // localStorage adapter
        const app = await adapter.getById(id);
        setApplication(app);
      } catch (err) {
        console.error("Error loading guest application:", err);
        setApplication(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ------------------------------
  // Delete handler (client-only)
  // ------------------------------
  async function handleDelete() {
    try {
      const adapter = await getClientAdapter();
      await adapter.delete(id);
      router.push(buildRoute("/applications"));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting application");
    }
  }

  // ------------------------------
  // UI states
  // ------------------------------
  if (loading) return <div>Loading…</div>;
  if (!application) return <div>Application not found.</div>;

  const statusColor =
    statusColorMap[application.status] || "var(--color-text-secondary)";

  return (
    <main className="max-w-3xl mx-auto space-y-6 min-h-screen pt-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex flex-col">
          <h1 className="text-center text-xl font-semibold">
            Application Details
          </h1>

          <Link
            href="/guest/applications"
            className="flex gap-1 text-left text-sm text-border-focus hover:text-primary"
          >
            <ArrowLeft /> Back to applications
          </Link>
        </header>

        <article className="border border-border-divider p-4 rounded-md space-y-6">
          {/* Fields grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Company"
              value={application.company}
              className="bg-surface p-3 rounded"
            />

            <Field
              label="Position"
              value={application.position}
              className="bg-surface p-3 rounded"
            />

            {application.location && (
              <Field
                label="Location"
                value={application.location}
                className="bg-surface p-3 rounded"
              />
            )}

            {application.contract_type && (
              <Field
                label="Contract Type"
                value={application.contract_type}
                className="bg-surface p-3 rounded"
              />
            )}

            <Field
              label="Applied on"
              value={new Date(application.applied_on).toLocaleDateString()}
              className="bg-surface p-3 rounded"
            />

            {application.status && (
              <div className="bg-surface p-3 rounded flex flex-col gap-1.5">
                <span className="font-normal text-border-focus">Status</span>
                <span style={{ color: statusColor }} className="font-medium">
                  {application.status}
                </span>
              </div>
            )}

            {application.notes && (
              <Field
                label="Notes"
                value={application.notes}
                className="bg-surface p-3 rounded sm:col-span-2"
              />
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border-divider flex justify-end gap-2">
            <Link
              href={`/guest/applications/${application.id}/edit?from=/applications/${application.id}`}
            >
              <button className="px-4 py-2 rounded bg-secondry hover:bg-secondry-dark text-sm">
                Edit
              </button>
            </Link>

            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded bg-slate-400 hover:bg-red-400 text-sm"
            >
              Delete
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
