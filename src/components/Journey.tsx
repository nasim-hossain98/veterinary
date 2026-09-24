"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarCheck, ClipboardList, LifeBuoy, Stethoscope } from "lucide-react";
import SceneShell from "@/components/experience/SceneShell";
import GlassSurface, { type GlassTone } from "@/components/world/GlassSurface";
import PawTrail from "@/components/world/PawTrail";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface JourneyStep {
  index: string;
  title: string;
  description: string;
  icon: React.ElementType;
  /** accent hex taken from the existing palette */
  accent: string;
  accentRgb: string;
  /** matching glass tint, so cards and copy share one accent */
  tone: GlassTone;
  href: string;
  cta: string;
}

/**
 * The four real capabilities of the platform, told as a journey.
 * All copy is reused from the existing sections — nothing invented.
 */
const steps: JourneyStep[] = [
  {
    index: "01",
    title: "Book an Appointment",
    description:
      "Choose a convenient time and service. Booking takes less than a minute, right from your device.",
    icon: CalendarCheck,
    accent: "#00ACC1",
    accentRgb: "0,172,193",
    tone: "teal",
    href: "#doctors",
    cta: "Get Started",
  },
  {
    index: "02",
    title: "Visit Our Clinic",
    description:
      "Meet our expert team and get a thorough checkup for your companion, with care tailored to their needs.",
    icon: Stethoscope,
    accent: "#4DD0E1",
    accentRgb: "77,208,225",
    tone: "cyan",
    href: "#doctors",
    cta: "Learn More",
  },
  {
    index: "03",
    title: "Get a Care Plan",
    description:
      "Receive a personalized health plan for your pet, complete with veterinary-grade products and nutrition.",
    icon: ClipboardList,
    accent: "#BA68C8",
    accentRgb: "186,104,200",
    tone: "violet",
    href: "#pharmacy",
    cta: "View Plan",
  },
  {
    index: "04",
    title: "Ongoing Support",
    description:
      "We're always here for your pet's health journey — with 24/7 telehealth and emergency care whenever you need it.",
    icon: LifeBuoy,
    accent: "#FF8A80",
    accentRgb: "255,138,128",
    tone: "coral",
    href: "#contact",
    cta: "Contact Us",
  },
];

/**
 * The connecting route, in a normalised 0–100 space so it stretches to any
 * container. The curve passes exactly through (74,26) → (24,48) → (64,68),
 * which is where the paw prints are stamped, so the marks always sit *on*
 * the line rather than roughly near it.
 */
const TRAIL_D =
  "M 30 4 C 66 4, 82 14, 74 26 C 66 38, 30 34, 24 48 C 18 62, 46 62, 64 68 C 84 74, 78 88, 58 96";

const TRAIL_PAWS = [
  { top: "26%", left: "74%", rotate: 22 },
  { top: "48%", left: "24%", rotate: -18 },
  { top: "68%", left: "64%", rotate: 16 },
];

/**
 * One milestone on the trail.
 *
 * Scroll position *within the item* drives its activation: whichever node is
 * nearest the middle of the viewport sits forward, larger, fully opaque and
 * lit; its neighbours stay visible but read as slightly farther away. That is
 * what turns four static cards into a walk down a path instead of a grid.
 *
 * Depth split: the GSAP parallax transform lives on the `<li>` (via
 * data-depth) while the activation transform lives on an inner wrapper, so
 * the two animation systems never write to the same element.
 */
