import { Application } from "../types";
import { statusColorMap } from "@/lib/statusColors";

export default function JobItem({ application }: { application: Application }) {
  const statusColor =
    statusColorMap[application.status] || "var(--color-text-secondary)";

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
      <span style={{ color: statusColor }}>{application.status}</span>
    </div>
  );
}
