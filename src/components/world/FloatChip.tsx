"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { TONE_RGB, type GlassTone } from "./GlassSurface";

export interface FloatChipProps {
  /** Lucide icon component. */
  icon: ElementType;
  /** Primary label, e.g. "Healthy Pets". */
  label: string;
  /** Optional second line, e.g. "Happy Lives". */
  detail?: string;
  tone?: GlassTone;
  /** Parallax depth (0.2 far … 1.6 near). */
  depth?: number;
  className?: string;
  /** Idle float period in seconds (0 disables the float). */
  float?: number;
  delay?: number;
}

/**
 * FloatChip — the small glass label that orbits a focal object
 * ("Healthy Pets / Happy Lives", "Video Call", "24/7 Vet"…).
 *
 * These are the reference's "floating UI elements": they sit at their own
 * depth so parallax separates them from the card behind, and they bob very
 * slowly so the composition feels alive without demanding attention.
 * Decorative by default — the meaning always lives in the nearby copy.
 */
export default function FloatChip({
  icon: Icon,
  label,
  detail,
  tone = "teal",
  depth = 1.1,
  className = "",
  float = 6,
  delay = 0,
}: FloatChipProps) {
  const rgb = TONE_RGB[tone];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.86, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* GSAP scroll-parallax lives on this inner wrapper, Framer's entrance
          animation on the element above — the two never share a transform. */}
      <div data-depth={String(depth)}>
        <div
          className="world-chip motion-optional"
          style={
            {
              "--glass-tint": rgb,
              ...(float > 0
                ? { animation: `vd-float ${float}s ease-in-out ${delay}s infinite alternate` }
                : null),
            } as React.CSSProperties
          }
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, rgba(${rgb},0.9), rgba(${rgb},0.62))`,
              boxShadow: `0 6px 18px -8px rgba(${rgb},0.9)`,
            }}
          >
            <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold tracking-tight text-[#004D40]">{label}</span>
            {detail && <span className="text-[10px] text-[#546E7A]">{detail}</span>}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
