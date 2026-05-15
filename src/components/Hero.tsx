"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Search,
  Stethoscope,
  Syringe,
  Hospital,
  Scissors,
  Phone,
} from "lucide-react";
import Image from "next/image";

/* ─── animation variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

/* ─── service icons data ─── */
const serviceIcons = [
  { icon: Stethoscope, label: "Therapist", color: "#00ACC1" },
  { icon: Syringe, label: "Vaccination", color: "#FF8A80" },
  { icon: Hospital, label: "Hospital Treatment", color: "#4DD0E1" },
  { icon: Scissors, label: "Surgery", color: "#BA68C8" },
];

/* ─── stats ─── */
const stats = [
  { value: "2,400+", label: "Licensed Vets" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Availability" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Mouse parallax ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Image layer: ±15px opposite cursor
  const imgX = useTransform(smoothX, [-1, 1], [15, -15]);
  const imgY = useTransform(smoothY, [-1, 1], [15, -15]);

  // Badge layer: ±25px opposite cursor (deeper parallax)
  const badgeX = useTransform(smoothX, [-1, 1], [25, -25]);
  const badgeY = useTransform(smoothY, [-1, 1], [25, -25]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section className="w-full px-4 pt-6 pb-12 sm:px-6 lg:px-8">
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px]"
        style={{
          background:
            "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 40%, #E1F5FE 100%)",
        }}
      >
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,172,193,0.12),transparent_70%)]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(77,208,225,0.08),transparent_70%)]" />
        </div>

        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch min-h-[600px]">
          {/* ── LEFT COLUMN (55%) ── */}
          <div className="flex flex-col justify-center px-8 py-12 lg:w-[55%] lg:px-14 lg:py-16">
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold tracking-wide text-[#00ACC1] border border-[rgba(0,172,193,0.15)]">
                <Stethoscope className="h-3.5 w-3.5" />
                Smart Veterinary Care Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-[#004D40] sm:text-5xl lg:text-6xl"
            >
              Your Pet&apos;s Health,{" "}
              <span className="bg-gradient-to-r from-[#00ACC1] to-[#4DD0E1] bg-clip-text text-transparent">
                Reimagined
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-lg text-base leading-relaxed text-[#546E7A] sm:text-lg"
            >
              Telehealth, pharmacy, and emergency care — all in one intelligent
              platform built for modern pet parents.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeUp} className="mt-8 max-w-md">
              <div className="flex items-center rounded-full bg-white shadow-[0_4px_24px_rgba(0,172,193,0.12)] border border-[rgba(0,172,193,0.08)]">
                <input
                  type="text"
                  placeholder="Emergency Vet Near Me"
                  className="flex-1 bg-transparent px-5 py-3.5 text-sm text-[#004D40] placeholder:text-[#90A4AE] outline-none"
                />
                <button className="mr-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#00ACC1] text-white transition-colors hover:bg-[#0097A7] shadow-lg shadow-[rgba(0,172,193,0.3)]">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a
                href="#services"
                className="inline-flex items-center rounded-full bg-[#00ACC1] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(0,172,193,0.3)] transition-all hover:bg-[#0097A7] hover:shadow-[rgba(0,172,193,0.4)]"
              >
                Consult a Vet
              </a>
              <a
                href="#pharmacy"
                className="inline-flex items-center rounded-full border border-[rgba(0,172,193,0.2)] bg-white/70 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-[#00ACC1] transition-all hover:bg-white hover:shadow-md"
              >
                Pet Pharmacy
              </a>
              <a
                href="#shop"
                className="inline-flex items-center rounded-full border border-[rgba(0,172,193,0.2)] bg-white/70 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-[#00ACC1] transition-all hover:bg-white hover:shadow-md"
              >
                Shop Supplies
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-[#004D40]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#90A4AE] font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (45%) ── */}
          <div className="relative flex-1 flex items-center justify-center px-8 py-12 lg:w-[45%] lg:px-4 lg:py-8">
            {/* Main Image with parallax + float + 3D tilt */}
            <motion.div
              variants={slideRight}
              className="relative"
              style={{
                perspective: 1000,
                x: imgX,
                y: imgY,
              }}
            >
              <motion.div
                animate={{
                  y: [-10, 10],
                  scale: [1, 1.02],
                }}
                transition={{
                  y: {
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  scale: {
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
                whileHover={{
                  rotateX: 5,
                  rotateY: -5,
                  transition: { type: "spring", stiffness: 200, damping: 20 },
                }}
                className="relative"
              >
                <div className="relative w-[280px] h-[320px] sm:w-[340px] sm:h-[380px] lg:w-[380px] lg:h-[420px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,172,193,0.25)] border border-white/40">
                  <Image
                    src="/Beautiful cat.png"
                    alt="Beautiful cat receiving veterinary care"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* 30% Off Badge — floating with parallax */}
            <motion.div
              variants={popIn}
              animate={{
                y: [-15, 15],
                rotate: [-5, 5],
              }}
              transition={{
                y: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                },
                rotate: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                },
              }}
              style={{ x: badgeX, y: badgeY }}
              className="absolute top-12 right-8 lg:top-16 lg:right-12 z-10"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#01579B] text-white shadow-lg shadow-[rgba(1,87,155,0.3)]">
                <div className="text-center leading-tight">
                  <span className="block text-lg font-bold">30%</span>
                  <span className="block text-[9px] font-semibold uppercase tracking-wider">
                    OFF
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Emergency Pill — slide in + pulse */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="absolute bottom-16 right-6 lg:bottom-20 lg:right-8 z-10"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(251,113,133,0.4)",
                    "0 0 0 8px rgba(251,113,133,0)",
                    "0 0 0 0 rgba(251,113,133,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-lg border border-red-100"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
                  <Phone className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-red-500 uppercase tracking-wider">
                    Emergency
                  </p>
                  <p className="text-xs font-bold text-[#004D40]">
                    1-800-VET-911
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── SOCIAL BAR (far right edge) ── */}
          <motion.div
            variants={fadeUp}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-3 z-10"
          >
            {/* Instagram */}
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm border border-[rgba(0,172,193,0.1)] text-[#546E7A] transition-all hover:bg-white hover:text-[#00ACC1] hover:shadow-md"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm border border-[rgba(0,172,193,0.1)] text-[#546E7A] transition-all hover:bg-white hover:text-[#00ACC1] hover:shadow-md"
              aria-label="Twitter"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm border border-[rgba(0,172,193,0.1)] text-[#546E7A] transition-all hover:bg-white hover:text-[#00ACC1] hover:shadow-md"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ── BOTTOM SERVICE ICONS ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative px-8 pb-10 lg:px-14"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-start lg:gap-12">
            {serviceIcons.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.label}
                  variants={fadeUp}
                  custom={i}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
                    style={{
                      backgroundColor: service.color,
                      boxShadow: `0 8px 24px ${service.color}40`,
                    }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-[#546E7A]">
                    {service.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
