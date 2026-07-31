"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { trackInteraction } from "@/lib/analytics";

type Theme = "light" | "dark";

/**
 * Theme switch.
 *
 * The active theme lives on <html> as a class, applied by an inline script in
 * the layout before paint so there is no flash of the wrong theme. This reads
 * that class as external state via useSyncExternalStore rather than mirroring
 * it into component state, which keeps the DOM the single source of truth.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// The server cannot know the visitor's preference, so it renders the light
// icon; React re-syncs immediately after hydration.
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the choice just will not persist.
    }
    trackInteraction("theme_toggle", { theme: next });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="grid size-9 shrink-0 place-items-center border border-foreground/15 text-muted-foreground transition hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" className="size-4" />
      ) : (
        <Moon aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}
