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
    <div className="p-6 md:p-8 space-y-6">
      <div
        className="
          grid gap-6
          grid-cols-1
          md:grid-cols-3
          
        "
      >
        <div className="rounded-xl p-6 bg-surface shadow hover:shadow-lg transition-shadow duration-200">
          <TotalApplications />
        </div>

        <div className="rounded-xl p-6 bg-surface shadow md:col-span-2 md:row-span-2 aspect-3/1 hover:shadow-lg transition-shadow duration-200">
          <MonthlyBarChart data={monthlyApplications} />
        </div>

        <div className="rounded-xl p-6 bg-surface shadow hover:shadow-lg transition-shadow duration-200">
          <LastUpdatedApplication />
        </div>
      </div>

      <div className="rounded-xl p-6 bg-surface shadow h-[clamp(240px,28vw,360px)] hover:shadow-lg transition-shadow duration-200 ">
        <WeeklyLineChart data={weeklyLineChart} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <PieStatusChart data={statusBreakdown} />

        <MonthlyStatusBarChart data={monthlyStatusBarChart} />
      </div>
    </div>
  );
}
