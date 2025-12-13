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
import { useIsMobile } from "@/app/hooks/useIsMobile";

export function MonthlyStatusBarChart({ data }: { data: MonthlyStatusRow[] }) {
  const isMobile = useIsMobile();
  // Collect every status key from every row
  const statusKeys = Array.from(
    new Set(
      data.flatMap((row) => Object.keys(row).filter((key) => key !== "month"))
    )
  );

  return (
    <div className="w-full aspect-2/1 p-6 rounded-2xl bg-surface shadow hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <h2 className="text-base font-semibold tracking-tight chart-title mb-4">
        Monthly Status Breakdown
      </h2>

      {/* 🔑 same fix as pie chart */}
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} width={isMobile ? 15 : 32} />
            <Tooltip cursor={false} />
            <Legend
              wrapperStyle={{ fontSize: 12, marginTop: isMobile ? 12 : 0 }}
            />

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
    </div>
  );
}
