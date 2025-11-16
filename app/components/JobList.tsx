import JobItem from "./JobItem";

import { Application } from "../types";

export default function JobList({
  applications,
}: {
  applications: Application[];
}) {
  if (!applications.length) {
    return <p className="text-center mt-8">No applications found.</p>;
  }

  return (
    <div className="flex flex-col gap-4 mt-8">
      {applications.map((app) => (
        <JobItem key={app.id} application={app} />
      ))}
    </div>
  );
}
