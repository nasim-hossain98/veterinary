"use client";

import { useEffect, useRef } from "react";

/**
 * DepthField — the atmospheric layer the whole page "flies through".
 *
 * A single fixed 2D canvas draws a small set of particles projected from a
 * shared 3D space (perspective divide: screen = centre + (xy / z) · focal).
 * Scroll position feeds z, so the field drifts toward the camera as the
 * visitor moves through the scenes — the cheapest possible way to sell
 * continuous depth without a WebGL renderer, a bundle increase or a
 * per-frame layout cost.
 *
 * Performance / correctness notes
 *  • One arc() fill per particle, capped at 42 particles (12 on phones).
 *  • Scroll is sampled inside the rAF loop — no scroll listener at all.
 *  • The loop pauses when the tab is hidden and on reduced-motion devices a
 *    single static frame is painted instead.
 *  • DPR is capped at 2 and the buffer is only resized on real size changes.
 *  • Everything is torn down (rAF + listeners) on unmount: no leaks.
 */

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  tint: number;
}

/** Palette-derived tints (primary teal, cyan, deep blue, rare coral). */
const TINTS = ["0,172,193", "77,208,225", "1,87,155", "255,138,128"];

const MAX_Z = 1.35;
const MIN_Z = 0.16;

export default function DepthField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isPhone = window.matchMedia("(max-width: 639px)").matches;
    const count = reduceMotion ? 14 : isPhone ? 14 : 42;

    let width = 0;
    let height = 0;
    let focal = 520;

    let frame = 0;
    let lastScroll = window.scrollY;
    let running = !reduceMotion;

    const particles: Particle[] = [];

    const place = (particle: Particle, firstPass: boolean) => {
      const spread = 1.7;
      particle.x = (Math.random() * 2 - 1) * spread;
      particle.y = (Math.random() * 2 - 1) * spread;
      particle.z = firstPass ? MIN_Z + Math.random() * (MAX_Z - MIN_Z) : MAX_Z;
      particle.size = 0.8 + Math.random() * 2.6;
      particle.tint = Math.random() < 0.08 ? 3 : Math.floor(Math.random() * 3);
    };

    for (let i = 0; i < count; i += 1) {
      const particle: Particle = { x: 0, y: 0, z: 1, size: 1, tint: 0 };
      place(particle, true);
      particles.push(particle);
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      focal = Math.max(300, Math.min(width, height) * 0.75);
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height * 0.45;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        const depth01 = Math.min(
          1,
          Math.max(0, (particle.z - MIN_Z) / (MAX_Z - MIN_Z))
        );
        const proximity = 1 - depth01; /* 1 = closest, 0 = farthest */
        const scale = 1 / particle.z;

        /* Soft cull: skip particles that project far outside the viewport */
        const px = cx + particle.x * focal * 0.6 * scale;
        const py = cy + particle.y * focal * 0.6 * scale;
        if (px < -60 || px > width + 60 || py < -60 || py > height + 60) continue;

        const radius = 0.6 + particle.size * proximity * 1.9;
        const alpha = 0.05 + proximity * 0.3;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${TINTS[particle.tint]},${alpha.toFixed(3)})`;
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      frame = window.requestAnimationFrame(step);

      const scroll = window.scrollY;
      const delta = scroll - lastScroll;
      lastScroll = scroll;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        if (delta !== 0) {
          particle.z -= delta * 0.0005 * (1.5 - particle.z);
        }
        /* Gentle idle drift keeps the field alive while at rest */
        particle.y += 0.00025 * (1.4 - particle.z);
        particle.x += 0.00012;
        if (particle.x > 1.9) particle.x = -1.9;
        if (particle.y > 1.9) particle.y = -1.9;
        if (particle.z <= MIN_Z * 1.05 || particle.z > MAX_Z) {
          place(particle, false);
        }
      }

      paint();
    };

    const onVisibilityChange = () => {
      if (reduceMotion) return;
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        running = false;
      } else if (!running) {
        running = true;
        lastScroll = window.scrollY;
        frame = window.requestAnimationFrame(step);
      }
    };

    resize();
    paint();

    if (running) frame = window.requestAnimationFrame(step);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-ambient="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
