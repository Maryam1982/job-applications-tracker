"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { MonthlyStatusRow } from "@/lib/analytics";
import { getStatusColor } from "@/lib/statusColors";

export function MonthlyStatusBarChart({ data }: { data: MonthlyStatusRow[] }) {
  // Collect every status key from every row
  const statusKeys = Array.from(
    new Set(
      data.flatMap((row) => Object.keys(row).filter((key) => key !== "month"))
    )
  );

  return (
    <div className="w-full aspect-2/1 p-4 rounded-2xl bg-surface shadow">
      <h2 className="text-sm chart-title mb-2">Monthly Status Breakdown</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {statusKeys.map((status) => (
            <Bar
              key={status}
              dataKey={status}
              stackId="a"
              fill={getStatusColor(status)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
