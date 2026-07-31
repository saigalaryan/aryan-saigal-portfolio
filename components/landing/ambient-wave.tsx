"use client";

import { useEffect, useRef } from "react";

const CHARS = ".:-=+*";

/**
 * Quality tiers, best first.
 *
 * `cell` is the glyph spacing in CSS pixels and dominates cost, since the
 * glyph count scales with 1/cell^2. `maxDpr` caps rasterisation: at a few
 * percent opacity this layer is texture rather than detail, so a high device
 * pixel ratio buys almost nothing visually but multiplies fill cost.
 */
const TIERS = [
  { cell: 24, fps: 30, maxDpr: 2, bands: 6 },
  { cell: 30, fps: 24, maxDpr: 1.5, bands: 5 },
  { cell: 38, fps: 20, maxDpr: 1, bands: 4 },
] as const;

// A draw costing more than this leaves too little of the frame for everything
// else, so the next tier down is selected.
const FRAME_BUDGET_MS = 6;
// Well past budget: skip the intermediate tiers rather than crawling down one
// step at a time while the page stutters.
const COLLAPSE_MS = FRAME_BUDGET_MS * 2;
// Even the cheapest tier being this slow means the device cannot afford the
// effect at all; a still page beats a stuttering one.
const ABANDON_MS = 9;
// Small on purpose. A slow device must reach its verdict in about a second,
// not after several seconds of jank.
const SAMPLE_SIZE = 10;

/**
 * Site-wide ambient field.
 *
 * One fixed, full-viewport canvas behind all content, running continuously so
 * the motion reads as a single uninterrupted surface rather than restarting
 * per section.
 *
 * It measures its own draw cost and steps down through the quality tiers when
 * it cannot keep up, and switches itself off entirely on devices where even
 * the cheapest tier is too expensive. Fixed high settings looked fine on a
 * fast machine but dropped a throttled one to ~10fps, which is why quality is
 * negotiated at runtime instead of assumed.
 */
export function AmbientWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Start conservatively where the device is obviously modest, so weak
    // hardware never has to render an expensive frame to find out.
    const cores = navigator.hardwareConcurrency ?? 8;
    let tierIndex = cores <= 4 || window.innerWidth < 640 ? TIERS.length - 1 : 0;

    let frame = 0;
    let lastDraw = 0;
    let time = 0;
    let width = 0;
    let height = 0;
    let ink = "#111111";
    let samples: number[] = [];
    let abandoned = false;

    let bands: { x: number; y: number; char: string }[][] = [];

    const applyTier = () => {
      bands = Array.from({ length: TIERS[tierIndex].bands }, () => []);
      samples = [];
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, TIERS[tierIndex].maxDpr);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ink = getComputedStyle(canvas).color || ink;
      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    /** Steps down a tier, or gives up, when draws are consistently too slow. */
    const considerDowngrade = (drawMs: number) => {
      samples.push(drawMs);
      if (samples.length < SAMPLE_SIZE) return;

      const average = samples.reduce((a, b) => a + b, 0) / samples.length;
      samples = [];

      if (average <= FRAME_BUDGET_MS) return;

      if (tierIndex < TIERS.length - 1) {
        // Far over budget means stepping down once will not be enough, so go
        // straight to the cheapest tier instead of stuttering through each.
        tierIndex = average > COLLAPSE_MS ? TIERS.length - 1 : tierIndex + 1;
        applyTier();
        resize();
        return;
      }

      if (average > ABANDON_MS) {
        abandoned = true;
        stop();
        ctx.clearRect(0, 0, width, height);
      }
    };

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const tier = TIERS[tierIndex];
      if (now - lastDraw < 1000 / tier.fps) return;
      lastDraw = now;

      const startedAt = performance.now();

      ctx.clearRect(0, 0, width, height);

      const cols = Math.max(1, Math.ceil(width / tier.cell));
      const rows = Math.max(1, Math.ceil(height / tier.cell));
      // Scroll shifts the field's phase so it feels attached to the page
      // rather than drifting independently of it.
      const drift = window.scrollY * 0.0016;

      for (const band of bands) band.length = 0;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const wave =
            Math.sin(x * 0.18 + time * 1.4) * Math.cos(y * 0.14 + time * 0.8 + drift) +
            Math.sin((x + y) * 0.09 + time);
          const normalized = (wave / 2 + 1) / 2;
          const band = Math.min(tier.bands - 1, Math.floor(normalized * tier.bands));

          bands[band].push({
            x: (x + 0.5) * tier.cell,
            y: (y + 0.5) * tier.cell,
            char: CHARS[Math.floor(normalized * (CHARS.length - 1))],
          });
        }
      }

      // One fillStyle per band rather than per glyph.
      for (let band = 0; band < tier.bands; band += 1) {
        const points = bands[band];
        if (!points.length) continue;
        ctx.globalAlpha = 0.35 + ((band + 0.5) / tier.bands) * 0.65;
        ctx.fillStyle = ink;
        for (const point of points) ctx.fillText(point.char, point.x, point.y);
      }
      ctx.globalAlpha = 1;

      // Keep apparent speed constant as the frame rate changes between tiers.
      time += 0.6 / tier.fps;

      considerDowngrade(performance.now() - startedAt);
    };

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }

    const start = () => {
      if (frame || abandoned || document.hidden || reduced.matches) return;
      frame = requestAnimationFrame(render);
    };

    const sync = () => (document.hidden || reduced.matches ? stop() : start());
    const themeObserver = new MutationObserver(resize);

    applyTier();
    resize();
    start();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[15] h-full w-full text-foreground opacity-[0.055] dark:opacity-[0.08]"
    />
  );
}
