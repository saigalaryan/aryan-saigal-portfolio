import { describe, expect, it } from "vitest";

import { getProject, projects } from "@/lib/projects";

const ICON_NAMES = [
  "BrainCircuit",
  "Database",
  "Mic",
  "ShieldCheck",
  "Network",
  "Code2",
  "CircleDollarSign",
];

describe("projects data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("has unique slugs and repos", () => {
    const slugs = projects.map((p) => p.slug);
    const repos = projects.map((p) => p.repo);
    expect(new Set(slugs).size, "duplicate slug").toBe(slugs.length);
    expect(new Set(repos).size, "duplicate repo").toBe(repos.length);
  });

  it("uses URL-safe slugs", () => {
    for (const project of projects) {
      expect(project.slug, project.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("declares an icon the pages can actually resolve", () => {
    // The page components map this string to a component; an unknown name
    // renders `undefined` as a JSX tag and crashes the route.
    for (const project of projects) {
      expect(ICON_NAMES, project.slug).toContain(project.icon);
    }
  });

  it("has every required text field populated", () => {
    for (const project of projects) {
      for (const field of ["title", "tagline", "domain", "summary", "stack"] as const) {
        expect(project[field].trim().length, `${project.slug}.${field}`).toBeGreaterThan(0);
      }
    }
  });

  it("has non-empty highlights, stack list, flow and rationale", () => {
    for (const project of projects) {
      expect(project.highlights.length, `${project.slug}.highlights`).toBeGreaterThan(0);
      expect(project.stackList.length, `${project.slug}.stackList`).toBeGreaterThan(0);
      expect(project.flow.length, `${project.slug}.flow`).toBeGreaterThan(1);
      expect(project.stackRationale.length, `${project.slug}.stackRationale`).toBeGreaterThan(0);
    }
  });

  it("has a complete case study for every project", () => {
    for (const project of projects) {
      expect(project.caseStudy.context.trim().length, project.slug).toBeGreaterThan(0);
      expect(project.caseStudy.sections.length, project.slug).toBeGreaterThan(0);
      for (const section of project.caseStudy.sections) {
        expect(section.heading.trim().length, `${project.slug}: heading`).toBeGreaterThan(0);
        expect(section.body.length, `${project.slug}: ${section.heading}`).toBeGreaterThan(0);
        for (const paragraph of section.body) {
          expect(paragraph.trim().length, `${project.slug}: ${section.heading}`).toBeGreaterThan(0);
        }
      }
    }
  });

  it("has no empty flow or rationale entries", () => {
    for (const project of projects) {
      for (const stage of project.flow) {
        expect(stage.step.trim().length, project.slug).toBeGreaterThan(0);
        expect(stage.detail.trim().length, `${project.slug}: ${stage.step}`).toBeGreaterThan(0);
      }
      for (const entry of project.stackRationale) {
        expect(entry.tech.trim().length, project.slug).toBeGreaterThan(0);
        expect(entry.role.trim().length, `${project.slug}: ${entry.tech}`).toBeGreaterThan(0);
      }
    }
  });

  it("points every repo link at a real https GitHub URL", () => {
    for (const project of projects) {
      expect(project.href, project.slug).toMatch(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/);
    }
  });

  it("resolves known slugs and rejects unknown ones", () => {
    for (const project of projects) {
      expect(getProject(project.slug)?.slug).toBe(project.slug);
    }
    expect(getProject("does-not-exist")).toBeUndefined();
  });
});

