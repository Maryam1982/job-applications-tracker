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
    <div className="w-full h-full pb-2">
      <h2 className="text-base font-semibold tracking-tight chart-title mb-4">
        Applications Sent Weekly
      </h2>
      <ResponsiveContainer width="100%" height="100%" className={"pb-4"}>
        <LineChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
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
