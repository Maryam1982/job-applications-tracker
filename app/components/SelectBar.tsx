"use client";

import { useState } from "react";
import Link from "next/link";
import { STATUS_LIST } from "../constants";
import { DATE_FILTERS } from "../constants";
import { Application } from "../types";
import { ApplicationStatus } from "../constants";
import { DateFilter } from "../constants";

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
  const companies = [
    ...new Set(applications.map((application) => application.company)),
  ];

  const [showFilter, setShowFilter] = useState(false);

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

        <Link href="/add">
          <button className="bg-primary hover:bg-primary-dark px-3 py-2 rounded-md w-full whitespace-nowrap">
            Add Application
          </button>
        </Link>
      </div>

      {/* Toggle button (mobile only) */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="block sm:hidden text-sm mt-2 bg-primary/10  toggle-filter"
      >
        {showFilter ? "▲ Hide Filters" : "▼ Show Filters"}
      </button>

      {/* Filters */}
      <div
        className={`
    flex flex-col sm:flex-row gap-2 mt-2

    /* MOBILE: animated expand/collapse */
    overflow-hidden 
    transition-all duration-300 ease-in-out
    ${showFilter ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}

    /* DESKTOP: no animation at all */
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
          {STATUS_LIST.map((item, index) => (
            <option value={item} key={index}>
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
          {companies.map((company, index) => (
            <option value={company} key={index}>
              {company}
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
          {DATE_FILTERS.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
