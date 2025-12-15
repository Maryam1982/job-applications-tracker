"use client";

import Link from "next/link";
import { hasGuestData } from "@/lib/guest/storage";

type AuthActionsProps = {
  loading: boolean;
  user: { id: string } | null | undefined;
  isSyncing: boolean;
  onSync: () => void;
  onSignOut: () => void;
  onNavigate?: () => void;
};

export default function AuthActions({
  loading,
  user,
  isSyncing,
  onSync,
  onSignOut,
  onNavigate,
}: AuthActionsProps) {
  if (loading) return null;

  if (!user) {
    return (
      <>
        <Link href="/login" className="text-primary" onClick={onNavigate}>
          Login
        </Link>
        <Link href="/signup" className="text-primary" onClick={onNavigate}>
          Sign Up
        </Link>
      </>
    );
  }

  return (
    <div className="flex gap-4">
      {hasGuestData() && (
        <button
          onClick={() => {
            onSync();
            onNavigate?.();
          }}
          className="px-4 py-2 bg-secondry text-white rounded hover:bg-secondry-darker"
        >
          {isSyncing ? "Syncing..." : "Sync Local Data"}
        </button>
      )}

      <button
        onClick={() => {
          onSignOut();
          onNavigate?.();
        }}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
      >
        Logout
      </button>
    </div>
  );
}
