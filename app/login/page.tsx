"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInAction } from "@/lib/auth/actions";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/";

  async function handleSubmit() {
    // ---- CLIENT-SIDE VALIDATION ----
    const errors = { email: "", password: "" };

    if (!email.trim()) errors.email = "Email cannot be empty.";
    if (!password.trim()) errors.password = "Password cannot be empty.";

    // If errors exist → stop
    if (errors.email || errors.password) {
      setFieldErrors(errors);
      return;
    }

    // Clear previous field errors
    setFieldErrors({ email: "", password: "" });
    setError(null);

    // ---- BUILD FormData MANUALLY ----
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    // ---- SERVER ACTION ----
    startTransition(async () => {
      const result = await signInAction(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push(redirectedFrom);
      router.refresh();
      window.dispatchEvent(new Event("auth-changed"));
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
        noValidate
      >
        <h1 className="text-xl font-bold">Login</h1>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded border-border-divider bg-background"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors({ ...fieldErrors, email: "" });
            }}
            required
          />
          {fieldErrors.email && (
            <p className="text-sm text-error mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded border-border-divider bg-background"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors({ ...fieldErrors, password: "" });
            }}
            required
          />
          {fieldErrors.password && (
            <p className="text-sm text-error mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {error && (
          <div className="flex flex-col mt-1">
            <p className="text-sm text-error">{error}</p>
            <a
              href="/forgot-password"
              className="text-primary underline text-sm mt-1"
            >
              Forgot your password?
            </a>
          </div>
        )}

        <button
          disabled={isPending}
          className="bg-primary hover:bg-primary-dark text-white rounded p-2"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
