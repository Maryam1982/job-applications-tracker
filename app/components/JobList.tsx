"use client";

import { Inbox } from "lucide-react";
import JobItem from "./JobItem";
import { Application } from "../types";
import { useState, useEffect } from "react";

interface Props {
  applications: Application[];
  source: "db" | "guest";
}

export default function JobList({ applications, source }: Props) {
  // Only used in guest mode (local deletion)
  const [items, setItems] = useState(applications);

  useEffect(() => {
    setItems(applications);
  }, [applications]);

  function handleDeleted(id: string) {
    if (source === "guest") {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
    // DB mode will refetch automatically
  }

  if (!items.length) {
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
      {items.map((app) => (
        <JobItem
          key={app.id}
          application={app}
          source={source}
          onDeleted={source === "guest" ? handleDeleted : undefined}
        />
      ))}
    </div>
  );
}
