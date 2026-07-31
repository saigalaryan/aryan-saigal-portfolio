"use client";

import { useEffect, useRef } from "react";

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * The final value is rendered server-side and written into the DOM directly
 * during the animation, so the real number is always present for search
 * engines, screen readers, and anyone with JS disabled or reduced motion on.
 */
export function CountUp({
  value,
  duration = 900,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();

        const step = (now: number) => {
          if (!start) start = now;
          const t = Math.min(1, (now - start) / duration);
          // easeOutCubic: fast then settling, which reads as deliberate.
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(eased * value));
          if (t < 1) frame = requestAnimationFrame(step);
        };

        el.textContent = "0";
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
