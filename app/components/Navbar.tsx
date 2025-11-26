"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  id: string;
  email?: string | null;
} | null;

export default function Navbar() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
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

  return (
    <nav className="w-full border-b border-border-divider p-4 flex justify-between items-center">
      <div className="font-bold text-lg">Job Applications Tracker</div>

      <div className="flex gap-4">
        {loading ? null : user ? (
          <>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Logout
            </button>
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
