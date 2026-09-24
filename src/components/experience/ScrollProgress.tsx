"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a hairline gradient bar at the very top of the viewport
 * showing how far through the story the visitor is.
 *
 * Uses Framer's scroll-linked motion value (no React re-renders) and is
 * decorative only, so it is hidden from assistive technology.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #01579B, #00ACC1 45%, #4DD0E1 75%, #00BFA5)",
        boxShadow: "0 0 12px rgba(0,172,193,0.45)",
      }}
    />
  );
}