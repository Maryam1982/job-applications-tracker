"use client";

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

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {/* Search */}
      <input
        placeholder="Search..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:col-span-2 order-1"
      />

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
        className="text-sm w-full order-2"
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
        className="text-sm w-full order-3"
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
        className="text-sm w-full order-4"
      >
        <option value="">Applied (Any Date)</option>
        {DATE_FILTERS.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>

      {/* Add Application button */}
      <Link href="/add" className="order-5 sm:order-1 sm:col-span-1">
        <button className="bg-primary hover:bg-primary-dark px-3 py-2 rounded-md w-full whitespace-nowrap">
          Add Application
        </button>
      </Link>
    </div>
  );
}
