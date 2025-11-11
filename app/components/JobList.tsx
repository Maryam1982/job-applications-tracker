import JobItem from "./JobItem";

import { getAllApplications } from "@/lib/api";

export default async function JobList() {
  let applications;
  try {
    applications = await getAllApplications();
  } catch (error) {
    const message =
      error instanceof Error
        ? `Failed to load applications: ${error.message}`
        : "Something went wrong while loading applications.";
    return <p className="text-center text-error mt-8">{message}</p>;
  }

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
