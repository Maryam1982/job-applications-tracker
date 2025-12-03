"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { WeeklyBucket } from "@/lib/analytics";
import { CHART_COLORS } from "@/app/constants/colors";

interface Props {
  data: WeeklyBucket[];
}

export default function WeeklyLineChart({ data }: Props) {
  return (
    <div className="w-full h-full">
      <h2 className="text-sm chart-title mb-2">Applications Sent Weekly</h2>
      <ResponsiveContainer width="100%" height="100%" className={"pb-4"}>
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke={CHART_COLORS.line[0]}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
