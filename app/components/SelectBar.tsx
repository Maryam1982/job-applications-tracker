"use client";

import { useState } from "react";
import Link from "next/link";

import {
  STATUS_LIST,
  DATE_FILTERS,
  ApplicationStatus,
  DateFilter,
} from "../constants";
import { Application } from "../types";
import { useBuildRoute } from "@/app/hooks/useBuildRoute";

type SelectBarProps = {
  applications: Application[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  status: ApplicationStatus;
  setStatus: (status: ApplicationStatus) => void;
  company: string;
  setCompany: (company: string) => void;
  dateFilter: DateFilter;
  setDateFilter: (dateFilter: DateFilter) => void;
};

export default function SelectBar({
  applications,
  searchTerm,
  setSearchTerm,
  status,
  setStatus,
  company,
  setCompany,
  dateFilter,
  setDateFilter,
}: SelectBarProps) {
  // Unique company list
  const companies = [...new Set(applications.map((a) => a.company))];

  const [showFilter, setShowFilter] = useState(false);
  const { buildRoute } = useBuildRoute();

  return (
    <div>
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          placeholder="Search..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-transparent bg-surface"
        />

        <Link href={buildRoute("/applications/add")}>
          <button className="bg-primary hover:bg-primary-dark px-3 py-2 rounded-md w-full whitespace-nowrap">
            Add Application
          </button>
        </Link>
      </div>

      {/* Toggle button (mobile only) */}
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="block sm:hidden text-sm mt-2 bg-primary/10 toggle-filter"
      >
        {showFilter ? "▲ Hide Filters" : "▼ Show Filters"}
      </button>

      {/* Filters */}
      <div
        className={`
          flex flex-col sm:flex-row gap-2 mt-2

          overflow-hidden 
          transition-all duration-300 ease-in-out
          ${showFilter ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}

          sm:max-h-none sm:opacity-100 sm:overflow-visible
          sm:transition-none sm:duration-0
        `}
      >
        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          className="w-full text-sm border border-transparent bg-surface"
        >
          <option value="">Status (Any)</option>
          {STATUS_LIST.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Company */}
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full text-sm border border-transparent bg-surface"
        >
          <option value="">All Companies</option>
          {companies.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Date */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as DateFilter)}
          className="w-full text-sm border border-transparent bg-surface"
        >
          <option value="">Applied (Any Date)</option>
          {DATE_FILTERS.map((df) => (
            <option value={df} key={df}>
              {df}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
