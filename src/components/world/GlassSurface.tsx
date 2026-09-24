"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Palette accents a glass surface can borrow (r,g,b for rgba maths). */
export const TONE_RGB = {
  teal: "0,172,193",
  cyan: "77,208,225",
  blue: "1,87,155",
  violet: "186,104,200",
  coral: "255,138,128",
  rose: "251,113,133",
} as const;

export type GlassTone = keyof typeof TONE_RGB;

/** Allowed host elements (keeps list semantics without dynamic motion()). */
const MOTION_TAGS = {
  div: motion.div,
  article: motion.article,
  li: motion.li,
  section: motion.section,
} as const;

export type GlassHost = keyof typeof MOTION_TAGS;

export interface GlassSurfaceProps {
  children: ReactNode;
  /** Palette accent used for the tint, rim and bloom. */
  tone?: GlassTone;
  className?: string;
  /** Corner radius utility, e.g. "rounded-3xl". */
  radius?: string;
  /** Padding utility, e.g. "p-7". */
  padding?: string;
  /**
   * Parallax depth for the scroll choreography
   * (0.2 = far background … 1.6 = nearest foreground). Omit to opt out.
   */
  depth?: number;
  /** Hover lift in px — 0 keeps the card still. */
  lift?: number;
  /** Render as a different element (article/li keep list semantics). */
  as?: GlassHost;
}

/**
 * GlassSurface — the one frosted card every scene is built from.
 *
 * "Frosted glass floating inside a soft 3D environment": translucent
 * gradient fill, backdrop blur, hairline rim, palette-tinted shadow and a
 * hover bloom. Keeping a single implementation is what makes eight very
 * different sections read as one coherent interface.
 *
 * Motion is intentionally plain (lift + inset shine) and automatically
 * neutralised for `prefers-reduced-motion` by the global MotionConfig, so
 * the card never disappears — it just stops moving.
 */
export default function GlassSurface({
  children,
  tone = "teal",
  className = "",
  radius = "rounded-3xl",
  padding = "p-7",
  depth,
  lift = 6,
  as,
}: GlassSurfaceProps) {
  const MotionTag = MOTION_TAGS[as ?? "div"];
  const rgb = TONE_RGB[tone];

  const card = (
    <MotionTag
      className={`group glass-surface relative overflow-hidden ${radius} ${padding} h-full`}
      style={{ "--glass-tint": rgb } as React.CSSProperties}
      whileHover={
        lift > 0
          ? { y: -lift, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }
          : undefined
      }
    >
      <span className="glass-rim" />
      <span className="glass-bloom" />
      {children}
    </MotionTag>
  );

  /* When the card participates in scroll parallax, the GSAP-driven transform
     lives on an outer wrapper so it can never fight the Framer hover lift. */
  if (depth === undefined) {
    return <div className={`h-full ${className}`}>{card}</div>;
  }

  return (
    <div data-depth={String(depth)} className={`h-full ${className}`}>
      {card}
    </div>
  );
}
