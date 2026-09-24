"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Maximum pointer-follow offset in px. */
  strength?: number;
}

/**
 * Magnetic hover wrapper — the wrapped control drifts a few pixels toward
 * the cursor and springs back on leave.
 *
 * Deliberately conservative (≤ 10px, spring-damped) so it reads as premium
 * tactility instead of a gimmick. Disabled entirely for touch input and for
 * `prefers-reduced-motion`. Only wraps its child in a span — it never
 * replaces or changes the wrapped element's own semantics.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 8,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hasFinePointer = useHasFinePointer();
  const enabled = hasFinePointer && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      if (!enabled || event.pointerType !== "mouse" || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      x.set(Math.max(-1, Math.min(1, dx)) * strength);
      y.set(Math.max(-1, Math.min(1, dy)) * strength);
    },
    [enabled, strength, x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className}`}
      style={enabled ? { x: springX, y: springY } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </motion.span>
  );
}