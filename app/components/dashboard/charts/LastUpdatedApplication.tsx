import { getLastUpdatedApplication } from "@/app/dashboard/actions/getLastUpdatedApplication";
import { timeAgo } from "@/lib/date";

export default async function LastUpdatedApplication() {
  const application = await getLastUpdatedApplication();
  console.log(application);

  if (!application) {
    return <div>Failed retrieving the latest application.</div>;
  }

  return (
    <div>
      <h2 className="text-sm chart-title mb-2">Last Updated Application</h2>
      <p>
        Applied at <strong>{application.company}</strong> as{" "}
        <strong>{application.position}</strong>.
      </p>

      <p>Last updated: {timeAgo(application.updated_at)}</p>
    </div>
  );
}
