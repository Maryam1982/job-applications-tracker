import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Field from "@/app/components/ui/Field";
import { getApplication } from "@/lib/api";
import { deleteApplicationAction } from "./actions";
import { statusColorMap } from "@/lib/statusColors";

type ApplicationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ApplicationDetailPage({
  params,
}: ApplicationDetailPageProps) {
  const { id } = await params;

  const application = await getApplication(id);

  {
    /*TODO: Refactor this into a helper function which receives status and returns color */
  }
  const statusColor =
    statusColorMap[application.status] || "var(--color-text-secondary)";

  return (
    <main className="max-w-3xl mx-auto space-y-6 min-h-screen pt-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex flex-col ">
          <h1 className="text-center text-xl font-semibold">
            Application Details
          </h1>

          <Link
            href="/applications"
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

            {/* TODO:
                after initial tests are developed status will also use Field component
                (some modifications are needed inside Field)
            */}
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
              href={`/applications/${application.id}/edit?from=/applications/${application.id}`}
            >
              <button className="px-4 py-2 rounded bg-secondry hover:bg-secondry-dark text-sm">
                Edit
              </button>
            </Link>

            <form action={deleteApplicationAction.bind(null, application.id)}>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-slate-400 hover:bg-red-400 text-sm"
              >
                Delete
              </button>
            </form>
          </div>
        </article>
      </div>
    </main>
  );
}
