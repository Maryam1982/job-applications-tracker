"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

import { CHART_COLORS } from "@/app/constants/colors";
import { useIsMobile } from "@/app/hooks/useIsMobile";

interface MonthlyData {
  month: string;
  applications: number;
}

export default function MonthlyBarChart({ data }: { data: MonthlyData[] }) {
  const isMobile = useIsMobile();
  if (!data || data.length === 0)
    return (
      <div className=" flex items-center justify-center text-gray-500">
        No data to display
      </div>
    );

  return (
    <div className="aspect-2/1">
      <h2 className="text-base font-semibold tracking-tight chart-title mb-4">
        Applications per Month
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(value: string) => value.split(" ")[0]}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
            width={isMobile ? 15 : 32}
          />
          <Tooltip />
          <Bar dataKey="applications">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS.bar[index % CHART_COLORS.bar.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
