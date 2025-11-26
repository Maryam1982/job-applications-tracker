"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpAction } from "@/lib/auth/actions";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [alreadyExists, setAlreadyExists] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isPending, startTransition] = useTransition();

  async function handleSubmit() {
    const errors = { email: "", password: "" };

    if (!email.trim()) errors.email = "Email cannot be empty.";
    if (!password.trim()) errors.password = "Password cannot be empty.";

    if (errors.email || errors.password) {
      setFieldErrors(errors);
      return;
    }

    // reset
    setFieldErrors({ email: "", password: "" });
    setError(null);
    setMessage(null);
    setAlreadyExists(false);
    setIsSuccess(false);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      const result = await signUpAction(formData);

      if (!result) return;

      // **Case C — real error**
      if (result.success === false) {
        setError(result.error ?? "An unknown error occurred.");
        return;
      }

      // **Case B — privacy case**
      if (result.alreadyExists) {
        setMessage(result.message);
        setAlreadyExists(true);
        return;
      }

      // **Case A — real successful signup**
      setMessage(result.message);
      setIsSuccess(true);

      setTimeout(() => {
        router.push("/login");
        router.refresh();
        window.dispatchEvent(new Event("auth-changed"));
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
        noValidate
      >
        <h1 className="text-xl font-bold">Sign Up</h1>

        {/* Email */}
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

        {/* Password */}
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

        {/* Case A — Real success */}
        {isSuccess && message && (
          <p className="text-sm text-primary bg-green-100 p-2 rounded">
            {message} Redirecting to login...
          </p>
        )}

        {/* Case B — Email exists (links) */}
        {alreadyExists && message && (
          <div className="text-sm text-primary mt-1 flex flex-col gap-1 p-2 bg-yellow-50 rounded">
            <p>{message}</p>
            <div className="flex gap-2">
              <Link href="/login" className="underline hover:text-primary-dark">
                Log in
              </Link>
              <Link
                href="/forgot-password"
                className="underline hover:text-primary-dark"
              >
                Reset password
              </Link>
            </div>
          </div>
        )}

        {/* Case C — real error */}
        {error && <p className="text-sm text-error mt-1">{error}</p>}

        <button
          disabled={isPending}
          className="bg-primary hover:bg-primary-dark text-white rounded p-2"
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </button>

        {/* Helper links */}
        {!message && !error && (
          <div className="text-sm flex flex-col gap-1 mt-2">
            <Link href="/login" className="text-primary hover:underline">
              Already have an account? Log in
            </Link>
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
