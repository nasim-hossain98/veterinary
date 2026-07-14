"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Stethoscope, Syringe, Hospital, Scissors, Phone, Star } from "lucide-react";
import Image from "next/image";
import ImageReveal from "@/components/ui/ImageReveal";

gsap.registerPlugin(ScrollTrigger);

/* ─── service icons data ─── */
const serviceIcons = [
  { icon: Stethoscope, label: "Therapist",          color: "#00ACC1", glow: "rgba(0,172,193,0.35)" },
  { icon: Syringe,     label: "Vaccination",         color: "#FF8A80", glow: "rgba(255,138,128,0.35)" },
  { icon: Hospital,    label: "Hospital Treatment",  color: "#4DD0E1", glow: "rgba(77,208,225,0.35)" },
  { icon: Scissors,    label: "Surgery",             color: "#BA68C8", glow: "rgba(186,104,200,0.35)" },
];

/* ─── stats ─── */
const stats = [
  { end: 2400, suffix: "+", label: "Licensed Vets" },
  { end: 98,   suffix: "%", label: "Satisfaction"  },
  { end: 24,   suffix: "/7", label: "Availability" },
];

/* ─── animated counter hook (pure GSAP) ─── */
function animateCounter(
  el: HTMLElement,
  end: number,
  suffix: string,
  delay: number
) {
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

export default function Hero() {
  /* ─── refs ─── */
  const sectionRef   = useRef<HTMLElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const word1Ref     = useRef<HTMLSpanElement>(null);
  const word2Ref     = useRef<HTMLSpanElement>(null);
  const word3Ref     = useRef<HTMLSpanElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const searchRef    = useRef<HTMLDivElement>(null);
  const catRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const statEls      = useRef<HTMLSpanElement[]>([]);
  const iconsRef     = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const orb1Ref      = useRef<HTMLDivElement>(null);
  const orb2Ref      = useRef<HTMLDivElement>(null);
  const emergencyRef = useRef<HTMLDivElement>(null);
  const discRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ══════════════════════════════════════════
         ENTRANCE TIMELINE — cinematic storyboard
         ══════════════════════════════════════════ */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // [0.0s] background wrap fades in
      tl.from(wrapRef.current, { opacity: 0, duration: 0.6 }, 0.0);

      // decorative orbs drift in
      tl.from([orb1Ref.current, orb2Ref.current], {
        scale: 0, opacity: 0, duration: 1.2, stagger: 0.2,
      }, 0.0);

      // [0.2s] badge pops in
      tl.from(badgeRef.current, {
        scale: 0.5, opacity: 0, y: -20,
        duration: 0.55, ease: "back.out(2.5)",
      }, 0.2);

      // [0.4s] "Your Pet's" slides up with 3D tilt
      tl.from(word1Ref.current, {
        opacity: 0, y: 60, rotateX: 70, transformOrigin: "center bottom",
        duration: 1.0,
      }, 0.4);

      // [0.6s] "Health," slides up — teal gradient reveals
      tl.from(word2Ref.current, {
        opacity: 0, y: 60, rotateX: 70, transformOrigin: "center bottom",
        duration: 1.0,
      }, 0.6);

      // [0.8s] "Reimagined" slides up — emerald gradient
      tl.from(word3Ref.current, {
        opacity: 0, y: 60, rotateX: 70, transformOrigin: "center bottom",
        duration: 1.0,
      }, 0.8);

      // [1.0s] subtitle fades up
      tl.from(subtitleRef.current, {
        opacity: 0, y: 30, duration: 0.7,
      }, 1.0);

      // [1.2s] search bar scales up + slides
      tl.from(searchRef.current, {
        opacity: 0, y: 20, scale: 0.95, duration: 0.8, ease: "power3.out",
      }, 1.2);

      // CTA buttons
      tl.from(ctaRef.current, {
        opacity: 0, y: 20, duration: 0.6, ease: "power3.out",
      }, 1.35);

      // [1.4s] cat image — ELASTIC bounce from right + 3D rotateY
      tl.from(catRef.current, {
        opacity: 0, x: 120, scale: 0.8, rotateY: 20,
        transformOrigin: "left center",
        duration: 1.2, ease: "elastic.out(1, 0.55)",
      }, 1.4);

      // floating overlay cards
      tl.from(discRef.current, {
        scale: 0, opacity: 0, duration: 0.55, ease: "back.out(2)",
      }, 1.6);
      tl.from(emergencyRef.current, {
        x: 60, opacity: 0, duration: 0.6, ease: "power3.out",
      }, 1.7);

      // [1.8s] stats count up
      tl.add(() => {
        statEls.current.forEach((el, i) => {
          if (el) animateCounter(el, stats[i].end, stats[i].suffix, i * 0.15);
        });
      }, 1.8);
      tl.from(statsRef.current?.children ?? [], {
        opacity: 0, y: 25, stagger: 0.12, duration: 0.6,
      }, 1.8);

      // [2.0s] service icons stagger in
      if (iconsRef.current) {
        tl.from(iconsRef.current.children, {
          opacity: 0, y: 40, scale: 0.6, stagger: 0.12,
          duration: 0.5, ease: "back.out(2)",
        }, 2.0);
      }

      /* ══════════════════════════════════════════
         CONTINUOUS FLOATING — cat bobs forever
         ══════════════════════════════════════════ */
      gsap.to(catRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2.6,
      });

      /* ══════════════════════════════════════════
         PARALLAX ON SCROLL
         ══════════════════════════════════════════ */
      if (titleRef.current && sectionRef.current) {
        gsap.to(titleRef.current, {
          y: -80,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // cat stays pinned slightly longer (slower parallax)
      gsap.to(catRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 pt-6 pb-12 sm:px-6 lg:px-8"
    >
      <div
        ref={wrapRef}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px]"
        style={{
          background:
            "linear-gradient(135deg,#E0F7FA 0%,#B2EBF2 45%,#E1F5FE 100%)",
        }}
      >
        {/* ── Decorative glowing orbs ── */}
        <div
          ref={orb1Ref}
          className="pointer-events-none absolute -top-20 -right-20 h-[480px] w-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,172,193,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          ref={orb2Ref}
          className="pointer-events-none absolute -bottom-24 -left-24 h-[440px] w-[440px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(77,208,225,0.13) 0%, transparent 70%)",
          }}
        />
        {/* extra subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#00ACC1 0,#00ACC1 1px,transparent 0,transparent 60px), repeating-linear-gradient(90deg,#00ACC1 0,#00ACC1 1px,transparent 0,transparent 60px)",
          }}
        />

        {/* ══════════ MAIN TWO-COLUMN ══════════ */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch min-h-[620px]">

          {/* ── LEFT COLUMN (55%) ── */}
          <div className="flex flex-col justify-center px-8 py-14 lg:w-[55%] lg:px-14 lg:py-20">

            {/* Badge */}
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold tracking-wide text-[#00ACC1] border border-[rgba(0,172,193,0.2)] shadow-sm">
                <Stethoscope className="h-3.5 w-3.5" />
                Smart Veterinary Care Platform
              </span>
            </div>

            {/* Headline — word by word, each a separate ref */}
            <h1
              ref={titleRef}
              className="mt-6 font-bold leading-[1.08]"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
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
                className="block mt-3 h-1.5 rounded-full"
                style={{
                  width: "clamp(80px, 15vw, 160px)",
                  background: "linear-gradient(90deg, #00ACC1, #4DD0E1, #00BFA5, #69F0AE)",
                  boxShadow: "0 0 20px rgba(0,172,193,0.35), 0 0 60px rgba(0,183,165,0.15)",
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
            <div ref={searchRef} className="mt-8 max-w-md">
              <div
                className="flex items-center rounded-full bg-white border border-[rgba(0,172,193,0.12)] transition-shadow duration-300 hover:shadow-[0_0_0_3px_rgba(0,172,193,0.15)]"
                style={{ boxShadow: "0 4px 28px rgba(0,172,193,0.14)" }}
              >
                <input
                  type="text"
                  placeholder="Emergency Vet Near Me…"
                  className="flex-1 bg-transparent px-5 py-4 text-sm text-[#004D40] placeholder:text-[#90A4AE] outline-none"
                />
                <button
                  className="mr-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#00ACC1] text-white transition-all hover:bg-[#0097A7] hover:scale-105 active:scale-95"
                  style={{ boxShadow: "0 4px 18px rgba(0,172,193,0.4)" }}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div ref={ctaRef} className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full bg-[#00ACC1] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0097A7] hover:-translate-y-0.5 active:scale-95"
                style={{ boxShadow: "0 8px 24px rgba(0,172,193,0.35)" }}
              >
                <Star className="h-3.5 w-3.5" />
                Consult a Vet
              </a>
              <a
                href="#pharmacy"
                className="inline-flex items-center rounded-full border border-[rgba(0,172,193,0.25)] bg-white/75 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-[#00ACC1] transition-all hover:bg-white hover:shadow-md hover:-translate-y-0.5"
              >
                Pet Pharmacy
              </a>
              <a
                href="#shop"
                className="inline-flex items-center rounded-full border border-[rgba(0,172,193,0.25)] bg-white/75 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-[#00ACC1] transition-all hover:bg-white hover:shadow-md hover:-translate-y-0.5"
              >
                Shop Supplies
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="mt-10 flex flex-wrap gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    ref={(el) => { if (el) statEls.current[i] = el; }}
                    className="text-2xl font-bold text-[#004D40]"
                  >
                    0{stat.suffix}
                  </span>
                  <span className="text-xs font-medium text-[#90A4AE] mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN (45%) ── */}
          <div className="relative flex-1 flex items-center justify-center px-6 py-12 lg:w-[45%] lg:py-8">

            {/* Cat image */}
            <div
              ref={catRef}
              className="relative"
              style={{ perspective: "1200px" }}
            >
              <ImageReveal
                src="/Beautiful cat.png"
                alt="Beautiful cat receiving veterinary care"
                className="w-[400px] h-[450px] sm:w-[500px] sm:h-[560px] lg:w-[580px] lg:h-[650px]"
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 500px, 580px"
                priority
                disableEntrance
              />
            </div>

            {/* 30% Off Badge */}
            <div
              ref={discRef}
              className="absolute top-10 right-6 lg:top-14 lg:right-10 z-10"
              style={{ animation: "heroFloat 3s ease-in-out 2.6s infinite alternate" }}
            >
              <div
                className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#01579B] text-white"
                style={{ boxShadow: "0 8px 28px rgba(1,87,155,0.4)" }}
              >
                <div className="text-center leading-tight">
                  <span className="block text-lg font-bold">30%</span>
                  <span className="block text-[9px] font-bold uppercase tracking-wider">
                    OFF
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency pill */}
            <div
              ref={emergencyRef}
              className="absolute bottom-14 right-4 lg:bottom-16 lg:right-6 z-10"
            >
              <div
                className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 border border-red-100"
                style={{
                  boxShadow: "0 4px 18px rgba(251,113,133,0.25)",
                  animation: "emergencyPulse 2s ease-in-out 3s infinite",
                }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 shrink-0">
                  <Phone className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
                    Emergency
                  </p>
                  <p className="text-xs font-bold text-[#004D40]">
                    1-800-VET-911
                  </p>
                </div>
              </div>
            </div>

            {/* Social bar */}
            <div className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 flex-col gap-3 z-10">
              {[
                {
                  label: "Instagram",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: "Twitter",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ),
                },
                {
                  label: "Facebook",
                  svg: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm border border-[rgba(0,172,193,0.12)] text-[#546E7A] transition-all hover:bg-white hover:text-[#00ACC1] hover:shadow-md hover:-translate-y-0.5"
                  aria-label={s.label}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ BOTTOM SERVICE ICONS ══════════ */}
        <div ref={iconsRef} className="relative px-8 pb-10 lg:px-14">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-start lg:gap-12">
            {serviceIcons.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.label}
                  className="flex flex-col items-center gap-2 cursor-default group"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{
                      backgroundColor: service.color,
                      boxShadow: `0 8px 24px ${service.glow}`,
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-[#546E7A] group-hover:text-[#004D40] transition-colors">
                    {service.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Keyframe animations (injected once via style tag) ── */}
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
    </section>
  );
}
