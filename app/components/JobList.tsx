import { Inbox } from "lucide-react";
import JobItem from "./JobItem";
import { Application } from "../types";

export default function JobList({
  applications,
}: {
  applications: Application[];
}) {
  if (!applications.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <Inbox className="w-10 h-10 mb-3" />
        <p>No applications found</p>
        <p className="text-sm mt-1">
          Click “Add Application” to create your first entry.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-8">
      {applications.map((app) => (
        <JobItem key={app.id} application={app} />
      ))}
    </div>
  );
}
