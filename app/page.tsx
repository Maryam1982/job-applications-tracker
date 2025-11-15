import SearchCoordinator from "./components/SearchCoordinator";
import { getAllApplications } from "@/lib/api";

export default async function Home() {
  let applications;
  try {
    applications = await getAllApplications();
  } catch (error) {
    const message =
      error instanceof Error
        ? `Failed to load applications: ${error.message}`
        : "Something went wrong while loading applications.";
    return <p className="text-center text-error mt-8">{message}</p>;
  }
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-center text-2xl font-semibold mb-6">
        Job Applications Tracker
      </h1>
      <div className="pt-6">
        <SearchCoordinator applications={applications} />
      </div>
    </main>
  );
}
