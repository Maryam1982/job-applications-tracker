import { getTotalApplications } from "@/app/dashboard/actions/getTotalApplications";

export default async function TotalApplications() {
  const total = await getTotalApplications();

  return (
    <div>
      <h2 className="text-sm chart-title">Total Applications</h2>

      <p className="text-3xl font-bold mt-2">{total}</p>
    </div>
  );
}
