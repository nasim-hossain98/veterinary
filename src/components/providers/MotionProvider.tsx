"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-wide motion configuration.
 *
 * `reducedMotion="user"` makes every Framer Motion component respect the
 * visitor's OS setting: transform/scale/rotate animations are skipped while
 * opacity fades still run, so no content is ever hidden behind motion.
 * Animated content therefore remains fully readable and reachable.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}