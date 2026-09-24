"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { PawPrint } from "lucide-react";

/**
 * WorldBackdrop — the single, continuous aqua environment the whole page
 * travels through. Rendered once (fixed behind every scene) instead of a
 * background per section, which is what makes the page read as one space
 * rather than a stack of slides.
 *
 * Depth layers, far → near (each moves at its own scroll speed):
 *   L1  wave bands        — liquid horizon, slowest
 *   L2  colour reservoirs — large blurred palette blooms
 *   L3  glass shards      — floating rounded squares
 *   L4  paw motifs        — brand texture
 *   L5  vignette          — camera lens
 *
 * Performance
 *  • Pure CSS/SVG + MotionValues: no per-frame React work, no canvas.
 *  • Heavier elements are dropped on small screens.
 *  • `prefers-reduced-motion` paints a single static frame.
 */

/** Large blurred palette blooms (tints taken from the existing palette). */
const BLOBS: React.CSSProperties[] = [
  {
    top: "-14%",
    left: "-10%",
    width: "46rem",
    height: "46rem",
    background: "radial-gradient(circle, rgba(0,172,193,0.30) 0%, transparent 68%)",
  },
  {
    top: "22%",
    right: "-14%",
    width: "42rem",
    height: "42rem",
    background: "radial-gradient(circle, rgba(77,208,225,0.26) 0%, transparent 68%)",
  },
  {
    bottom: "-18%",
    left: "18%",
    width: "40rem",
    height: "40rem",
    background: "radial-gradient(circle, rgba(1,87,155,0.16) 0%, transparent 70%)",
  },
  {
    bottom: "8%",
    right: "6%",
    width: "24rem",
    height: "24rem",
    background: "radial-gradient(circle, rgba(186,104,200,0.13) 0%, transparent 70%)",
  },
];

/** [rotation, top, left, size, scroll-speed bias] */
const SHARDS: [number, string, string, string, number][] = [
  [14, "12%", "7%", "6.5rem", 1.0],
  [-18, "62%", "16%", "4.5rem", 0.72],
  [9, "28%", "86%", "5.5rem", 1.28],
  [-12, "78%", "90%", "7rem", 0.58],
  [22, "46%", "3%", "3.5rem", 1.42],
];

/** [rotation, top, left, size] */
const PAWS: [number, string, string, string][] = [
  [16, "18%", "8%", "2.6rem"],
  [-14, "58%", "80%", "3.4rem"],
  [10, "82%", "30%", "2.2rem"],
  [-22, "34%", "68%", "1.9rem"],
];
export default function WorldBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  /* Each layer travels a different distance — this is what sells depth. */
  const waveY = useTransform(p, [0, 1], ["0%", "-9%"]);
  const blobAY = useTransform(p, [0, 1], ["0%", "-22%"]);
  const blobBY = useTransform(p, [0, 1], ["0%", "16%"]);
  const blobCY = useTransform(p, [0, 1], ["0%", "-32%"]);
  const shardY = useTransform(p, [0, 1], ["0%", "-46%"]);
  const pawY = useTransform(p, [0, 1], ["0%", "-64%"]);
  const vignetteOpacity = useTransform(p, [0, 1], [1, 0.72]);

  const blobYStyle = [blobAY, blobBY, blobCY, blobAY];

  return (
    <div aria-hidden="true" className="world-shell z-0">
      {/* ── L1 · liquid horizon ─────────────────────────────────── */}
      <motion.div
        className="world-waves top-[6%] h-[26vh] opacity-45"
        style={reduce ? undefined : { y: waveY }}
      >
        <svg viewBox="0 0 1600 220" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="world-wave-a" x1="0" x2="1">
              <stop offset="0%" stopColor="#00ACC1" stopOpacity="0" />
              <stop offset="50%" stopColor="#00ACC1" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#4DD0E1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="world-wave-b" x1="0" x2="1">
              <stop offset="0%" stopColor="#4DD0E1" stopOpacity="0" />
              <stop offset="50%" stopColor="#01579B" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#00ACC1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 120 C 220 60, 420 180, 660 118 S 1120 40, 1380 120 S 1520 168, 1600 128"
            fill="none"
            stroke="url(#world-wave-a)"
            strokeWidth="2.5"
          />
          <path
            d="M0 168 C 260 108, 480 214, 720 158 S 1180 84, 1420 162 S 1540 200, 1600 172"
            fill="none"
            stroke="url(#world-wave-b)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* second, lower band — moves counter to the first */}
      <motion.div
        className="world-waves bottom-[18%] hidden h-[20vh] opacity-35 md:block"
        style={reduce ? undefined : { y: blobBY }}
      >
        <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M0 140 C 300 80, 520 190, 780 132 S 1240 60, 1460 140 S 1560 176, 1600 148"
            fill="none"
            stroke="url(#world-wave-a)"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* ── L2 · colour reservoirs ──────────────────────────────── */}
      {BLOBS.map((style, i) => (
        <motion.span
          key={i}
          className={`world-blob ${i === 3 ? "hidden lg:block" : ""}`}
          style={reduce ? style : { ...style, y: blobYStyle[i] }}
        >
          {/* idle drift keeps the world alive while the visitor rests */}
          <span
            className="motion-optional block h-full w-full"
            style={{
              animation: `world-drift-y ${26 + i * 5}s ease-in-out infinite`,
              animationDelay: `${i * -4}s`,
            }}
          />
        </motion.span>
      ))}

      {/* ── L3 · floating glass shards ──────────────────────────── */}
      <motion.div
        className="absolute inset-0 hidden sm:block"
        style={reduce ? undefined : { y: shardY }}
      >
        {SHARDS.map(([rot, top, left, size, speed], i) => (
          <span
            key={i}
            className={`world-shard ${i > 2 ? "hidden lg:block" : ""}`}
            style={
              {
                top,
                left,
                width: size,
                height: size,
                marginTop: `${i * 7 * speed}%`,
                "--shard-rot": `${rot}deg`,
                animation: `world-shard ${7 + i * 1.6}s ease-in-out infinite alternate`,
              } as React.CSSProperties
            }
          />
        ))}
      </motion.div>

      {/* ── L4 · paw motifs ────────────────────────────────────── */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: pawY }}>
        {PAWS.map(([rot, top, left, size], i) => (
          <span
            key={i}
            className={`world-paw ${i > 1 ? "hidden md:block" : ""}`}
            style={{
              top,
              left,
              width: size,
              height: size,
              animation: `world-paw ${9 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * -2.5}s`,
            }}
          >
            <PawPrint
              className="h-full w-full"
              style={{ transform: `rotate(${rot}deg)` }}
              strokeWidth={1.2}
            />
          </span>
        ))}
      </motion.div>

      {/* ── L5 · camera vignette ───────────────────────────────── */}
      <motion.div
        className="world-vignette"
        style={reduce ? undefined : { opacity: vignetteOpacity }}
      />
    </div>
  );
}

