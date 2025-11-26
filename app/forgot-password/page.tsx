"use client";

import { useState, useTransition } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    setMessage(null);
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createSupabaseBrowserClient();

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
          console.error("Reset password error:", error);
          setError("Something went wrong. Please try again.");
          return;
        }

        setMessage(
          "If an account exists for this email, you will receive a password reset link."
        );
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Unexpected error occurred. Please try again.");
      }
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
        <h1 className="text-xl font-bold">Forgot Password</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded border-border-divider bg-background"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {error && <p className="text-sm text-error">{error}</p>}
        {message && <p className="text-sm text-success">{message}</p>}

        <button
          disabled={isPending}
          className="bg-primary hover:bg-primary-dark text-white rounded p-2 disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
