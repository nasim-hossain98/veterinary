"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  Award,
  Heart,
  Hospital,
  PawPrint,
  Phone,
  Scissors,
  Search,
  ShieldCheck,
  Star,
  Stethoscope,
  Syringe,
} from "lucide-react";
import SceneShell from "@/components/experience/SceneShell";
import ScrollCue from "@/components/experience/ScrollCue";
import FloatChip from "@/components/world/FloatChip";
import { TONE_RGB, type GlassTone } from "@/components/world/GlassSurface";
import { useCardGlow } from "@/components/ui/useCardGlow";
import { prefersReducedMotion } from "@/lib/depthScene";

gsap.registerPlugin(ScrollTrigger);

/* ─── existing service icons (content unchanged) ─── */
const serviceIcons = [
  { icon: Stethoscope, label: "Therapist", color: "#00ACC1", glow: "rgba(0,172,193,0.35)" },
  { icon: Syringe, label: "Vaccination", color: "#FF8A80", glow: "rgba(255,138,128,0.35)" },
  { icon: Hospital, label: "Hospital Treatment", color: "#4DD0E1", glow: "rgba(77,208,225,0.35)" },
  { icon: Scissors, label: "Surgery", color: "#BA68C8", glow: "rgba(186,104,200,0.35)" },
];

/* ─── existing statistics (content unchanged) ─── */
const stats: {
  end: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  tone: GlassTone;
}[] = [
  { end: 2400, suffix: "+", label: "Happy Pets", icon: Heart, tone: "teal" },
  { end: 98, suffix: "%", label: "Satisfaction Rate", icon: ShieldCheck, tone: "cyan" },
  { end: 24, suffix: "/7", label: "Emergency Care", icon: Activity, tone: "coral" },
  { end: 5, suffix: "+", label: "Vet Specialists", icon: Award, tone: "violet" },
];

