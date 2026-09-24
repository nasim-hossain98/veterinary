"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Apple,
  ArrowRight,
  CalendarCheck,
  Clock,
  HeartPulse,
  Phone,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Video,
  Zap,
} from "lucide-react";
import SceneShell from "@/components/experience/SceneShell";
import FloatChip from "@/components/world/FloatChip";
import { useCardGlow } from "@/components/ui/useCardGlow";
import Reveal from "@/components/ui/Reveal";

/* ─────────────────────────── shared shells ─────────────────────────── */

/**
 * RevealCard — grid cell that fades up on entry.
 *
 * When a `depth` is supplied the GSAP scroll-parallax transform is applied to
 * an outer wrapper, so it never shares an element with Framer's entry
 * animation. The wrapper is also the grid item, which keeps `col-span` /
 * `row-span` behaviour identical to before.
 */
function RevealCard({
  delay = 0,
  className = "",
  depth,
  children,
}: {
  delay?: number;
  className?: string;
  depth?: number;
  children: React.ReactNode;
}) {
  const card = (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );

  if (depth === undefined) return <div className={`h-full ${className}`}>{card}</div>;

  return (
    <div data-depth={String(depth)} className={`h-full ${className}`}>
      {card}
    </div>
  );
}

/**
 * GlassCard — the frosted surface every service card is built on.
 *
 * Uses the shared `.glass-surface` primitive (see globals.css) so these cards
 * match every other card in the world, then layers the two interactions that
 * make a bento feel tactile: a cursor-following spotlight and a subtle 3D
 * tilt. The `--glass-tint` variable carries each card's palette accent into
 * the border, shadow and hover bloom.
 */
