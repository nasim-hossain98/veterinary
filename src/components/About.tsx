"use client";

import { ArrowUpRight, Award, Heart, PawPrint, ShieldCheck, Stethoscope } from "lucide-react";
import SceneShell from "@/components/experience/SceneShell";
import GlassSurface, { type GlassTone } from "@/components/world/GlassSurface";
import FloatChip from "@/components/world/FloatChip";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

/** The platform's headline numbers (same figures shown in the hero). */
const stats: { value: string; label: string; tone: GlassTone; depth: number }[] = [
  { value: "2,400+", label: "Licensed Vets", tone: "teal", depth: 0.55 },
  { value: "98%", label: "Satisfaction", tone: "cyan", depth: 0.75 },
  { value: "24/7", label: "Availability", tone: "coral", depth: 0.95 },
];

/** Accreditation badges (previously shown in the footer). */
const certifications = [
  { icon: ShieldCheck, label: "Veterinary Council Approved" },
  { icon: Award, label: "ISO 9001 Certified" },
  { icon: Stethoscope, label: "AAHA Accredited" },
];

/**
 * About — Scene 07, and the close of the journey.
 *
 * The brief asks that the floating world "settle" at the end and hand over to
 * one calm, confident focal point, so this scene consolidates the brand
 * narrative, its accreditations, the platform's real numbers and the final
 * call to action into a single frosted band.
 *
 * The statistics become floating glass panels at three different depths
 * (2,400+ / 98% / 24/7), and the companion illustration anchors the left side
 * — the last object the visitor passes before the footer.
 */
export default function About() {
  return (
    <SceneShell
      id="about"
      label="About"
      eyebrow="Scene 07"
      tone="violet"
      intensity={0.8}
      camera={1.4}
      aliases={["blog", "careers", "partner"]}
      className="w-full px-6 py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* ── The settled final band ── */}
        <div
          data-depth="0.28"
          className="glass-surface relative overflow-hidden rounded-[36px] p-6 sm:rounded-[44px] sm:p-10 lg:p-14"
          style={{ "--glass-tint": "0,172,193" } as React.CSSProperties}
        >
          {/* Interior atmosphere — a quiet version of the world */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,172,193,0.18) 0%, transparent 68%)",
              filter: "blur(28px)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-16 h-[460px] w-[460px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(77,208,225,0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            {/* ══════════ LEFT · the companion ══════════ */}
            <div data-depth="0.42" className="relative">
              <div className="relative" style={{ perspective: "1200px" }}>
                <ImageReveal
                  src="/cat.png"
                  alt="A happy cat at the PawCare clinic"
                  className="h-[300px] w-full rounded-[28px] shadow-[0_40px_90px_-50px_rgba(0,77,64,0.7)] sm:h-[400px] lg:h-[520px] lg:rounded-[36px]"
                  sizes="(max-width: 1024px) 90vw, 520px"
                />

                {/* Orbiting chips — the world's last floating UI */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <FloatChip
                    icon={Heart}
                    label="Healthy Pets"
                    detail="Happy Lives"
                    tone="teal"
                    depth={1.15}
                    delay={0.2}
                    className="absolute -left-3 bottom-[16%] sm:-left-6"
                  />
                  <FloatChip
                    icon={PawPrint}
                    label="Because they"
                    detail="matter"
                    tone="cyan"
                    depth={1.3}
                    delay={0.35}
                    className="absolute -right-3 top-[10%] sm:-right-6"
                  />
                </div>
              </div>
            </div>

            {/* ══════════ RIGHT · narrative, proof, closing action ══════════ */}
            <div data-depth="0.3" className="relative">
              <Reveal>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#00ACC1]">
                  About PawCare
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#004D40] sm:text-4xl lg:text-5xl">
                  Smart care, built around your companion
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#546E7A]">
                  Advanced veterinary care powered by AI. Exceptional healthcare for
                  your beloved companions — anytime, anywhere.
                </p>
                <p className="mt-4 max-w-xl leading-relaxed text-[#546E7A]">
                  Telehealth, pharmacy, and emergency care — all in one intelligent
                  platform built for modern pet parents.
                </p>
              </Reveal>

              {/* Accreditations */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {certifications.map((cert, index) => (
                  <Reveal key={cert.label} delay={0.06 * index} y={20}>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/55 p-4 backdrop-blur-sm">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ACC1] to-[#0097A7] shadow-md shadow-[rgba(0,172,193,0.25)]">
                        <cert.icon className="h-5 w-5 text-white" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold text-[#004D40]">
                        {cert.label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.18} className="mt-8">
                <Magnetic>
                  <a
                    href="#doctors"
                    className="inline-flex items-center gap-2 rounded-full bg-[#00ACC1] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(0,172,193,0.3)] transition-colors hover:bg-[#0097A7]"
                  >
                    Book an Appointment
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Magnetic>
              </Reveal>
            </div>
          </div>

          {/* ══════════ Floating statistics — three depth planes ══════════ */}
          <div className="relative mt-12 lg:mt-16">
            <Reveal>
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-[#00ACC1]">
                Trusted at scale
              </p>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={0.08 * index} y={26}>
                  <GlassSurface
                    tone={stat.tone}
                    depth={stat.depth}
                    radius="rounded-3xl"
                    padding="px-6 py-6"
                    className={index === 1 ? "sm:mt-6" : index === 2 ? "sm:mt-12" : ""}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-3xl font-bold tabular-nums tracking-tight text-[#004D40] sm:text-4xl">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00ACC1]">
                        {stat.label}
                      </span>
                    </div>
                  </GlassSurface>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}
