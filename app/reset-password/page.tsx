"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const [showResetRequestLink, setShowResetRequestLink] = useState(false);

  async function handleSubmit() {
    setError(null);
    setSuccess(null);

    if (!password.trim()) {
      setError("Password cannot be empty.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const supabase = createSupabaseBrowserClient();

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        const message = error.message?.toLowerCase() || "";
        console.log(message);

        if (
          message.includes("expired") ||
          message.includes("invalid") ||
          message.includes("token")
        ) {
          setError("This password reset link is invalid or has expired.");
          setShowResetRequestLink(true);
          return;
        }

        setError("Failed to update password. Please try again.");
        return;
      }

      setSuccess("Password updated successfully. Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-4 border p-6 rounded-lg w-80 bg-surface border-border-divider"
      >
        <h1 className="text-xl font-bold">Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          className="border p-2 rounded border-border-divider bg-background"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 rounded border-border-divider bg-background"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {error && <p className="text-sm text-error">{error}</p>}
        {success && <p className="text-sm text-success">{success}</p>}
        {showResetRequestLink && (
          <a
            href="/forgot-password"
            className="text-primary underline text-sm mt-2 inline-block"
          >
            Request a new password reset link
          </a>
        )}

        <button
          disabled={isPending}
          className="bg-primary hover:bg-primary-dark text-white rounded p-2"
        >
          {isPending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
