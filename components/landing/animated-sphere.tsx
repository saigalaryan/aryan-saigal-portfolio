"use client";

import { useEffect, useRef, useState } from "react";

import { useRenderActive } from "@/hooks/use-render-active";

const CHARS = ".:-=+*#%@";

/**
 * Quality tiers, best first.
 *
 * `step` is the angular spacing of the point lattice, so glyph count scales
 * with 1/step^2 and dominates cost. `maxDpr` caps rasterisation, the other
 * big lever on retina displays.
 *
 * The sphere keeps turning on every device; only its detail drops. It was
 * previously frozen outright on slower machines, which read as broken.
 */
const TIERS = [
  { step: 0.19, fps: 30, maxDpr: 2, bands: 6 },
  { step: 0.26, fps: 24, maxDpr: 1.5, bands: 5 },
  { step: 0.34, fps: 20, maxDpr: 1, bands: 4 },
] as const;

/** A draw over this leaves too little of the frame for everything else. */
const FRAME_BUDGET_MS = 4;
/** Well over budget: skip straight to the cheapest tier. */
const COLLAPSE_MS = FRAME_BUDGET_MS * 2;
const SAMPLE_SIZE = 10;

export function AnimatedSphere({
  skills = ["LangChain", "FastAPI", "Next.js", "React", "ChromaDB", "Docker"],
}: {
  skills?: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Gated only on visibility and reduced motion. The capability gate that
  // used to sit here existed for the WebGL scene; this field is ~290 glyphs
  // at 30fps and does not need it.
  const { ref: rootRef, active } = useRenderActive<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let frame = 0;
    let lastDraw = 0;
    // Cached box size, refreshed by ResizeObserver, so the render loop never
    // forces a synchronous layout read.
    let width = 0;
    let height = 0;
    // Glyph colour is read from the element so it follows the theme token
    // rather than being hardcoded black.
    let ink = "#111111";
    let tierIndex = 0;
    let samples: number[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, TIERS[tierIndex].maxDpr);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // setTransform (not scale) so repeated resizes replace the transform
      // rather than compounding it.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ink = getComputedStyle(canvas).color || ink;
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    // Reused across frames; refilled in place to avoid per-frame allocation.
    let bands: { x: number; y: number; char: string }[][] = [];

    const applyTier = () => {
      bands = Array.from({ length: TIERS[tierIndex].bands }, () => []);
      samples = [];
    };

    /** Drops detail, never motion, when draws run over budget. */
    const considerDowngrade = (drawMs: number) => {
      if (tierIndex >= TIERS.length - 1) return;
      samples.push(drawMs);
      if (samples.length < SAMPLE_SIZE) return;

      const average = samples.reduce((a, b) => a + b, 0) / samples.length;
      samples = [];
      if (average <= FRAME_BUDGET_MS) return;

      tierIndex = average > COLLAPSE_MS ? TIERS.length - 1 : tierIndex + 1;
      applyTier();
      resize();
    };

    applyTier();
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // Re-read the ink when the theme class flips.
    const themeObserver = new MutationObserver(resize);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const tier = TIERS[tierIndex];
      if (now - lastDraw < 1000 / tier.fps) return;
      lastDraw = now;

      const startedAt = performance.now();

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.525;

      for (const band of bands) band.length = 0;

      // Rotation is constant across the lattice, so hoist the trig out.
      const spin = time * 0.5;
      const cosRotY = Math.cos(time * 0.3);
      const sinRotY = Math.sin(time * 0.3);
      const cosRotX = Math.cos(time * 0.2);
      const sinRotX = Math.sin(time * 0.2);

      for (let phi = 0; phi < Math.PI * 2; phi += tier.step) {
        const cosPhi = Math.cos(phi + spin);
        const sinPhi = Math.sin(phi + spin);

        for (let theta = 0; theta < Math.PI; theta += tier.step) {
          const sinTheta = Math.sin(theta);
          const x = sinTheta * cosPhi;
          const y = sinTheta * sinPhi;
          const z = Math.cos(theta);

          const rotatedX = x * cosRotY - z * sinRotY;
          const rotatedZ = x * sinRotY + z * cosRotY;
          const rotatedY = y * cosRotX - rotatedZ * sinRotX;
          const finalZ = y * sinRotX + rotatedZ * cosRotX;

          const depth = (finalZ + 1) / 2;
          const band = Math.min(tier.bands - 1, Math.floor(depth * tier.bands));

          bands[band].push({
            x: centerX + rotatedX * radius,
            y: centerY + rotatedY * radius,
            char: CHARS[Math.floor(depth * (CHARS.length - 1))],
          });
        }
      }

      // Back-to-front, one fillStyle per band. This replaces the old
      // per-frame sort and per-glyph style string.
      for (let band = 0; band < tier.bands; band += 1) {
        const points = bands[band];
        if (!points.length) continue;
        ctx.globalAlpha = 0.2 + ((band + 0.5) / tier.bands) * 0.8;
        ctx.fillStyle = ink;
        for (const point of points) ctx.fillText(point.char, point.x, point.y);
      }
      ctx.globalAlpha = 1;

      // Keep the apparent rotation speed constant as the frame rate changes
      // between tiers.
      time += 1.2 / tier.fps;

      considerDowngrade(performance.now() - startedAt);
    };

    frame = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % skills.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [active, skills.length]);

  return (
    <div ref={rootRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full text-foreground"
        style={{ display: "block" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="rounded-none border border-foreground/10 bg-background/90 px-6 py-5 text-center shadow-card backdrop-blur-lg">
          <p className="text-[0.65rem] uppercase tracking-[0.36em] text-muted-foreground">
            Skill spotlight
          </p>
          <p className="mt-3 text-4xl font-semibold tracking-tight">Aryan</p>
          <p className="mt-2 text-sm text-muted-foreground">{skills[activeIndex]}</p>
        </div>
      </div>
    </div>
  );
}
