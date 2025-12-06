import { redirect } from "next/navigation";
import SearchCoordinator from "@/app/components/SearchCoordinator";
import { getUserServer } from "@/lib/auth/getUserServer";
import { getServerAdapter } from "@/lib/adapters";

export default async function ApplicationsPage() {
  const user = await getUserServer();
  const source: "db" | "guest" = user ? "db" : "guest";

  if (!user) {
    redirect("/guest");
    return null;
  }
  let applications;

  try {
    const adapter = await getServerAdapter();
    applications = await adapter.getAll();
  } catch (error) {
    const message =
      error instanceof Error
        ? `Failed to load applications: ${error.message}`
        : "Something went wrong while loading applications.";
    return <p className="text-center text-error mt-8">{message}</p>;
  }
  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="pt-6">
        <SearchCoordinator applications={applications} source={source} />
      </div>
    </main>
  );
}
