import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AmbientWave } from "@/components/landing/ambient-wave";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-20 page-backdrop" />
      <AmbientWave />

      <div className="mx-auto w-[min(720px,calc(100%-32px))] py-24">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl">
          That page does not exist.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          The link may be out of date, or the address may have a typo. Everything below still works.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 border border-foreground/15 bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to the portfolio
        </Link>

        <div className="mt-12 border-t border-foreground/10 pt-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Case studies
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm leading-7 text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
