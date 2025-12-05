"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

import { getStatusColor } from "@/lib/statusColors";

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
    <div className="w-full aspect-2/1 p-6 rounded-2xl bg-surface shadow hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-base font-semibold tracking-tight chart-title mb-4">
        Total Status Breakdown
      </h2>

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
            {data.map((dataItem, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getStatusColor(dataItem.status)}
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