function GlassCard({
  children,
  className = "",
  accentRgb = "0,172,193",
}: {
  children: React.ReactNode;
  className?: string;
  accentRgb?: string;
}) {
  const glow = useCardGlow({ accentRgb, maxTilt: 4 });

  return (
    <motion.div
      className={`group glass-surface relative h-full cursor-pointer overflow-hidden rounded-3xl p-7 ${className}`}
      style={{ "--glass-tint": accentRgb, ...glow.tiltStyle } as unknown as React.CSSProperties}
      whileHover={{ y: -8, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
      {...glow.handlers}
    >
      {/* Cursor-following spotlight */}
      <motion.span className="pointer-events-none absolute inset-0" style={glow.spotlightStyle} />
      {/* Shimmer sweep on hover */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[360%] group-hover:opacity-100" />
      </span>
      <span className="glass-rim" />
      <span className="glass-bloom" />
      {children}
    </motion.div>
  );
}

/** Icon tile that scales + rotates on hover. */
function AnimatedIcon({
  children,
  bg,
  border,
}: {
  children: React.ReactNode;
  bg: string;
  border: string;
}) {
  return (
    <motion.div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${bg} ${border}`}
      whileHover={{ scale: 1.1, rotate: 3, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ServiceBento — Scene 02.
 *
 * The brief asks for the existing bento to become a *floating* composition:
 * one larger main card with the secondary services arranged around it at
 * different depths, rather than a rigid grid of equal tiles. So the cards now
 * span unevenly, sit on four different parallax planes (data-depth 0.55→1.05,
 * which separates them as the scene scrolls) and are nudged out of alignment
 * with small margins. Tilts stay deliberately shallow.
 *
 * All five services and their copy are unchanged — only the composition is.
 */
export default function ServiceBento() {
  const largeCardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: largeCardRef,
    offset: ["start end", "end start"],
  });
  const illustrationY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <SceneShell
      id="services"
      label="Services"
      eyebrow="Scene 02"
      tone="teal"
      aliases={["telehealth", "surgery", "dental", "vax"]}
      intensity={0.9}
      className="relative w-full px-6 py-28"
    >
      <div className="relative z-10 mx-auto max-w-6xl" data-depth="0.35">
        {/* ── Header: asymmetric, title left / intro right ── */}
        <div className="mb-14 grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#00ACC1]">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  data-ambient="true"
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ACC1] opacity-60"
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ACC1]" />
              </span>
              Our Services
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">
              The Service Bento
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-[#546E7A]">
              Everything your companion needs, organized in one place.
            </p>
          </Reveal>
        </div>

        {/* ── Floating bento ── */}
        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {/* ══ Main card — 24/7 Telehealth (spans two rows) ══ */}
          <RevealCard
            delay={0}
            depth={0.55}
            className="sm:col-span-2 lg:col-span-3 lg:row-span-2"
          >
            <div ref={largeCardRef} className="relative h-full">
              <GlassCard>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40"
                  style={{
                    background: "radial-gradient(circle,rgba(0,172,193,0.16),transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />

                {/* Floating UI anchored to the main card */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <FloatChip
                    icon={Video}
                    label="Video Call"
                    detail="HD consult"
                    tone="teal"
                    depth={1.2}
                    delay={0.5}
                    float={5}
                    className="absolute -right-4 top-[38%] hidden xl:block"
                  />
                  <FloatChip
                    icon={HeartPulse}
                    label="24/7"
                    detail="Always on"
                    tone="cyan"
                    depth={1.35}
                    delay={0.65}
                    float={6}
                    className="absolute -left-5 bottom-[16%] hidden xl:block"
                  />
                </div>

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,172,193,0.2)] bg-[rgba(0,172,193,0.08)] px-3 py-1 text-xs font-medium text-[#00ACC1]">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      Always On
                    </span>
                    <Stethoscope className="h-7 w-7 text-[#00ACC1]/50" aria-hidden="true" />
                  </div>

                  {/* Parallax illustration */}
                  <div
                    className="mb-6 mt-8 flex items-center justify-center overflow-hidden rounded-2xl p-6"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(0,172,193,0.07),rgba(178,235,242,0.3))",
                      border: "1px solid rgba(0,172,193,0.12)",
                    }}
                  >
                    <motion.div
                      className="relative flex h-44 w-full max-w-[280px] items-center justify-center rounded-xl"
                      style={{
                        y: illustrationY,
                        background: "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(0,172,193,0.14)",
                        boxShadow: "0 4px 20px rgba(0,172,193,0.08)",
                      }}
                    >
                      <span className="absolute inset-0 rounded-xl opacity-40 [background:radial-gradient(circle_at_50%_30%,rgba(0,172,193,0.12),transparent_70%)]" />
                      <div className="relative flex flex-col items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(0,172,193,0.2)] bg-[rgba(0,172,193,0.1)] shadow-[0_0_30px_-5px_rgba(0,172,193,0.25)]">
                          <Stethoscope className="h-8 w-8 text-[#00ACC1]" aria-hidden="true" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600">
                          <span className="relative flex h-1.5 w-1.5">
                            <span
                              data-ambient="true"
                              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"
                            />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </span>
                          Live
                        </div>
                        <div className="mt-1 flex gap-1.5">
                          {["bg-[#00ACC1]", "bg-emerald-400", "bg-amber-400"].map((c, i) => (
                            <motion.span
                              key={c}
                              className={`h-2 w-2 rounded-full ${c}`}
                              animate={{ scale: [1, 1.25, 1] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                      24/7 Telehealth
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[#546E7A]">
                      Connect with licensed veterinarians anytime, anywhere. Video
                      consultations, prescription refills, and follow-ups — all from
                      your device.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </RevealCard>

          {/* ══ Vaccination ══ */}
          <RevealCard delay={0.15} depth={0.8} className="lg:col-span-3">
            <GlassCard accentRgb="255,138,128">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#FF8A80]/15" border="border-[#FF8A80]/25">
                  <Syringe className="h-6 w-6 text-[#FF8A80]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Vaccination
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Core &amp; lifestyle vaccines tailored to your pet.
                  </p>
                  <a
                    href="#doctors"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    Book Now
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ Surgery — nudged down for asymmetry ══ */}
          <RevealCard delay={0.3} depth={0.95} className="lg:col-span-3 lg:mt-8">
            <GlassCard accentRgb="186,104,200">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#BA68C8]/15" border="border-[#BA68C8]/25">
                  <ShieldCheck className="h-6 w-6 text-[#BA68C8]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Surgery
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    State-of-the-art surgical suites with board-certified surgeons.
                  </p>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ Emergency Care ══ */}
          <RevealCard delay={0.45} depth={0.7} className="lg:col-span-3">
            <GlassCard accentRgb="255,82,82">
              <div className="relative flex h-full flex-col justify-between gap-6">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <AnimatedIcon bg="bg-[#FF5252]/12" border="border-[#FF5252]/20">
                      <Zap className="h-6 w-6 text-[#FF5252]" aria-hidden="true" />
                    </AnimatedIcon>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-500">
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          data-ambient="true"
                          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
                        />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                      </span>
                      24/7 Emergency
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Emergency Care
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#546E7A]">
                    Critical care when every second counts. Our trauma team is
                    always on standby — no appointment needed.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:911"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#FF5252] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(255,82,82,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(255,82,82,0.45)]"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call Emergency
                  </a>
                  <a
                    href="#services"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/60 px-5 py-3 text-sm font-medium text-[#546E7A] transition-all hover:border-teal-200 hover:text-[#00ACC1]"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ Pet Wellness — nudged for asymmetry ══ */}
          <RevealCard delay={0.6} depth={1.05} className="sm:col-span-2 lg:col-span-3 lg:mt-6">
            <GlassCard accentRgb="77,208,225">
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <AnimatedIcon bg="bg-[#4DD0E1]/15" border="border-[#4DD0E1]/25">
                    <HeartPulse className="h-6 w-6 text-[#4DD0E1]" aria-hidden="true" />
                  </AnimatedIcon>
                  <h3 className="mt-5 text-xl font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Pet Wellness
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#546E7A]">
                    Daily care tips, nutrition plans, and preventive routines to
                    keep your companion thriving year-round.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  {[
                    { icon: Apple, text: "Balanced nutrition guides" },
                    { icon: CalendarCheck, text: "Preventive care schedules" },
                    { icon: HeartPulse, text: "Exercise & enrichment plans" },
                  ].map((tip) => (
                    <motion.div
                      key={tip.text}
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: "rgba(77,208,225,0.07)",
                        border: "1px solid rgba(77,208,225,0.15)",
                      }}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.18 },
                      }}
                    >
                      <tip.icon className="h-4 w-4 shrink-0 text-[#00ACC1]" aria-hidden="true" />
                      <span className="text-sm text-[#546E7A]">{tip.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </RevealCard>
        </div>
      </div>
    </SceneShell>
  );
}
