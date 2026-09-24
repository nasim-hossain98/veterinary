"use client";

import { useCallback } from "react";
import {
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface UseCardGlowOptions {
  /** r,g,b string used for the spotlight tint */
  accentRgb?: string;
  /** max tilt in degrees (0 disables tilt) */
  maxTilt?: number;
  /** spotlight radius in px */
  radius?: number;
  /** spotlight intensity 0..1 */
  intensity?: number;
}

/**
 * Mouse-driven spotlight + 3D tilt for glass cards.
 *
 * Returns React handlers + a motion `style` fragment (for tilt) + a
 * spotlight style (radial gradient that follows the cursor). Everything is
 * MotionValue-based so there are no re-renders on pointer move.
 * Respects prefers-reduced-motion (disables tilt).
 */
export function useCardGlow({
  accentRgb = "0,172,193",
  maxTilt = 6,
  radius = 240,
  intensity = 0.22,
}: UseCardGlowOptions = {}) {
  const prefersReducedMotion = useReducedMotion();
  const tiltEnabled = !prefersReducedMotion && maxTilt > 0;

  /* normalized 0..1 pointer position within the card */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  /* spotlight opacity — spring-smoothed fade in/out */
  const opacityRaw = useMotionValue(0);
  const opacity = useSpring(opacityRaw, { stiffness: 140, damping: 22 });

  /* tilt — spring-smoothed for buttery motion */
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 18 });

  /* spotlight position as % for the radial-gradient */
  const bgX = useTransform(px, (v) => `${(v * 100).toFixed(2)}%`);
  const bgY = useTransform(py, (v) => `${(v * 100).toFixed(2)}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(${radius}px circle at ${bgX} ${bgY}, rgba(${accentRgb},${intensity}), transparent 65%)`;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
      if (tiltEnabled) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        rotateXRaw.set((0.5 - y) * maxTilt * 2);
        rotateYRaw.set((x - 0.5) * maxTilt * 2);
      }
    },
    [px, py, rotateXRaw, rotateYRaw, tiltEnabled, maxTilt]
  );

  const onMouseEnter = useCallback(() => {
    opacityRaw.set(1);
  }, [opacityRaw]);

  const onMouseLeave = useCallback(() => {
    opacityRaw.set(0);
    if (tiltEnabled) {
      rotateXRaw.set(0);
      rotateYRaw.set(0);
    }
    px.set(0.5);
    py.set(0.5);
  }, [opacityRaw, rotateXRaw, rotateYRaw, px, py, tiltEnabled]);

  return {
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
    tiltStyle: tiltEnabled ? { rotateX, rotateY, transformPerspective: 900 } : {},
    spotlightStyle: { background: spotlightBg, opacity },
  };
}
