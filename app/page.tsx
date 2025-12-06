import Link from "next/link";
import { getUserServer } from "@/lib/auth/getUserServer";

export default async function LandingPage() {
  const user = await getUserServer();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <section className="w-full max-w-3xl px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Job Applications Tracker
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          A focused way to track applications, statuses, and progress — without
          losing clarity.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/applications" className="cta">
            View Applications
          </Link>

          {!user && (
            <Link
              href="/guest"
              className="secondry transition  hover:[text-shadow:0.4px_0_currentColor]"
            >
              Continue as Guest
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
