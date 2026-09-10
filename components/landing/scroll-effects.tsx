"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const loadFrame = window.requestAnimationFrame(() => {
      document.body.classList.add("is-page-loaded");
    });

    // Reveal is opt-out, not opt-in: `.js [data-reveal]` is opacity 0, so
    // anything this module fails to mark visible is invisible for good. That
    // failure mode blanks whole sections, so `reveal` is the only place the
    // class is set and the sweep below backstops the observer.
    const reveal = (item: Element) => {
      if (item.classList.contains("is-visible")) return;
      item.classList.add("is-visible");
      // will-change pins a compositor layer for as long as it is set.
      // Release it once the reveal has played and stop observing, so
      // dozens of layers are not kept alive for the whole session.
      (item as HTMLElement).style.willChange = "auto";
      observer.unobserve(item);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // `isIntersecting`, not a ratio floor. With threshold 0 the callback
          // only fires as an element crosses the root edge, where the ratio is
          // still ~0, so a `ratio < 0.1` guard rejected the one callback the
          // element would ever get and left it stuck at opacity 0 for good.
          if (!entry.isIntersecting) return;
          reveal(entry.target);
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

    // Backstop. Anything sitting in the viewport should already have been
    // revealed by the observer, so this sweep is a no-op when the observer is
    // healthy. If it ever finds work to do the observer is not delivering, and
    // the page would otherwise render as blank space, so keep sweeping on
    // scroll for the rest of the session rather than trusting it again.
    let sweepOnScroll = false;

    const sweep = () => {
      let rescued = 0;
      for (const item of revealItems) {
        if (item.classList.contains("is-visible")) continue;
        const rect = item.getBoundingClientRect();
        // Same lead time as the observer's rootMargin.
        if (rect.top > window.innerHeight + 900 || rect.bottom < -900) continue;
        reveal(item);
        rescued += 1;
      }
      if (rescued > 0) sweepOnScroll = true;
    };

    const sweepTimer = window.setTimeout(sweep, 1200);
    const onScrollSweep = () => {
      if (sweepOnScroll) sweep();
    };
    window.addEventListener("scroll", onScrollSweep, { passive: true });

    if (reduceMotion) {
      return () => {
        observer.disconnect();
        window.clearTimeout(sweepTimer);
        window.removeEventListener("scroll", onScrollSweep);
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
      window.clearTimeout(sweepTimer);
      window.removeEventListener("scroll", onScrollSweep);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("wheel", onWheel);
      if (frame) window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(loadFrame);
      window.clearTimeout(wheelClear);
    };
  }, []);

  return null;
}
