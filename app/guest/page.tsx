"use client";

import { useEffect, useState } from "react";
import SearchCoordinator from "../components/SearchCoordinator";
import { Application } from "../types";
import { getClientAdapter } from "@/lib/adapters"; // runtime factory (client-safe)

export default function GuestPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const adapter = await getClientAdapter(); // will return localStorageAdapter for guest
        const apps = await adapter.getAll();
        if (!mounted) return;
        setApplications(apps);
      } catch (err) {
        console.error("Failed to load guest applications:", err);
        if (mounted)
          setError("Failed to load guest applications from local storage.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 mb-6 rounded-md text-center text-sm">
        <strong>Guest Demo:</strong> your changes are stored only on your device
        using local storage. Log in to sync them to your real account.
      </div>

      {loading && <p className="text-center">Loading guest data...</p>}
      {error && <p className="text-center text-error">{error}</p>}

      {!loading && !error && (
        <SearchCoordinator applications={applications} source="guest" />
      )}
    </main>
  );
}
