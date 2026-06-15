"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Syringe,
  Stethoscope,
  HeartPulse,
  CalendarCheck,
  ArrowRight,
  Clock,
  ShieldCheck,
  Apple,
  Zap,
} from "lucide-react";

/* ─────────────────────────── helpers ─────────────────────────── */

function RevealCard({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────── white glassmorphic card shell ──────────────────
   Frosted white glass:
   • rgba(255,255,255,0.72) base — crisp white frost
   • backdrop-blur-2xl for depth
   • Hairline top-edge shine
   • Soft colored bottom glow per card accent
   • On hover: y-8, bigger shadow + accent border brightens
──────────────────────────────────────────────────────────────── */
function GlassCard({
  children,
  className = "",
  accentRgb = "0,172,193",
}: {
  children: React.ReactNode;
  className?: string;
  accentRgb?: string;   // r,g,b — used for the subtle tint + glow
}) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl p-7 cursor-pointer h-full ${className}`}
      style={{
        background: `rgba(255,255,255,0.72)`,
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        border: `1px solid rgba(${accentRgb},0.18)`,
        boxShadow: `
          0 4px 24px rgba(${accentRgb},0.10),
          0 1px 0 rgba(255,255,255,0.9) inset,
          0 -1px 0 rgba(${accentRgb},0.06) inset
        `,
      }}
      whileHover={{
        y: -8,
        boxShadow: `
          0 20px 56px rgba(${accentRgb},0.20),
          0 4px 16px rgba(${accentRgb},0.10),
          0 1px 0 rgba(255,255,255,1) inset
        `,
        border: `1px solid rgba(${accentRgb},0.35)`,
        transition: { duration: 0.25, ease: "easeOut" },
      } as Parameters<typeof motion.div>[0]["whileHover"]}
    >
      {/* Top-edge highlight — "glass rim" */}
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)`,
        }}
      />
      {/* Subtle bottom-corner accent bloom */}
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, rgba(${accentRgb},0.18) 0%, transparent 70%)`,
          filter: "blur(16px)",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─────────── icon with scale+rotate on hover ───────────────── */
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
      whileHover={{
        scale: 1.1,
        rotate: 3,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export default function ServiceBento() {
  const largeCardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: largeCardRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const illustrationY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    /* ── Original plain section background, restored ── */
    <section id="services" className="w-full px-6 py-28">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#00ACC1]">
            What We Offer
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">
            The Service Bento
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#546E7A]">
            Everything your companion needs, organized in one place.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* ══ Card 1 — Large Telehealth (2×2) ══ */}
          <RevealCard
            delay={0}
            className="sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2"
          >
            <div ref={largeCardRef} style={{ position: "relative", height: "100%" }}>
              <motion.div
                className="group relative overflow-hidden rounded-3xl p-8 cursor-pointer h-full"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(0,172,193,0.22)",
                  boxShadow: `
                    0 8px 40px rgba(0,172,193,0.12),
                    0 1px 0 rgba(255,255,255,0.95) inset
                  `,
                }}
                whileHover={{
                  y: -8,
                  boxShadow: `
                    0 28px 64px rgba(0,172,193,0.22),
                    0 6px 20px rgba(0,172,193,0.10),
                    0 1px 0 rgba(255,255,255,1) inset
                  `,
                  borderColor: "rgba(0,172,193,0.38)",
                  transition: { duration: 0.25, ease: "easeOut" },
                } as Parameters<typeof motion.div>[0]["whileHover"]}
              >
                {/* Glass rim */}
                <div
                  className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full"
                  style={{
                    background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)",
                  }}
                />
                {/* Hover accent bloom */}
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle,rgba(0,172,193,0.14) 0%,transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                {/* Soft teal tint top-right */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-30"
                  style={{
                    background: "radial-gradient(circle,rgba(0,172,193,0.12),transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />

                <div className="relative flex h-full flex-col justify-between">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,172,193,0.2)] bg-[rgba(0,172,193,0.08)] px-3 py-1 text-xs font-medium text-[#00ACC1]">
                      <Clock className="h-3.5 w-3.5" />
                      Always On
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Stethoscope className="h-7 w-7 text-[#00ACC1]/50" />
                    </motion.div>
                  </div>

                  {/* Parallax illustration */}
                  <div
                    className="mt-8 mb-6 flex items-center justify-center rounded-2xl p-6 overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg,rgba(0,172,193,0.07),rgba(178,235,242,0.3))",
                      border: "1px solid rgba(0,172,193,0.12)",
                    }}
                  >
                    <motion.div
                      className="relative flex h-44 w-full max-w-[280px] items-center justify-center rounded-xl"
                      style={{
                        y: illustrationY,
                        background: "rgba(255,255,255,0.80)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(0,172,193,0.14)",
                        boxShadow: "0 4px 20px rgba(0,172,193,0.08)",
                      }}
                    >
                      <div className="absolute inset-0 rounded-xl opacity-40 [background:radial-gradient(circle_at_50%_30%,rgba(0,172,193,0.12),transparent_70%)]" />
                      <div className="relative flex flex-col items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(0,172,193,0.2)] bg-[rgba(0,172,193,0.1)] shadow-[0_0_30px_-5px_rgba(0,172,193,0.25)]">
                          <Stethoscope className="h-8 w-8 text-[#00ACC1]" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </span>
                          Live
                        </div>
                        <div className="flex gap-1.5 mt-1">
                          {["bg-[#00ACC1]", "bg-emerald-400", "bg-amber-400"].map((c, i) => (
                            <motion.div
                              key={i}
                              className={`h-2 w-2 rounded-full ${c}`}
                              animate={{ scale: [1, 1.25, 1] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-[#004D40]">
                      24/7 Telehealth
                    </h3>
                    <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[#546E7A]">
                      Connect with licensed veterinarians anytime, anywhere. Video
                      consultations, prescription refills, and follow-ups — all
                      from your device.
                    </p>
                    <a
                      href="#"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                    >
                      Start a consultation
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </RevealCard>

          {/* ══ Card 2 — Vaccination ══ */}
          <RevealCard delay={0.15}>
            <GlassCard accentRgb="255,138,128">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#FF8A80]/15" border="border-[#FF8A80]/25">
                  <Syringe className="h-6 w-6 text-[#FF8A80]" />
                </AnimatedIcon>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#004D40] group-hover:text-[#00ACC1] transition-colors duration-300">
                    Vaccination
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Core &amp; lifestyle vaccines tailored to your pet.
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    Book Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ Card 3 — Surgery ══ */}
          <RevealCard delay={0.30}>
            <GlassCard accentRgb="186,104,200">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#BA68C8]/15" border="border-[#BA68C8]/25">
                  <ShieldCheck className="h-6 w-6 text-[#BA68C8]" />
                </AnimatedIcon>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#004D40] group-hover:text-[#00ACC1] transition-colors duration-300">
                    Surgery
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    State-of-the-art surgical suites with board-certified surgeons.
                  </p>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ Card 4 — Emergency (wide) ══ */}
          <RevealCard delay={0.45} className="sm:col-span-2 lg:col-span-2">
            <GlassCard accentRgb="255,82,82">
              <div className="relative flex h-full flex-col justify-between sm:flex-row sm:items-center sm:gap-8">
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-3">
                    <AnimatedIcon bg="bg-[#FF5252]/12" border="border-[#FF5252]/20">
                      <Zap className="h-6 w-6 text-[#FF5252]" />
                    </AnimatedIcon>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-100 px-3 py-1 text-xs font-medium text-red-500">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                      </span>
                      24/7 Emergency
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#004D40] group-hover:text-[#00ACC1] transition-colors duration-300">
                    Emergency Care
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#546E7A]">
                    Critical care when every second counts. Our trauma team is
                    always on standby — no appointment needed.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:mt-0 sm:min-w-[160px]">
                  <a
                    href="tel:911"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#FF5252] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(255,82,82,0.35)] transition-all hover:shadow-[0_6px_28px_rgba(255,82,82,0.45)] hover:-translate-y-0.5"
                  >
                    Call Emergency
                  </a>
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/60 px-5 py-3 text-sm font-medium text-[#546E7A] transition-all hover:border-teal-200 hover:text-[#00ACC1]">
                    Learn More
                  </button>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ Card 5 — Pet Wellness (wide) ══ */}
          <RevealCard delay={0.60} className="sm:col-span-2 lg:col-span-2">
            <GlassCard accentRgb="77,208,225">
              <div className="relative flex h-full flex-col justify-between sm:flex-row sm:items-center sm:gap-8">
                <div className="flex-1">
                  <AnimatedIcon bg="bg-[#4DD0E1]/15" border="border-[#4DD0E1]/25">
                    <HeartPulse className="h-6 w-6 text-[#4DD0E1]" />
                  </AnimatedIcon>
                  <h3 className="mt-5 text-xl font-semibold text-[#004D40] group-hover:text-[#00ACC1] transition-colors duration-300">
                    Pet Wellness
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#546E7A]">
                    Daily care tips, nutrition plans, and preventive routines to
                    keep your companion thriving year-round.
                  </p>
                </div>

                <div className="mt-6 flex flex-1 flex-col gap-3 sm:mt-0">
                  {[
                    { icon: Apple, text: "Balanced nutrition guides" },
                    { icon: CalendarCheck, text: "Preventive care schedules" },
                    { icon: HeartPulse, text: "Exercise & enrichment plans" },
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: "rgba(77,208,225,0.07)",
                        border: "1px solid rgba(77,208,225,0.15)",
                      }}
                      whileHover={{
                        x: 4,
                        background: "rgba(77,208,225,0.13)",
                        borderColor: "rgba(77,208,225,0.30)",
                        transition: { duration: 0.18 },
                      } as Parameters<typeof motion.div>[0]["whileHover"]}
                    >
                      <tip.icon className="h-4 w-4 shrink-0 text-[#00ACC1]" />
                      <span className="text-sm text-[#546E7A]">{tip.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </RevealCard>

        </div>
      </div>
    </section>
  );
}