function StepItem({ step, index }: { step: JourneyStep; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const isLeft = index % 2 === 0;
  const Icon = step.icon;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 25%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.93, 1.03, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [26, -6, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.78, 1], [0.55, 1, 1, 0.6]);
  const glow = useTransform(scrollYProgress, [0, 0.45, 1], [0, 1, 0]);
  const nodeScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1.14, 0.9]);

  return (
    <li
      ref={ref}
      data-depth={String(0.4 + index * 0.18)}
      className={`relative pl-16 lg:pl-0 ${isLeft ? "lg:pr-8" : "lg:mt-16 lg:pl-8"}`}
    >
      {/* ── Step node: on the mobile spine, card corner on desktop ── */}
      <span className="absolute left-[22px] top-9 z-20 -translate-x-1/2 lg:left-6 lg:top-6 lg:translate-x-0">
        <motion.span style={reduce ? undefined : { scale: nodeScale }} className="block">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold"
            style={{
              background: "#ffffff",
              color: step.accent,
              boxShadow: `0 0 0 5px rgba(255,255,255,0.5), 0 10px 24px -12px rgba(${step.accentRgb},0.95)`,
            }}
          >
            {step.index}
          </span>
        </motion.span>
      </span>

      {/* ── Activation wrapper (scroll-driven) ── */}
      <motion.div
        className="relative"
        style={reduce ? undefined : { scale, y, opacity, willChange: "transform, opacity" }}
      >
        {/* Accent aura that blooms when the step becomes active */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-5 rounded-[40px]"
          style={{
            opacity: reduce ? 0.5 : glow,
            background: `radial-gradient(ellipse at 30% 20%, rgba(${step.accentRgb},0.28), transparent 68%)`,
            filter: "blur(20px)",
          }}
        />

        <GlassSurface tone={step.tone} radius="rounded-[28px]" padding="p-7" className="relative">
          <div className="relative flex items-start gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white"
              style={{
                background: `linear-gradient(135deg, ${step.accent}, rgba(${step.accentRgb},0.72))`,
                boxShadow: `0 10px 26px -12px rgba(${step.accentRgb},0.9)`,
              }}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>

            <div className="min-w-0">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.28em]"
                style={{ color: step.accent }}
              >
                Step {step.index}
              </span>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#004D40]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#546E7A]">{step.description}</p>

              <Magnetic className="mt-4">
                <a
                  href={step.href}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                  style={{
                    color: step.accent,
                    background: `rgba(${step.accentRgb},0.1)`,
                    border: `1px solid rgba(${step.accentRgb},0.22)`,
                  }}
                >
                  {step.cta}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            </div>
          </div>
        </GlassSurface>
      </motion.div>
    </li>
  );
}

/**
 * Journey — Scene 03.
 *
 * The scroll narrative's "process" chapter: the platform's four real
 * capabilities laid out along one connecting route. A dotted path draws
 * itself as the visitor descends, paw prints mark the milestones, and each
 * step lights up as it reaches the middle of the viewport.
 *
 * Responsive strategy: the route is rendered only where the two-column
 * geometry exists (≥1024px) so its scroll measurement is always meaningful.
 * Below that, the same story is told down a vertical spine, so the sequence
 * survives the narrower canvas instead of being scaled down.
 */
export default function Journey() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <SceneShell
      id="journey"
      label="Journey"
      eyebrow="Scene 03"
      tone="cyan"
      intensity={1.05}
      className="w-full px-6 py-24"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* ── Chapter header ── */}
        <div data-depth="0.3">
          <Reveal className="max-w-2xl">
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#00ACC1]">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  data-ambient="true"
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ACC1] opacity-60"
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ACC1]" />
              </span>
              How It Works
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">
              Four steps, one continuous journey
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#546E7A]">
              From the first consultation to emergency care — everything your
              companion needs, in one intelligent platform.
            </p>
          </Reveal>
        </div>

        {/* ── The route ── */}
        <div className="relative mt-16 lg:mt-24">
          {/* Mobile / tablet: a vertical spine through the steps */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[22px] top-10 w-px bg-gradient-to-b from-transparent via-[rgba(0,172,193,0.35)] to-transparent lg:hidden"
          />

          {/* Desktop: the connecting route, stamped with paw prints */}
          {isDesktop && <PawTrail d={TRAIL_D} paws={TRAIL_PAWS} />}

          <ol className="relative space-y-8 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:gap-y-4 lg:space-y-0">
            {steps.map((step, index) => (
              <StepItem key={step.index} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </SceneShell>
  );
}

