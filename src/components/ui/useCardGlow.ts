"use client";

import { useCallback } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface UseCardGlowOptions {
  /** r,g,b string used for the spotlight tint */
  accentRgb?: string;
  /** spotlight radius in px */
  radius?: number;
  /** spotlight intensity 0..1 */
  intensity?: number;
}

/** Cursor-following spotlight for glass cards, without pointer tilt. */
export function useCardGlow({
  accentRgb = "0,172,193",
  radius = 240,
  intensity = 0.22,
}: UseCardGlowOptions = {}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const opacityRaw = useMotionValue(0);
  const opacity = useSpring(opacityRaw, { stiffness: 140, damping: 22 });

  const bgX = useTransform(px, (value) => `${(value * 100).toFixed(2)}%`);
  const bgY = useTransform(py, (value) => `${(value * 100).toFixed(2)}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(${radius}px circle at ${bgX} ${bgY}, rgba(${accentRgb},${intensity}), transparent 65%)`;

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      px.set((event.clientX - rect.left) / rect.width);
      py.set((event.clientY - rect.top) / rect.height);
    },
    [px, py]
  );

  const onMouseEnter = useCallback(() => opacityRaw.set(1), [opacityRaw]);

  const onMouseLeave = useCallback(() => {
    opacityRaw.set(0);
    px.set(0.5);
    py.set(0.5);
  }, [opacityRaw, px, py]);

  return {
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
    spotlightStyle: { background: spotlightBg, opacity },
  };
}
