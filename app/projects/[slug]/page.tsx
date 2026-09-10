import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BrainCircuit,
  CircleDollarSign,
  Code2,
  Database,
  Github,
  Mic,
  Network,
  ShieldCheck,
} from "lucide-react";

import { AmbientWave } from "@/components/landing/ambient-wave";
import { CaseStudyAnalytics } from "@/components/case-study-analytics";
import { TrackedLink } from "@/components/tracked-link";
import { Button } from "@/components/ui/button";
import { getProject, projects, type Project } from "@/lib/projects";

const ICONS = {
  BrainCircuit,
  CircleDollarSign,
  Database,
  Mic,
  ShieldCheck,
  Network,
  Code2,
} as const;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Aryan Saigal`,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
    },
  };
}

function ProjectJsonLd({ project }: { project: Project }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    codeRepository: project.href,
    programmingLanguage: project.stackList,
    author: { "@type": "Person", name: "Aryan Saigal" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Icon = ICONS[project.icon];
  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="relative min-h-screen text-foreground">
      <ProjectJsonLd project={project} />
      <CaseStudyAnalytics slug={project.slug} title={project.title} />
      <div className="pointer-events-none fixed inset-0 -z-20 page-backdrop" />
      <AmbientWave />

      <div className="mx-auto w-[min(720px,calc(100%-32px))] py-16 sm:py-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-md font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> All projects
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-none bg-foreground/10">
              <Icon aria-hidden="true" className="size-7" />
            </span>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {project.tagline}
            </p>
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{project.summary}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-none">
              <TrackedLink
                href={project.href}
                target="_blank"
                rel="noreferrer"
                eventName="project_click"
                eventProperties={{ project: project.title, location: "case_study" }}
              >
                <Github aria-hidden="true" className="size-4" /> View source
              </TrackedLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none bg-background/70">
              <TrackedLink
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                eventName="resume_download"
                eventProperties={{ location: "case_study" }}
              >
                Resume
              </TrackedLink>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-foreground/10 pt-6">
            {project.stackList.map((item) => (
              <span
                key={item}
                className="border border-foreground/10 bg-card/80 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-14">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            The problem
          </h2>
          <p className="mt-4 border-l-2 border-foreground/20 pl-5 text-lg leading-8">
            {project.caseStudy.context}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The path a request takes through the system, end to end.
          </p>
          <ol className="mt-6 border-l border-foreground/15">
            {project.flow.map((stage, index) => (
              <li key={stage.step} className="relative pb-7 pl-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 grid size-6 -translate-x-1/2 place-items-center border border-foreground/15 bg-background font-mono text-[0.65rem] font-bold"
                >
                  {index + 1}
                </span>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em]">{stage.step}</p>
                <p className="mt-2 leading-7 text-muted-foreground">{stage.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        {project.caseStudy.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Why this stack</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            What each piece is actually doing here.
          </p>
          <dl className="mt-6 border-t border-foreground/10">
            {project.stackRationale.map((entry) => (
              <div
                key={entry.tech}
                className="grid gap-1 border-b border-foreground/10 py-4 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6"
              >
                <dt className="font-mono text-xs font-bold uppercase tracking-[0.12em]">{entry.tech}</dt>
                <dd className="leading-7 text-muted-foreground">{entry.role}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">At a glance</h2>
          <ul className="mt-5 space-y-3 leading-7 text-muted-foreground">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Marks the end of the body copy; the analytics component watches
            this to distinguish a read from a bounce. */}
        <div id="case-study-end" aria-hidden="true" className="h-px w-full" />

        <nav className="mt-16 border-t border-foreground/10 pt-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Next project
          </p>
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-3 flex items-center justify-between gap-4 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          >
            <span className="text-2xl font-semibold tracking-tight">{next.title}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-6 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </nav>
      </div>
    </main>
  );
}
