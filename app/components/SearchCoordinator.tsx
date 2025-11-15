"use client";

import { useState } from "react";
import JobList from "./JobList";
import SelectBar from "./SelectBar";
import { Application } from "../types";
import { DateFilter } from "../constants";
import { ApplicationStatus } from "../constants";

export default function SearchCoordinator({
  applications,
}: {
  applications: Application[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("");
  const [company, setCompany] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("");

  const filteredApplications = applications
    .filter((app) => {
      if (!searchTerm) return true;

      return [app.position, app.company, app.notes ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    .filter((app) => (status ? app.status === status : true))
    .filter((app) => (company ? app.company === company : true))
    .filter((app) => {
      if (!dateFilter) return true;

      const applicationDate = new Date(app.applied_on);
      const now = new Date();

      switch (dateFilter) {
        case "Last 7 Days":
          return (
            applicationDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          );
        case "Last 30 Days":
          return (
            applicationDate >=
            new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          );
        case "This Month":
          return (
            applicationDate.getFullYear === now.getFullYear &&
            applicationDate.getMonth === now.getMonth
          );
        default:
          return true;
      }
    });

  return (
    <div>
      <SelectBar
        applications={applications}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        status={status}
        setStatus={setStatus}
        company={company}
        setCompany={setCompany}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      <JobList applications={filteredApplications} />
    </div>
  );
}
