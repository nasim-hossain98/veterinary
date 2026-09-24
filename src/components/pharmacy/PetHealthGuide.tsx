"use client";

import { motion } from "framer-motion";
import { Apple, HeartPulse, Lightbulb } from "lucide-react";
import { useCardGlow } from "@/components/ui/useCardGlow";
import { petGuides, type PetGuide } from "@/lib/pharmacy";

/* ────────────────────────────────────────────────────────────
   Pet Health & Nutrition guide — the informational half of the
   pharmacy page. A card per companion (dogs, cats, birds) with
   practical health checkpoints, nutrition basics and a single
   highlighted recommendation. General guidance only — not a
   substitute for a consultation with a licensed veterinarian.
   ───────────────────────────────────────────────────────────── */

export default function PetHealthGuide() {
  return (
    <section
      id="pet-care"
      className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-12 sm:px-8"
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/65 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00ACC1] shadow-[0_14px_34px_-26px_rgba(0,77,64,0.9)] backdrop-blur-sm">
          <HeartPulse className="h-3.5 w-3.5" />
          Health &amp; Nutrition
        </span>
        <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-[#004D40] sm:text-4xl">
          Caring for your{" "}
          <span className="bg-gradient-to-r from-[#00ACC1] via-[#26C6DA] to-[#00BFA5] bg-clip-text text-transparent">
            companion
          </span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[#546E7A]">
          Practical health, nutrition and wellbeing tips for cats, dogs and
          birds — so you know what to watch for and how to keep them thriving.
        </p>
      </motion.div>

      {/* ── Guide cards ── */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {petGuides.map((guide, i) => (
          <GuideCard key={guide.id} guide={guide} index={i} />
        ))}
      </div>

      {/* ── Disclaimer ── */}
      <p className="mt-8 text-center text-xs text-[#90A4AE]">
        General guidance only. For diagnosis, dosing or ongoing conditions,
        always consult a licensed veterinarian.
      </p>
    </section>
  );
}

function GuideCard({ guide, index }: { guide: PetGuide; index: number }) {
  const Icon = guide.icon;
  const glow = useCardGlow({ accentRgb: guide.glow, maxTilt: 4, radius: 220, intensity: 0.2 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <div
        className="glass-surface relative flex h-full flex-col overflow-hidden rounded-[28px] p-6"
        style={{ "--glass-tint": guide.glow, ...glow.tiltStyle } as unknown as React.CSSProperties}
        {...glow.handlers}
      >
        <motion.span className="pointer-events-none absolute inset-0" style={glow.spotlightStyle} />
        <span className="glass-rim" />
        <span className="glass-bloom" />

        {/* Head */}
        <div className="relative flex items-center gap-4">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 shadow-[0_16px_30px_-20px_rgba(0,77,64,0.95)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105"
            style={{ background: guide.wash }}
          >
            <Icon className="h-7 w-7" style={{ color: guide.tint }} />
          </span>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-[#004D40]">
              {guide.species}
            </h3>
            <p className="mt-0.5 text-sm text-[#546E7A]">{guide.tagline}</p>
          </div>
        </div>

        {/* Health */}
        <div className="relative mt-6">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00ACC1]">
            <HeartPulse className="h-3.5 w-3.5" />
            Health
          </p>
          <ul className="mt-3 space-y-2">
            {guide.health.map((item) => (
              <TipItem key={item} tint={guide.tint}>
                {item}
              </TipItem>
            ))}
          </ul>
        </div>

        {/* Nutrition */}
        <div className="relative mt-6">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#00ACC1]">
            <Apple className="h-3.5 w-3.5" />
            Nutrition
          </p>
          <ul className="mt-3 space-y-2">
            {guide.nutrition.map((item) => (
              <TipItem key={item} tint={guide.tint}>
                {item}
              </TipItem>
            ))}
          </ul>
        </div>

        {/* Highlighted tip */}
        <div
          className="relative mt-6 flex items-start gap-3 rounded-2xl border border-white/70 p-4"
          style={{ background: guide.wash }}
        >
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" style={{ color: guide.tint }} />
          <p className="text-sm font-medium leading-relaxed text-[#004D40]">
            {guide.tip}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function TipItem({ children, tint }: { children: React.ReactNode; tint: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-relaxed text-[#546E7A]">
      <span
        aria-hidden="true"
        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: tint }}
      />
      {children}
    </li>
  );
}
