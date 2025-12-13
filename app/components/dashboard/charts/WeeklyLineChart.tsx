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
import { useIsMobile } from "@/app/hooks/useIsMobile";

interface Props {
  data: WeeklyBucket[];
}

export default function WeeklyLineChart({ data }: Props) {
  const isMobile = useIsMobile();
  return (
    <div className="w-full h-full pb-2">
      <h2 className="text-base font-semibold tracking-tight chart-title mb-4">
        Applications Sent Weekly
      </h2>
      <ResponsiveContainer width="100%" height="100%" className={"pb-4"}>
        <LineChart
          data={data}
          margin={{
            top: 8,
            right: 8,
            bottom: isMobile ? 0 : 8,
            left: isMobile ? 0 : 8,
          }}
        >
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
            width={isMobile ? 15 : 32}
          />
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
