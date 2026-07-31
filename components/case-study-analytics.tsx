"use client";

import { useEffect, useRef } from "react";

import { trackInteraction } from "@/lib/analytics";

/**
 * Records that a case study was opened, and separately whether it was actually
 * read to the end. A view alone does not tell you if the page landed; the
 * completion signal does.
 */
export function CaseStudyAnalytics({ slug, title }: { slug: string; title: string }) {
  const completed = useRef(false);

  useEffect(() => {
    trackInteraction("case_study_view", { slug, title });

    const sentinel = document.getElementById("case-study-end");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || completed.current) return;
        completed.current = true;
        trackInteraction("case_study_read", { slug, title });
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [slug, title]);

  return null;
}
