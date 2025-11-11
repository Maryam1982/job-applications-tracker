import JobList from "./components/JobList";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-center text-2xl font-semibold mb-6">
        Job Applications Tracker
      </h1>
      <JobList />
    </main>
  );
}
