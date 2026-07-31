"use client";

import { useEffect, useRef } from "react";

import { useRenderActive } from "@/hooks/use-render-active";

const CHARS = ".:oO@";
// Grid pitch in CSS pixels. Larger pitch = fewer glyphs per frame.
const CELL = 18;
const TARGET_FPS = 24;
const ALPHA_BANDS = 5;

/**
 * Interfering-wave field rendered as ASCII.
 *
 * Pauses whenever it is offscreen, the tab is hidden, or the visitor prefers
 * reduced motion, and reads its ink colour from the element so it follows the
 * active theme.
 */
export function AnimatedWave() {
  const { ref: canvasRef, active } = useRenderActive<HTMLCanvasElement>();
  const timeRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let lastDraw = 0;
    // Cached so the render loop never forces a layout read.
    let width = 0;
    let height = 0;
    let ink = "#111111";

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // setTransform, not scale: scale multiplies the existing transform and
      // would progressively zoom the render across resizes.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ink = getComputedStyle(canvas).color || ink;
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const themeObserver = new MutationObserver(resize);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Reused across frames to avoid per-frame allocation.
    const bands: { x: number; y: number; char: string }[][] = Array.from(
      { length: ALPHA_BANDS },
      () => [],
    );

    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      if (now - lastDraw < 1000 / TARGET_FPS) return;
      lastDraw = now;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.max(1, Math.floor(width / CELL));
      const rows = Math.max(1, Math.floor(height / CELL));
      const stepX = width / cols;
      const stepY = height / rows;
      const time = timeRef.current;

      for (const band of bands) band.length = 0;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          // Three interfering waves.
          const wave1 = Math.sin(x * 0.2 + time * 2) * Math.cos(y * 0.15 + time);
          const wave2 = Math.sin((x + y) * 0.1 + time * 1.5);
          const wave3 = Math.cos(x * 0.1 - y * 0.1 + time * 0.8);

          const normalized = ((wave1 + wave2 + wave3) / 3 + 1) / 2;
          const band = Math.min(ALPHA_BANDS - 1, Math.floor(normalized * ALPHA_BANDS));

          bands[band].push({
            x: (x + 0.5) * stepX,
            y: (y + 0.5) * stepY,
            char: CHARS[Math.floor(normalized * (CHARS.length - 1))],
          });
        }
      }

      // One fillStyle per band rather than one per glyph.
      for (let band = 0; band < ALPHA_BANDS; band += 1) {
        const points = bands[band];
        if (!points.length) continue;
        ctx.globalAlpha = 0.12 + ((band + 0.5) / ALPHA_BANDS) * 0.45;
        ctx.fillStyle = ink;
        for (const point of points) ctx.fillText(point.char, point.x, point.y);
      }
      ctx.globalAlpha = 1;

      // Scaled so apparent speed matches a 60fps loop.
      timeRef.current += 0.03 * (60 / TARGET_FPS);
    };

    frame = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [active, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full text-foreground"
      style={{ display: "block" }}
    />
  );
}
