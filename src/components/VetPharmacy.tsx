"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Cookie,
  FlaskConical,
  MessageCircle,
  PawPrint,
  Pill,
} from "lucide-react";
import SceneShell from "@/components/experience/SceneShell";
import { useCardGlow } from "@/components/ui/useCardGlow";

/* ────────────────────────────────────────────────────────────
   Vet-Pharmacy — Scene 05.

   The shop as an open stage rather than a boxed card: the promise on
   the left (eyebrow, headline, four product lanes, one action pair)
   and a vet-grade still life resting on a lit podium on the right.
   Both halves sit directly on the world backdrop — the ambient washes
   float in the scene instead of being clipped by a panel — so the
   section reads as part of the scroll story, not as a slide.
   ───────────────────────────────────────────────────────────── */

interface Shelf {
  id: string;
  label: string;
  from: string;
  icon: React.ElementType;
  /** Icon colour drawn from the palette. */
  tint: string;
  /** Soft wash sitting behind the icon tile. */
  wash: string;
  /** "r,g,b" accent driving the spotlight, tinted shadow and rim. */
  glow: string;
}

/** The four product lanes that make up the shop. */
const shelves: Shelf[] = [
  {
    id: "medications",
    label: "Medications",
    from: "$12.00",
    icon: Pill,
    tint: "#FF8A80",
    wash: "rgba(255, 138, 128, 0.16)",
    glow: "255,138,128",
  },
  {
    id: "pet-food",
    label: "Pet Food",
    from: "$15.00",
    icon: Cookie,
    tint: "#4DD0E1",
    wash: "rgba(77, 208, 225, 0.18)",
    glow: "77,208,225",
  },
  {
    id: "supplements",
    label: "Supplements",
    from: "$18.00",
    icon: FlaskConical,
    tint: "#FFB74D",
    wash: "rgba(255, 183, 77, 0.18)",
    glow: "255,183,77",
  },
  {
    id: "grooming",
    label: "Grooming",
    from: "$10.00",
    icon: PawPrint,
    tint: "#BA68C8",
    wash: "rgba(186, 104, 200, 0.18)",
    glow: "186,104,200",
  },
];

/** Hero-style gradient used for the accent line and the primary action. */
const ACCENT_LINE =
  "linear-gradient(90deg, #00ACC1 0%, #4DD0E1 32%, #00BFA5 66%, #69F0AE 100%)";

/** Leaves drifting around the still life (positions in % of the stage). */
const leaves = [
  { left: "2%", top: "14%", rotate: -24, size: 26, delay: 0.4 },
  { left: "90%", top: "22%", rotate: 32, size: 20, delay: 1.1 },
  { left: "80%", top: "64%", rotate: -14, size: 16, delay: 0.8 },
  { left: "10%", top: "56%", rotate: 18, size: 14, delay: 1.4 },
];

/** Light motes catching the halo above the podium. */
const motes = [
  { left: "24%", top: "26%", size: 6 },
  { left: "66%", top: "10%", size: 4 },
  { left: "84%", top: "42%", size: 5 },
  { left: "40%", top: "70%", size: 3 },
];

export default function VetPharmacy() {
  const still = useReducedMotion() === true;

  return (
    <SceneShell
      id="pharmacy"
      label="Pharmacy"
      eyebrow="Scene 05"
      tone="coral"
      aliases={["shop"]}
      intensity={0.9}
      className="px-6 py-28"
    >
      <div className="relative mx-auto max-w-7xl" data-depth="0.5">
        <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
          {/* ── LEFT · the promise ── */}
          <div data-depth="0.58">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow chip with a live dot */}
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/65 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00ACC1] shadow-[0_14px_34px_-26px_rgba(0,77,64,0.9)] backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ACC1] opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ACC1]" />
                </span>
                Our Products
              </span>

              <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#004D40] sm:text-5xl lg:text-[3.4rem]">
                Vet-Pharmacy &amp;{" "}
                <span className="bg-gradient-to-r from-[#00ACC1] via-[#26C6DA] to-[#00BFA5] bg-clip-text text-transparent">
                  Nutrition
                </span>
              </h2>

              {/* Gradient accent — the same line the hero opens with */}
              <span
                aria-hidden="true"
                className="mt-6 block h-[3px] w-28 rounded-full"
                style={{ background: ACCENT_LINE }}
              />

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#546E7A]">
                Quality products for a healthier, happier life. From prescription
                medications to premium pet food and supplements.
              </p>
            </motion.div>

            {/* Product lanes */}
            <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-4">
              {shelves.map((shelf, index) => (
                <ShelfCard
                  key={shelf.id}
                  shelf={shelf}
                  index={index}
                  still={still}
                />
              ))}
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-11 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white shadow-[0_24px_50px_-22px_rgba(0,172,193,1)] transition-all duration-300 hover:shadow-[0_30px_64px_-22px_rgba(0,172,193,1)]"
                style={{
                  background:
                    "linear-gradient(135deg, #00ACC1 0%, #0097A7 55%, #00897B 100%)",
                }}
              >
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                  <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[360%] group-hover:opacity-100" />
                </span>
                Browse All Products
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-[#00ACC1]/25 bg-white/65 px-6 py-4 text-sm font-semibold text-[#004D40] shadow-[0_18px_42px_-32px_rgba(0,77,64,0.9)] backdrop-blur-sm transition-all duration-300 hover:border-[#00ACC1]/50 hover:bg-white hover:text-[#00ACC1]"
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
                Ask a Vet
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT · the still life ── */}
          <div data-depth="0.88" className="relative">
            <ProductStage still={still} />
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

