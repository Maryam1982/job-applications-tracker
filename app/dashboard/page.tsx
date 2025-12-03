import { getMonthlyApplications } from "./actions/getMonthlyApplications";
import { getStatusBreakdown } from "./actions/getStatusBreakdown";
import { getWeeklyBuckets } from "./actions/getWeeklyBuckets";
import { getMonthlyStatusBuckets } from "./actions/getMonthlyStatusBuckets";
import MonthlyBarChart from "../components/dashboard/charts/MonthlyBarChart";
import LastUpdatedApplication from "../components/dashboard/charts/LastUpdatedApplication";
import TotalApplications from "../components/dashboard/charts/TotalApplications";
import PieStatusChart from "../components/dashboard/charts/PieStatusChart";
import WeeklyLineChart from "../components/dashboard/charts/WeeklyLineChart";
import { MonthlyStatusBarChart } from "../components/dashboard/charts/MonthlyStatusBarChart";

export default async function DashboardPage() {
  const monthlyApplications = await getMonthlyApplications();
  const statusBreakdown = await getStatusBreakdown();
  const weeklyLineChart = await getWeeklyBuckets();
  const monthlyStatusBarChart = await getMonthlyStatusBuckets();

  return (
    <div className="p-6 space-y-6">
      {/* TOP GRID */}
      <div
        className="
          grid gap-4
          grid-cols-1
          md:grid-cols-3
          
        "
      >
        {/* Left Column — Top Card */}
        <div className="rounded-xl p-4 bg-surface shadow">
          <TotalApplications />
        </div>

        {/* Right Column — Big Chart spanning 2 rows */}
        <div className="rounded-xl p-4 bg-surface shadow md:col-span-2 md:row-span-2 aspect-3/1">
          <MonthlyBarChart data={monthlyApplications} />
        </div>

        {/* Left Column — Bottom Card */}
        <div className="rounded-xl p-4 bg-surface shadow">
          <LastUpdatedApplication />
        </div>
      </div>

      {/* MIDDLE — Weekly Linechart full width */}
      <div className="rounded-xl p-4 bg-surface shadow aspect-3/1">
        <WeeklyLineChart data={weeklyLineChart} />
      </div>

      {/* BOTTOM — two charts side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <PieStatusChart data={statusBreakdown} />

        <MonthlyStatusBarChart data={monthlyStatusBarChart} />
      </div>
    </div>
  );
}