/* ─── animated counter (pure GSAP) ─── */
function animateCounter(el: HTMLElement, end: number, suffix: string, delay: number) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: end,
    duration: 2.2,
    delay,
    ease: "power2.out",
    onUpdate() {
      el.textContent = Math.round(obj.val).toLocaleString() + suffix;
    },
  });
}
/**
 * Hero — Scene 01, and the entrance to the world.
 *
 * Composition follows the reference: a soft glass dome cradles the pet as the
 * single focal point, small UI chips orbit it at their own depths, and the
 * copy/CTA/statistics stack asymmetrically to the left. The pet is a true
 * cut-out PNG, so it reads as an object *inside* the space rather than a
 * framed photograph.
 *
 * Depth: the whole stage is one scene (`SceneShell`), so every `data-depth`
 * child parallaxes through the world as you scroll. This component owns only
 * the one-off entrance choreography and the pet's idle breathing — scroll
 * movement is deliberately left to the scene system so nothing fights over
 * the same transform.
 *
 * Accessibility: `prefers-reduced-motion` skips the timeline entirely.
 * Because the timeline uses `gsap.from`, skipping it leaves the hero in its
 * final, fully-visible state.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statEls = useRef<HTMLSpanElement[]>([]);
  const iconsRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);
  const emergencyRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);

  /* Gentle pointer tilt on the pet — disabled for touch + reduced motion. */
  const petTilt = useCardGlow({ accentRgb: "0,172,193", maxTilt: 4, radius: 320, intensity: 0.14 });

  useEffect(() => {
    /* Reduced motion: render the final state, animate nothing. */
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(wrapRef.current, { opacity: 0, duration: 0.7 }, 0);
      tl.from(domeRef.current, { scale: 0.62, opacity: 0, duration: 1.4, ease: "power3.out" }, 0);

      tl.from(badgeRef.current, {
        scale: 0.5, opacity: 0, y: -22, duration: 0.55, ease: "back.out(2.4)",
      }, 0.2);

      /* Headline slides up word by word, each out of its own depth plane */
      tl.from(word1Ref.current, {
        opacity: 0, y: 62, rotateX: 72, transformOrigin: "center bottom", duration: 1,
      }, 0.4);
      tl.from(word2Ref.current, {
        opacity: 0, y: 62, rotateX: 72, transformOrigin: "center bottom", duration: 1,
      }, 0.55);
      tl.from(word3Ref.current, {
        opacity: 0, y: 62, rotateX: 72, transformOrigin: "center bottom", duration: 1,
      }, 0.7);
      tl.from(ruleRef.current, {
        scaleX: 0, opacity: 0, duration: 0.9, transformOrigin: "left center",
      }, 0.95);

      tl.from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.7 }, 1.0);
      tl.from(searchRef.current, {
        opacity: 0, y: 22, scale: 0.96, duration: 0.75, ease: "power3.out",
      }, 1.15);
      tl.from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, 1.3);

      /* The pet lands with a soft elastic settle, then breathes forever */
      tl.from(catRef.current, {
        opacity: 0, y: 90, scale: 0.82, duration: 1.3, ease: "elastic.out(1, 0.6)",
      }, 1.05);
      tl.from(discRef.current, {
        scale: 0, opacity: 0, duration: 0.55, ease: "back.out(2)",
      }, 1.8);
      tl.from(emergencyRef.current, {
        x: 60, opacity: 0, duration: 0.6, ease: "power3.out",
      }, 1.9);

      tl.add(() => {
        statEls.current.forEach((el, i) => {
          if (el) animateCounter(el, stats[i].end, stats[i].suffix, i * 0.15);
        });
      }, 1.85);
      tl.from(statsRef.current?.children ?? [], {
        opacity: 0, y: 26, stagger: 0.12, duration: 0.6,
      }, 1.85);

      if (iconsRef.current) {
        tl.from(iconsRef.current.children, {
          opacity: 0, y: 40, scale: 0.6, stagger: 0.1, duration: 0.5, ease: "back.out(2)",
        }, 2.05);
      }

      gsap.to(catRef.current, {
        y: -14, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <SceneShell
      id="home"
      label="Intro"
      eyebrow="Scene 01"
      tone="teal"
      intensity={0.7}
      camera={1.6}
      sectionRef={sectionRef}
      className="w-full px-4 pt-2 pb-16 sm:px-6 lg:px-8"
    >
      <div ref={wrapRef} className="relative mx-auto max-w-[1400px]">
        {/* Focal halo — lifts the whole composition out of the world */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[42%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.18) 46%, rgba(255,255,255,0) 70%)",
          }}
        />
        {/* Horizon arc — the reference's soft ground line */}
        <div
          aria-hidden="true"
          data-depth="0.24"
          className="pointer-events-none absolute inset-x-[-6%] bottom-[4%] h-[240px] rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.85) 0%, rgba(178,235,242,0.45) 42%, transparent 72%)",
          }}
        />

        <div className="relative grid grid-cols-1 items-center gap-12 px-4 pt-8 lg:min-h-[780px] lg:grid-cols-[1.04fr_0.96fr] lg:gap-6 lg:px-8 lg:pt-4">
          {/* ══════════ LEFT · copy, actions, numbers ══════════ */}
          <div data-depth="0.4" className="relative z-10 flex flex-col items-start">
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#00ACC1] shadow-[0_12px_34px_-20px_rgba(0,77,64,0.6)] backdrop-blur-sm">
                <Stethoscope className="h-3.5 w-3.5" />
                Premium Pet Care Services
              </span>
            </div>

            <h1
              className="mt-6 font-bold leading-[1.06]"
              style={{
                fontSize: "clamp(2.45rem, 5.4vw, 4.4rem)",
                perspective: "800px",
                letterSpacing: "-0.03em",
              }}
            >
              <span
                ref={word1Ref}
                className="inline-block"
                style={{
                  display: "block",
                  background: "linear-gradient(135deg, #004D40 0%, #1A6B5A 50%, #2E7D6F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 4px rgba(0,77,64,0.15))",
                }}
              >
                Your Pet&apos;s
              </span>
              <span
                ref={word2Ref}
                className="inline-block"
                style={{
                  display: "block",
                  background: "linear-gradient(90deg, #00ACC1 0%, #4DD0E1 50%, #00E5FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 3px 12px rgba(0,172,193,0.35))",
                }}
              >
                Health,
              </span>
              <span
                ref={word3Ref}
                className="inline-block"
                style={{
                  display: "block",
                  background: "linear-gradient(90deg, #00897B 0%, #00BFA5 50%, #69F0AE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% auto",
                  animation: "shimmer 4s linear infinite",
                  filter: "drop-shadow(0 3px 12px rgba(0,137,123,0.35))",
                }}
              >
                Reimagined
              </span>

              {/* Decorative gradient accent line */}
              <span
                ref={ruleRef}
                className="mt-4 block h-1.5 rounded-full"
                style={{
                  width: "clamp(84px, 15vw, 170px)",
                  background: "linear-gradient(90deg, #00ACC1, #4DD0E1, #00BFA5, #69F0AE)",
                  boxShadow: "0 0 22px rgba(0,172,193,0.4), 0 0 60px rgba(0,183,165,0.16)",
                  animation: "glowPulse 3s ease-in-out infinite",
                  transformOrigin: "left center",
                }}
              />
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mt-5 max-w-lg text-base leading-relaxed text-[#546E7A] sm:text-lg"
            >
              Telehealth, pharmacy, and emergency care — all in one intelligent
              platform built for modern pet parents.
            </p>

            {/* Search bar */}
            <div ref={searchRef} className="mt-8 w-full max-w-md">
              <div className="flex items-center rounded-full border border-white/70 bg-white/80 shadow-[0_18px_44px_-26px_rgba(0,77,64,0.55)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_0_3px_rgba(0,172,193,0.15),0_18px_44px_-26px_rgba(0,77,64,0.55)]">
                <input
                  type="text"
                  placeholder="Emergency Vet Near Me…"
                  aria-label="Search for a vet or service"
                  className="flex-1 bg-transparent px-5 py-4 text-sm text-[#004D40] outline-none placeholder:text-[#90A4AE]"
                />
                <button
                  type="button"
                  aria-label="Search"
                  className="mr-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#00ACC1] text-white transition-all hover:scale-105 hover:bg-[#0097A7] active:scale-95"
                  style={{ boxShadow: "0 4px 18px rgba(0,172,193,0.4)" }}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#doctors"
                className="inline-flex items-center gap-2 rounded-full bg-[#00ACC1] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#0097A7] active:scale-95"
                style={{ boxShadow: "0 10px 30px -10px rgba(0,172,193,0.65)" }}
              >
                <Star className="h-3.5 w-3.5" />
                Book an Appointment
              </a>
              <a
                href="#services"
                className="inline-flex items-center rounded-full border border-white/70 bg-white/70 px-6 py-3 text-sm font-semibold text-[#00ACC1] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                Explore Services
              </a>
            </div>

            {/* Statistics — floating glass panels */}
            <div ref={statsRef} className="mt-10 grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                const rgb = TONE_RGB[stat.tone];
                return (
                  <div
                    key={stat.label}
                    data-depth={String(0.5 + i * 0.15)}
                    className="glass-surface flex flex-col gap-1 rounded-2xl px-4 py-3.5"
                    style={{ "--glass-tint": rgb } as React.CSSProperties}
                  >
                    <Icon className="h-4 w-4" style={{ color: `rgb(${rgb})` }} aria-hidden="true" />
                    <span
                      ref={(el) => {
                        if (el) statEls.current[i] = el;
                      }}
                      className="text-xl font-bold tabular-nums tracking-tight text-[#004D40] sm:text-2xl"
                    >
                      0
                    </span>
                    <span className="text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#546E7A]">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════════ RIGHT · the pet, held in a glass dome ══════════ */}
          <div data-depth="0.72" className="relative z-10 flex items-center justify-center">
            <div className="relative" style={{ perspective: "1400px" }}>
              {/* ── Glass dome: the pet's world ── */}
              <div
                ref={domeRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-8%] left-[-26%] right-[-26%] top-[-8%] rounded-full border border-white/55"
                style={{
                  background:
                    "radial-gradient(circle at 36% 28%, rgba(255,255,255,0.96) 0%, rgba(224,247,250,0.9) 32%, rgba(155,226,239,0.62) 62%, rgba(0,172,193,0.16) 100%)",
                  boxShadow:
                    "0 70px 150px -70px rgba(0,77,64,0.62), inset 0 -34px 90px -44px rgba(0,172,193,0.55), inset 0 2px 0 rgba(255,255,255,0.9)",
                }}
              >
                {/* Specular highlight */}
                <span
                  className="absolute left-[13%] top-[7%] h-[30%] w-[36%] rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)",
                    filter: "blur(10px)",
                  }}
                />
                {/* Concentric depth rings inside the dome */}
                {[1, 0.78, 0.56].map((scale, i) => (
                  <span
                    key={scale}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                    style={{
                      width: `${scale * 100}%`,
                      height: `${scale * 100}%`,
                      borderColor: `rgba(255,255,255,${0.5 - i * 0.12})`,
                    }}
                  />
                ))}
              </div>

              {/* Contact shadow — grounds the pet on the dome floor */}
              <span
                aria-hidden="true"
                className="absolute bottom-[2%] left-1/2 h-[6%] w-[52%] -translate-x-1/2 rounded-[50%]"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,77,64,0.3) 0%, transparent 70%)",
                  filter: "blur(12px)",
                }}
              />

              {/* ── The pet ── */}
              <div ref={catRef} className="relative z-10" {...petTilt.handlers}>
                <motion.div style={petTilt.tiltStyle} className="relative">
                  <Image
                    src="/hero-cat.png"
                    alt="A cat receiving veterinary care"
                    width={798}
                    height={1100}
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 430px"
                    className="h-auto w-[260px] select-none object-contain drop-shadow-[0_46px_60px_rgba(0,77,64,0.38)] sm:w-[340px] lg:w-[430px]"
                  />
                </motion.div>
              </div>

              {/* ── Orbiting UI chips (their own depth layer) ── */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
                <FloatChip
                  icon={Heart}
                  label="Healthy Pets"
                  detail="Happy Lives"
                  tone="teal"
                  depth={1.15}
                  delay={1.95}
                  className="absolute right-[-1rem] top-[30%] sm:right-[-2.5rem]"
                />
                <FloatChip
                  icon={Activity}
                  label="Live Vitals"
                  detail="Monitored"
                  tone="cyan"
                  depth={1.3}
                  delay={2.1}
                  className="absolute left-[-1.5rem] top-[15%] sm:left-[-3.5rem]"
                />
                <FloatChip
                  icon={PawPrint}
                  label="Grooming"
                  detail="In-clinic"
                  tone="violet"
                  depth={1.2}
                  delay={2.25}
                  className="absolute bottom-[22%] left-[-0.75rem] hidden sm:block sm:left-[-4rem]"
                />
                <FloatChip
                  icon={ShieldCheck}
                  label="Vaccinated"
                  detail="Up to date"
                  tone="coral"
                  depth={1.35}
                  delay={2.4}
                  className="absolute bottom-[34%] right-[-0.5rem] hidden sm:block sm:right-[-3rem]"
                />
              </div>

              {/* ── 30% Off badge ── */}
              <div
                ref={discRef}
                className="absolute right-[-0.5rem] top-[2%] z-20 lg:right-[-1.5rem]"
                style={{ animation: "heroFloat 3s ease-in-out 2.6s infinite alternate" }}
              >
                <div
                  className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#01579B] text-white"
                  style={{ boxShadow: "0 12px 34px -12px rgba(1,87,155,0.75)" }}
                >
                  <div className="text-center leading-tight">
                    <span className="block text-lg font-bold">30%</span>
                    <span className="block text-[9px] font-bold uppercase tracking-wider">OFF</span>
                  </div>
                </div>
              </div>

              {/* ── Emergency pill ── */}
              <div
                ref={emergencyRef}
                className="absolute bottom-[6%] right-[-0.5rem] z-20 lg:right-[-1rem]"
              >
                <div
                  className="flex items-center gap-2.5 rounded-full border border-red-100 bg-white/90 px-4 py-2.5 backdrop-blur-sm"
                  style={{
                    boxShadow: "0 4px 18px rgba(251,113,133,0.25)",
                    animation: "emergencyPulse 2s ease-in-out 3s infinite",
                  }}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500">
                    <Phone className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">Emergency</p>
                    <p className="text-xs font-bold text-[#004D40]">1-800-VET-911</p>
                  </div>
                </div>
              </div>

              {/* ── Social rail ── */}
              <div className="absolute right-[-3.5rem] top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
                {[
                  {
                    label: "Instagram",
                    path: (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                      </>
                    ),
                  },
                  {
                    label: "Twitter",
                    path: (
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    ),
                  },
                  {
                    label: "Facebook",
                    path: (
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[#546E7A] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#00ACC1] hover:shadow-md"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {s.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll cue — the invitation into the world ── */}
        <div data-depth="0.5" className="mt-2 flex justify-center lg:mt-0">
          <ScrollCue href="#services" />
        </div>

        {/* ══════════ Service icon strip ══════════ */}
        <div ref={iconsRef} className="relative mt-10 px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-start lg:gap-14">
            {serviceIcons.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.label}
                  className="group flex cursor-default flex-col items-center gap-2"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                    style={{
                      backgroundColor: service.color,
                      boxShadow: `0 10px 28px -10px ${service.glow}`,
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-[#546E7A] transition-colors group-hover:text-[#004D40]">
                    {service.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Keyframes (injected once) ── */}
      <style>{`
        @keyframes heroFloat {
          from { transform: translateY(0px) rotate(-3deg); }
          to   { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes emergencyPulse {
          0%, 100% { box-shadow: 0 4px 18px rgba(251,113,133,0.25); }
          50%       { box-shadow: 0 4px 24px rgba(251,113,133,0.55), 0 0 0 6px rgba(251,113,133,0.08); }
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scaleX(1); }
          50%      { opacity: 1;   transform: scaleX(1.08); }
        }
      `}</style>
    </SceneShell>
  );
}