/* ─────────────────────────── left column ─────────────────────────── */

/**
 * ShelfCard — one product lane.
 *
 * Built on the shared `.glass-surface` primitive so it matches the bento
 * and expert cards, then layered with the two interactions that make this
 * section feel alive: a cursor-following spotlight (+ subtle 3D tilt) and
 * a shimmer sweep on hover. The staggered offset lives on the outer
 * wrapper so Framer's hover lift never overwrites the Tailwind translate.
 */
function ShelfCard({
  shelf,
  index,
  still,
}: {
  shelf: Shelf;
  index: number;
  still: boolean;
}) {
  const Icon = shelf.icon;
  const glow = useCardGlow({
    accentRgb: shelf.glow,
    maxTilt: 6,
    radius: 190,
    intensity: 0.26,
  });

  return (
    <div className={`h-full ${index % 2 === 1 ? "sm:-translate-y-3" : ""}`}>
      <motion.a
        href="/shop"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.55,
          delay: 0.1 + index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={still ? undefined : { y: -8 }}
        className="group glass-surface relative flex h-full w-full flex-col items-center overflow-hidden rounded-3xl px-3 py-6 text-center"
        style={
          { "--glass-tint": shelf.glow, ...glow.tiltStyle } as unknown as React.CSSProperties
        }
        {...glow.handlers}
      >
        {/* Cursor-following spotlight */}
        <motion.span
          className="pointer-events-none absolute inset-0"
          style={glow.spotlightStyle}
        />
        {/* Shimmer sweep */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[360%] group-hover:opacity-100" />
        </span>
        <span className="glass-rim" />
        <span className="glass-bloom" />

        {/* Corner affordance */}
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex h-7 w-7 -translate-x-1 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#00ACC1] opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>

        <span
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 shadow-[0_16px_30px_-20px_rgba(0,77,64,0.95)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
          style={{ background: shelf.wash }}
        >
          <Icon className="h-6 w-6" style={{ color: shelf.tint }} />
        </span>

        <span className="relative mt-4 text-[15px] font-semibold text-[#004D40]">
          {shelf.label}
        </span>
        <span className="relative mt-2 rounded-full border border-[rgba(0,172,193,0.14)] bg-white/70 px-2.5 py-1 text-[11px] font-medium text-[#546E7A]">
          {`From ${shelf.from}`}
        </span>
      </motion.a>
    </div>
  );
}

/* ─────────────────────────── right column ─────────────────────────── */

/**
 * ProductStage — the lit stage holding the product still life.
 *
 * The ambient set dressing (halo, rotating rings, drifting leaves, light
 * motes) stays hand-drawn in CSS so it blends into the world backdrop,
 * while the product group itself is now a photographic PNG
 * (`/product-image.png`) that fades and rises in as the scene scrolls
 * into view.
 */
function ProductStage({ still }: { still: boolean }) {
  return (
    <div className="relative mx-auto flex h-[360px] w-full max-w-[560px] items-end justify-center sm:h-[440px] lg:h-[520px]">
      {/* Halo rising behind the shelf */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.42) 46%, transparent 72%)",
        }}
      />

      {/* Ring turning behind the podium */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#00ACC1]/25 sm:h-[420px] sm:w-[420px]"
        animate={still ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 sm:h-[300px] sm:w-[300px]"
      />

      {/* Leaves drifting through the frame */}
      {leaves.map((leaf, i) => (
        <motion.span
          key={`leaf-${i}`}
          aria-hidden="true"
          className="pointer-events-none absolute hidden md:block"
          style={{ left: leaf.left, top: leaf.top }}
          animate={still ? undefined : { y: [0, -14, 0] }}
          transition={{
            duration: 7 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: leaf.delay,
          }}
        >
          <span
            className="block rounded-[50%_50%_50%_0] bg-gradient-to-br from-[#B7EFB0] to-[#45B45F] shadow-[0_10px_18px_-12px_rgba(0,77,64,0.7)]"
            style={{
              width: leaf.size,
              height: leaf.size * 0.6,
              transform: `rotate(${leaf.rotate}deg)`,
            }}
          />
        </motion.span>
      ))}

      {/* Light motes catching the halo */}
      {motes.map((mote, i) => (
        <motion.span
          key={`mote-${i}`}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white/90 shadow-[0_0_12px_2px_rgba(255,255,255,0.8)]"
          style={{ left: mote.left, top: mote.top, width: mote.size, height: mote.size }}
          animate={still ? undefined : { opacity: [0.25, 0.95, 0.25], scale: [0.85, 1.15, 0.85] }}
          transition={{
            duration: 5 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* The product still life — photographic PNG replacing the CSS shelf */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[96%] max-w-[520px]"
      >
        <Image
          src="/product-image.png"
          alt="Vet-Pharmacy product range: a premium pet food bag, a bowl of kibble, a daily-vitamins bottle and a floating supplement box on a teal podium"
          width={1349}
          height={1166}
          sizes="(min-width: 1024px) 520px, (min-width: 640px) 440px, 340px"
          priority={false}
          className="h-auto w-full drop-shadow-[0_36px_56px_rgba(0,77,64,0.35)]"
        />
      </motion.div>
    </div>
  );
}
