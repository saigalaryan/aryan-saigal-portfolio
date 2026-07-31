"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const loadFrame = window.requestAnimationFrame(() => {
      document.body.classList.add("is-page-loaded");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.1) return;
          entry.target.classList.add("is-visible");
          // will-change pins a compositor layer for as long as it is set.
          // Release it once the reveal has played and stop observing, so
          // dozens of layers are not kept alive for the whole session.
          (entry.target as HTMLElement).style.willChange = "auto";
          observer.unobserve(entry.target);
        });
      },
      // A full viewport of lead time in each direction. The reveal then
      // finishes before the element is actually scrolled to, so content is
      // already painted when you arrive at it. Triggering close to the
      // viewport made the page feel like it was rendering slowly.
      { threshold: 0, rootMargin: "900px 0px 900px 0px" },
    );

    revealItems.forEach((item, index) => {
      // Short stagger only. A long one compounds with the transition and
      // leaves later items visibly lagging behind the scroll.
      item.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 28}ms`);
      observer.observe(item);
    });

    if (reduceMotion) {
      return () => {
        observer.disconnect();
        window.cancelAnimationFrame(loadFrame);
      };
    }

    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const scrollSections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));

    let frame = 0;
    let wheelClear = 0;
    let lastScrollY = window.scrollY;
    let lastDirection = 0;

    const updateParallax = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const direction = scrollY >= lastScrollY ? 1 : -1;
      lastScrollY = scrollY;

      // Mutating classes on <body> invalidates style for the entire
      // document, so only touch them when the direction actually flips
      // rather than on every frame.
      if (direction !== lastDirection) {
        lastDirection = direction;
        document.documentElement.style.setProperty("--scroll-direction", `${direction}`);
        document.body.classList.toggle("scrolling-down", direction === 1);
        document.body.classList.toggle("scrolling-up", direction === -1);
      }

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      // Read every rect first, then write every style. Interleaving reads
      // and writes forced a synchronous layout per section, per frame.
      const metrics = scrollSections.map((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        return {
          focus: Math.max(
            0,
            1 - Math.abs(sectionCenter - viewportCenter) / (viewportHeight * 0.72),
          ),
          progress: (viewportCenter - sectionCenter) / viewportHeight,
        };
      });

      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0.08);
        item.style.setProperty("--scroll-shift", `${(scrollY * speed).toFixed(2)}px`);
      });

      scrollSections.forEach((section, index) => {
        section.style.setProperty("--section-focus", metrics[index].focus.toFixed(3));
        section.style.setProperty("--section-progress", metrics[index].progress.toFixed(3));
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    const onWheel = (event: WheelEvent) => {
      const direction = event.deltaY >= 0 ? 1 : -1;
      const intensity = Math.min(1, Math.abs(event.deltaY) / 900);
      document.documentElement.style.setProperty("--wheel-direction", `${direction}`);
      document.documentElement.style.setProperty("--wheel-intensity", intensity.toFixed(3));
      document.body.classList.add("is-wheel-scrolling");

      // Share the rAF guard. The old code cancelled and re-queued on every
      // wheel event, which fires faster than rAF and so ran extra full
      // reflow passes per frame.
      schedule();

      window.clearTimeout(wheelClear);
      wheelClear = window.setTimeout(() => {
        document.documentElement.style.setProperty("--wheel-intensity", "0");
        document.body.classList.remove("is-wheel-scrolling");
      }, 110);
    };

    updateParallax();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("wheel", onWheel);
      if (frame) window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(loadFrame);
      window.clearTimeout(wheelClear);
    };
  }, []);

  return null;
}
