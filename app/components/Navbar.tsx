"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { hasGuestData } from "@/lib/guest/storage";
import { syncGuestToDatabase } from "@/lib/guest/sync";

type User = {
  id: string;
  email?: string | null;
} | null;

export default function Navbar() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!mounted) return;

        if (res.ok) {
          const json = await res.json();
          setUser(json.user ?? null);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchUser();

    function handleAuthChanged() {
      fetchUser();
    }

    window.addEventListener("auth-changed", handleAuthChanged);

    return () => {
      mounted = false;
      window.removeEventListener("auth-changed", handleAuthChanged);
    };
  }, []);

  async function handleSignOut() {
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "same-origin",
      });

      router.push("/login");
      window.dispatchEvent(new Event("auth-changed"));
    } catch (err) {
      console.error("Sign out failed", err);
      router.push("/login");
    }
  }

  async function handleSync() {
    try {
      setIsSyncing(true);
      await syncGuestToDatabase();

      // Refresh navbar state — guest data is now gone
      window.location.reload();
    } catch (err) {
      console.error("Sync failed", err);
      alert("Sync failed. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <nav className="w-full border-b border-border-divider p-4 flex justify-between items-center">
      <div className="font-bold text-lg">Job Applications Tracker</div>

      <div className="flex gap-4">
        {loading ? null : user ? (
          <>
            <div className="flex flex-row-reverse gap-4">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Logout
              </button>
              {hasGuestData() && (
                <button
                  className="px-4 py-2 bg-secondry text-white rounded hover:bg-secondry-darker"
                  onClick={handleSync}
                >
                  {isSyncing ? "Syncing..." : "Sync Local Data"}
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="text-primary">
              Login
            </Link>
            <Link href="/signup" className="text-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
