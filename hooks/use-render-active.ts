"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Gates an animation loop so it only runs when it can actually be seen.
 *
 * Returns a ref to attach to the element being animated, plus an `active`
 * flag that is true only while that element is on screen, the tab is
 * visible, and the user has not asked for reduced motion. Canvas and WebGL
 * loops key off this so scrolled-past or backgrounded animations cost
 * nothing instead of burning a core forever.
 */
export function useRenderActive<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => setActive(onScreen && !document.hidden && !reduced.matches);

    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      // Start a little before it scrolls into view so there is no visible
      // pop-in when the loop spins up.
      { rootMargin: "150px" },
    );
    observer.observe(node);

    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return { ref, active };
}
