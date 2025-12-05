import { getLastUpdatedApplication } from "@/app/dashboard/actions/getLastUpdatedApplication";
import { timeAgo } from "@/lib/date";
import { getStatusColor } from "@/lib/statusColors";

export default async function LastUpdatedApplication() {
  const application = await getLastUpdatedApplication();

  if (!application) {
    return <div>Failed retrieving the latest application.</div>;
  }

  return (
    <div>
      <h2 className="text-base font-semibold tracking-tight chart-title mb-4">
        Last Updated Application
      </h2>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-sm `}
              style={{ backgroundColor: getStatusColor(application.status) }}
            />

            <p className="text-lg font-semibold">{application.company}</p>
          </div>

          <p className="text-gray-600 text-sm">{application.position}</p>
        </div>

        <p className="text-xs text-gray-500">
          Updated {timeAgo(application.updated_at)}
        </p>
      </div>
    </div>
  );
}
