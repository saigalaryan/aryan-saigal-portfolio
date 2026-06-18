"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const scrollSections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const loadFrame = window.requestAnimationFrame(() => {
      document.body.classList.add("is-page-loaded");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.intersectionRatio >= 0.1);
        });
      },
      {
        threshold: [0.1],
        rootMargin: "0px 0px -18% 0px",
      },
    );

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 24}ms`);
      observer.observe(item);
    });

    let frame = 0;
    let wheelFrame = 0;
    let wheelClear = 0;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const direction = scrollY >= lastScrollY ? 1 : -1;
      document.documentElement.style.setProperty("--scroll-direction", `${direction}`);
      document.body.classList.toggle("scrolling-down", direction === 1);
      document.body.classList.toggle("scrolling-up", direction === -1);
      lastScrollY = scrollY;

      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallax || 0.08);
        item.style.setProperty("--scroll-shift", `${scrollY * speed}px`);
      });

      scrollSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const focus = Math.max(0, 1 - distance / (window.innerHeight * 0.72));
        const progress = (viewportCenter - sectionCenter) / window.innerHeight;
        section.style.setProperty("--section-focus", focus.toFixed(3));
        section.style.setProperty("--section-progress", progress.toFixed(3));
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    const onWheel = (event: WheelEvent) => {
      const direction = event.deltaY >= 0 ? 1 : -1;
      const intensity = Math.min(1, Math.abs(event.deltaY) / 900);
      document.documentElement.style.setProperty("--wheel-direction", `${direction}`);
      document.documentElement.style.setProperty("--wheel-intensity", intensity.toFixed(3));
      document.body.classList.add("is-wheel-scrolling");

      if (wheelFrame) window.cancelAnimationFrame(wheelFrame);
      wheelFrame = window.requestAnimationFrame(updateParallax);

      window.clearTimeout(wheelClear);
      wheelClear = window.setTimeout(() => {
        document.documentElement.style.setProperty("--wheel-intensity", "0");
        document.body.classList.remove("is-wheel-scrolling");
      }, 110);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      if (frame) window.cancelAnimationFrame(frame);
      if (wheelFrame) window.cancelAnimationFrame(wheelFrame);
      window.cancelAnimationFrame(loadFrame);
      window.clearTimeout(wheelClear);
    };
  }, []);

  return null;
}
