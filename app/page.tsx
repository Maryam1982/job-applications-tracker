import Link from "next/link";
import { getUserServer } from "@/lib/auth/getUserServer";

export default async function LandingPage() {
  const user = await getUserServer();

  return (
    <main className="min-h-screen flex pt-[15vh] justify-center bg-background">
      <section className="w-full max-w-4xl px-6 text-center">
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

        <div className="mt-16 grid gap-6 sm:grid-cols-3  text-left">
          <div className="rounded-2xl  bg-surface p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-semibold ">Track Applications</h3>
            <p className="mt-2 text-sm text-muted-foreground font-secondary ">
              Keep roles, companies, links, and statuses in one focused place.
            </p>
          </div>

          <div className="rounded-2xl  bg-surface p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-semibold">See Progress Clearly</h3>
            <p className="mt-2 text-sm text-muted-foreground font-secondary ">
              Understand where you stand without spreadsheets or guesswork.
            </p>
          </div>

          <div className="rounded-2xl  bg-surface p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
            <h3 className="font-semibold">Designed for Simplicity</h3>
            <p className="mt-2 text-sm text-muted-foreground font-secondary ">
              Minimal UI that stays out of your way while you focus on applying.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
