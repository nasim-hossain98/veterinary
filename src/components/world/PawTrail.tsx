"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PawPrint } from "lucide-react";

export interface PawStop {
  /** Vertical position within the trail, e.g. "12%". */
  top: string;
  /** Horizontal position within the trail, e.g. "22%". */
  left: string;
  rotate?: number;
}

interface PawTrailProps {
  /** Serpentine connector path in a 0–100 normalised coordinate space. */
  d: string;
  /** Paw prints stamped at the journey's milestones. */
  paws: PawStop[];
  className?: string;
}

/**
 * PawTrail — the connective tissue of the "four steps" scene.
 *
 * A dashed 3D pathway that literally draws itself as the visitor scrolls,
 * with brand paw prints stamped at each milestone. Because the path is
 * scrubbed by scroll (not triggered once), it doubles as a progress
 * indicator: the trail behind you stays lit, the trail ahead stays faint.
 *
 * The SVG stretches to fill its container but uses `non-scaling-stroke`, so
 * the line weight stays crisp at every viewport width instead of smearing.
 */
export default function PawTrail({ d, paws, className = "" }: PawTrailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-visible ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="paw-trail-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,172,193,0)" />
            <stop offset="35%" stopColor="rgba(0,172,193,0.55)" />
            <stop offset="100%" stopColor="rgba(77,208,225,0.15)" />
          </linearGradient>
        </defs>

        {/* The full route, always faintly visible so the path is legible */}
        <path
          d={d}
          stroke="rgba(0,172,193,0.18)"
          strokeWidth="1.5"
          strokeDasharray="0.6 2.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* The portion already travelled — drawn by scroll position */}
        <motion.path
          d={d}
          stroke="url(#paw-trail-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={reduce ? undefined : { pathLength: dashOffset }}
        />
      </svg>

      {paws.map((paw, i) => (
        <motion.span
          key={i}
          className="absolute text-[#00ACC1]"
          style={{ top: paw.top, left: paw.left }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.55, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <PawPrint
            className="h-5 w-5 sm:h-6 sm:w-6"
            strokeWidth={1.4}
            style={{ transform: `rotate(${paw.rotate ?? 0}deg)` }}
          />
        </motion.span>
      ))}
    </div>
  );
}