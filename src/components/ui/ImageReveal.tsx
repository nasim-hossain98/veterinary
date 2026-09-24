"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useIsMobile as useSharedIsMobile } from "@/hooks/useMediaQuery";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
interface ImageRevealProps {
  /** Image source path (works with next/image) */
  src: string;
  /** Alt text for the image */
  alt: string;
  /** Additional classes applied to the outermost container */
  className?: string;
  /** Inline styles applied to the outermost container */
  style?: React.CSSProperties;
  /** Overlay elements (badges, buttons) rendered above the mask */
  children?: ReactNode;
  /** Passed through to next/image */
  sizes?: string;
  /** Passed through to next/image */
  priority?: boolean;
  /** Disable the built-in entrance animation (e.g. when GSAP handles it) */
  disableEntrance?: boolean;
}

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */
const SPRING_CONFIG = { stiffness: 300, damping: 25 };
const RADIUS_SPRING = { stiffness: 180, damping: 30 };
const MOBILE_BREAKPOINT = 768;

/* ─────────────────────────────────────────────
   Hooks — media query for mobile detection
   ───────────────────────────────────────────── */
function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  /* Delegates to the shared, SSR-safe media-query hook so this component
     does not keep a second copy of the same logic (and does not call
     setState from inside an effect). */
  return useSharedIsMobile(breakpoint);
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export default function ImageReveal({
  src,
  alt,
  className = "",
  style: containerStyle,
  children,
  sizes,
  priority = false,
  disableEntrance = false,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  /* ── In-view detection for mobile scroll reveal ── */
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.4,
  });

  /* ── Mouse position as motion values (no re-renders) ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawRadius = useMotionValue(0);

  /* ── Smooth spring-wrapped values ── */
  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);
  const smoothRadius = useSpring(rawRadius, RADIUS_SPRING);

  /* ── Calculate container diagonal for max reveal radius ── */
  const getMaxRadius = useCallback(() => {
    if (!containerRef.current) return 300;
    const { width, height } = containerRef.current.getBoundingClientRect();
    return Math.ceil(Math.sqrt(width * width + height * height) * 0.75);
  }, []);

  /* ── Mouse move handler — updates motion values ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [isMobile, prefersReducedMotion, mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      // Set initial position immediately (no lag on first entry)
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      smoothX.jump(e.clientX - rect.left);
      smoothY.jump(e.clientY - rect.top);
      rawRadius.set(getMaxRadius());
    },
    [isMobile, prefersReducedMotion, mouseX, mouseY, smoothX, smoothY, rawRadius, getMaxRadius]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile || prefersReducedMotion) return;
    rawRadius.set(0);
  }, [isMobile, prefersReducedMotion, rawRadius]);

  /* ── Focus handlers — keyboard accessibility ── */
  const handleFocus = useCallback(() => {
    if (prefersReducedMotion) return;
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set(width / 2);
      mouseY.set(height / 2);
      smoothX.jump(width / 2);
      smoothY.jump(height / 2);
    }
    rawRadius.set(getMaxRadius());
  }, [prefersReducedMotion, mouseX, mouseY, smoothX, smoothY, rawRadius, getMaxRadius]);

  const handleBlur = useCallback(() => {
    rawRadius.set(0);
  }, [rawRadius]);

  /* ── Mobile: auto-reveal when scrolled into view ── */
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;
    if (isInView) {
      // Center the reveal
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        mouseX.set(width / 2);
        mouseY.set(height / 2);
        smoothX.jump(width / 2);
        smoothY.jump(height / 2);
      }
      // Animate radius from 0 → full with a slight delay
      const timer = setTimeout(() => {
        rawRadius.set(getMaxRadius());
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isInView, prefersReducedMotion, mouseX, mouseY, smoothX, smoothY, rawRadius, getMaxRadius]);

  /* ── Build the clip-path from spring values ── */
  const clipPath = useMotionTemplate`circle(${smoothRadius}px at ${smoothX}px ${smoothY}px)`;

  /* ── Reduced motion: show static image ── */
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        role="img"
        aria-label={alt}
        tabIndex={0}
        style={containerStyle}
      >
        {/* Static crisp image — no animation */}
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {/* Children overlays */}
        {children && (
          <div className="relative z-30 pointer-events-auto">
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      /* Subtle scale on hover for polish */
      whileHover={!isMobile ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      /* Entrance animation */
      {...(!disableEntrance && {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
      })}
      style={{
        /* Focus ring via outline for keyboard accessibility */
        outlineOffset: "3px",
        ...containerStyle,
      }}
    >
      {/* ─── Layer 0: Base image at 50% opacity ─── */}
      <div className="absolute inset-0 z-10">
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-opacity duration-500"
          style={{
            opacity: 0.5,
          }}
          aria-hidden="true"
        />
      </div>

      {/* ─── Layer 1: Crisp revealed image (clipped by circle) ─── */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{ clipPath }}
      >
        <div className="absolute inset-0 scale-105">
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* ─── Layer 2: Children overlays (badges, buttons) — always on top ─── */}
      {children && (
        <div className="relative z-30 pointer-events-auto">
          {children}
        </div>
      )}

      {/* ─── Keyboard focus ring (CSS-only, no extra DOM) ─── */}
      <style>{`
        [role="img"]:focus-visible {
          outline: 2px solid rgba(0, 172, 193, 0.6);
          outline-offset: 3px;
          border-radius: inherit;
        }
      `}</style>
    </motion.div>
  );
}
