"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

import { CHART_COLORS } from "@/app/constants/colors";

interface StatusData {
  status: string;
  count: number;
}
type PieCompatible = {
  [key: string]: string | number;
};

export default function PieStatusChart({ data }: { data: StatusData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-60 flex items-center justify-center text-gray-500">
        No data to display
      </div>
    );
  }

  const pieData: PieCompatible[] = data.map((item) => ({
    status: item.status,
    count: item.count,
  }));

  return (
    <div className="w-full aspect-2/1 p-4 rounded-2xl bg-surface shadow">
      <h2 className="text-sm chart-title mb-2">Total Status Breakdown</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS.pie[index % CHART_COLORS.pie.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
