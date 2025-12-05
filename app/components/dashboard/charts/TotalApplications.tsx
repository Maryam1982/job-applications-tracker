import { getTotalApplications } from "@/app/dashboard/actions/getTotalApplications";

export default async function TotalApplications() {
  const total = await getTotalApplications();

  return (
    <div>
      <h2 className="text-base font-semibold tracking-tight chart-title mb-4">
        Total Applications
      </h2>

      <p className="text-5xl font-bold mt-2">{total}</p>
    </div>
  );
}
