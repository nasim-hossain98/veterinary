"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { SceneDefinition } from "@/lib/scenes";
import { sceneCounter } from "@/lib/scenes";

/** Concentric "doorway" rings we pass through, outer → inner. */
const RINGS = [320, 220, 132];

/**
 * SceneTransition — the membrane between two scenes.
 *
 * The brief's core requirement is that the page must not feel like
 * `SECTION 1 ↓ SECTION 2`, so instead of a divider this renders a short
 * *travel* beat: a liquid curtain, three concentric depth rings and a
 * horizon beam that expand toward the camera while the chapter label
 * resolves out of blur, then everything recedes again as the next scene
 * arrives.
 *
 * Everything is scrubbed by scroll position (`useScroll` + `useTransform`)
 * rather than triggered once, so the motion is reversible and continuous —
 * scrolling back up feels like walking backwards through the same space.
 *
 * Accessibility: under `prefers-reduced-motion` the wrapper renders the
 * chapter text statically (fully readable) and drops all transforms.
 */
export default function SceneTransition({ scene }: { scene: SceneDefinition }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* The curtain we pass through */
  const veilOpacity = useTransform(scrollYProgress, [0, 0.42, 1], [0, 0.85, 0]);
  const veilScale = useTransform(scrollYProgress, [0, 1], [1.5, 0.82]);

  /* Rings expand outward from the vanishing point */
  const ringScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.62, 1.1, 1.65]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.34, 0.68, 1], [0, 0.75, 0.6, 0]);

  /* Horizon beam stretches then collapses — a light-speed tell */
  const beamScaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 1, 0.3]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.9, 0]);

  /* Chapter text resolves out of depth, then continues past the camera */
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -26]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [0, 1, 1, 0]);
  const textBlurPx = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [7, 0, 0, 7]);
  const textFilter = useMotionTemplate`blur(${textBlurPx}px)`;
  return (
    <div
      ref={ref}
      className="relative flex w-full items-center justify-center overflow-hidden px-6 py-14 sm:py-20"
    >
      {/* ── Liquid curtain: the membrane we travel through ───────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-10%] top-1/2 h-[300px] -translate-y-1/2"
        style={
          reduce
            ? { opacity: 0.4 }
            : { opacity: veilOpacity, scaleY: veilScale, willChange: "transform, opacity" }
        }
      >
        <div className="transition-curtain h-full w-full" />
      </motion.div>

      {/* ── Depth rings expanding from the vanishing point ───────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={reduce ? { opacity: 0.5 } : { scale: ringScale, opacity: ringOpacity }}
      >
        {RINGS.map((size, i) => (
          <span
            key={size}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: `rgba(0,172,193,${0.26 - i * 0.06})`,
            }}
          />
        ))}
      </motion.div>

      {/* ── Horizon beam ────────────────────────────────────────── */}
      <motion.span
        aria-hidden="true"
        className="absolute h-[170px] w-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(0,172,193,0.45) 45%, rgba(77,208,225,0.3) 60%, transparent)",
          ...(reduce ? { opacity: 0.5 } : { scaleY: beamScaleY, opacity: beamOpacity }),
        }}
      />

      {/* ── Chapter label — resolves out of depth ───────────────── */}
      <motion.div
        className="relative flex flex-col items-center gap-2 text-center"
        style={
          reduce
            ? undefined
            : { y: textY, opacity: textOpacity, filter: textFilter, willChange: "transform, opacity, filter" }
        }
      >
        <span className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#00ACC1]">
          <span className="tabular-nums opacity-70">{sceneCounter(scene.id)}</span>
          <span className="h-px w-6 bg-gradient-to-r from-[rgba(0,172,193,0.5)] to-transparent" />
          <span>{scene.eyebrow}</span>
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-[#004D40] sm:text-2xl">
          {scene.label}
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-[#546E7A]">{scene.story}</p>
      </motion.div>
    </div>
  );
}

