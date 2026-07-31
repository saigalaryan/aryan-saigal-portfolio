"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AmbientWave } from "@/components/landing/ambient-wave";
import { RotateCcw } from "lucide-react";

/**
 * Route-level error boundary. Keeps a runtime failure inside the site's own
 * visual language and gives the visitor a way forward instead of Next's
 * default error screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] unhandled route error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-20 page-backdrop" />
      <AmbientWave />

      <div className="mx-auto w-[min(720px,calc(100%-32px))] py-24">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Something broke
        </p>
        <h1 className="mt-4 font-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl">
          This page failed to load.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Trying again usually clears it. If it keeps happening, reach me at{" "}
          <a
            href="mailto:saigalaryan03@gmail.com"
            className="underline underline-offset-4 hover:text-foreground"
          >
            saigalaryan03@gmail.com
          </a>
          .
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 border border-foreground/15 bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          >
            <RotateCcw aria-hidden="true" className="size-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center border border-foreground/15 px-5 py-3 text-sm font-semibold transition hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          >
            Back to the portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
