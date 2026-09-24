"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Shared easing curve — mirrors the GSAP/CSS scene easing. */
export const SCENE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Travel distance in px (negative moves upward from below). */
  y?: number;
  /** Lateral travel in px. */
  x?: number;
  /** Starting scale (1 keeps the element at its natural size). */
  scale?: number;
  /** Starting Y rotation — a subtle "swing in from depth" cue. */
  rotateY?: number;
  /** Portion of the element that must be visible before revealing. */
  amount?: number;
  /** Replay on every entry instead of only the first. */
  once?: boolean;
}

/**
 * The shared scroll-reveal wrapper for the whole experience.
 *
 * Every scene uses the same easing, duration and distance so the page reads
 * as one continuous piece of motion design rather than a pile of effects.
 * Framer's `MotionConfig reducedMotion="user"` (set globally) automatically
 * drops the transform part for visitors who ask for reduced motion, while
 * the opacity fade keeps content appearing.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  x = 0,
  scale = 1,
  rotateY = 0,
  amount = 0.25,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale, rotateY }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotateY: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: SCENE_EASE }}
      style={rotateY !== 0 || scale !== 1 ? { transformPerspective: 1000 } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** Variants for staggered groups (list items, cards, steps). */
export const revealGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
} as const;

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: SCENE_EASE },
  },
} as const;
