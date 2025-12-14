"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { syncGuestToDatabase } from "@/lib/guest/sync";
import MobileMenuButton from "./MobileMenuButton";
import NavLinks from "./NavLinks";
import AuthActions from "./AuthActions";

type User = {
  id: string;
  email?: string | null;
} | null;

export default function Navbar() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // <-- ACTIVE ROUTE

  // Fetch user
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
      window.location.reload();
    } catch (err) {
      console.error("Sync failed", err);
      alert("Sync failed. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  }

  // Active-link styling
  const isDashboard = pathname === "/dashboard";
  const isApplications = pathname === "/applications";

  return (
    <nav className="w-full border-b border-border-divider p-4 flex flex-col sm:flex-row justify-between items-center">
      {/* LEFT — Logo */}
      <Link href="/" className="font-bold text-lg hover:text-primary">
        Job Applications Tracker
      </Link>

      {/* MOBILE MENU BUTTON (controller) */}
      <MobileMenuButton
        open={mobileOpen}
        onToggle={() => setMobileOpen((prev) => !prev)}
      />

      {/* MENU CONTENT (controlled) */}
      <div
        className={`flex flex-col sm:flex-row items-center gap-8 ${
          mobileOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        {!loading && user && (
          <NavLinks
            isDashboard={isDashboard}
            isApplications={isApplications}
            onNavigate={() => setMobileOpen(false)}
          />
        )}

        <AuthActions
          loading={loading}
          user={user}
          isSyncing={isSyncing}
          onSync={handleSync}
          onSignOut={handleSignOut}
          onNavigate={() => setMobileOpen(false)}
        />
      </div>
    </nav>
  );
}
