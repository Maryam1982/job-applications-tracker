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
    <div className="flex flex-col gap-2">
      <input
        placeholder="Search..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          className="text-sm"
        >
          <option value="">All Statuses</option>
          {STATUS_LIST.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="text-sm"
        >
          <option value="">All Companies</option>
          {companies.map((company, index) => (
            <option value={company} key={index}>
              {company}
            </option>
          ))}
        </select>
        <select
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value as DateFilter);
          }}
          className="text-sm"
        >
          <option value="">Applied (Any Date)</option>
          {DATE_FILTERS.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <Link href="/add" className="w-full sm:w-auto sm:self-end">
        <button className="bg-primary hover:bg-primary-dark px-3 py-2 rounded-md w-full sm:w-auto sm:self-end">
          Add Application
        </button>
      </Link>
    </div>
  );
}
