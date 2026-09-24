"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope, HeartPulse, Syringe, Bone, Brain, Eye, Microscope, PawPrint,
  ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";
import { useCardGlow } from "@/components/ui/useCardGlow";
import SceneShell from "@/components/experience/SceneShell";

interface Doctor {
  id: string; name: string; title: string; role: string; specialization: string;
  specIcon: React.ElementType; yearsExp: number; isOnline: boolean;
  rating: number; reviews: number; avatar: string;
}

const doctors: Doctor[] = [
  { id:"1", name:"Dr. Sarah Mitchell", title:"DVM, DACVIM", role:"Veterinarian", specialization:"Internal Medicine", specIcon:HeartPulse, yearsExp:14, isOnline:true, rating:4.9, reviews:342, avatar:"SM" },
  { id:"2", name:"Dr. James Chen", title:"DVM, MS", role:"Veterinarian", specialization:"Orthopedic Surgery", specIcon:Bone, yearsExp:11, isOnline:false, rating:4.8, reviews:218, avatar:"JC" },
  { id:"3", name:"Dr. Emily Rodriguez", title:"DVM, DACVD", role:"Veterinarian", specialization:"Dermatology", specIcon:Microscope, yearsExp:9, isOnline:true, rating:4.9, reviews:276, avatar:"ER" },
  { id:"4", name:"Dr. Michael Okafor", title:"DVM, PhD", role:"Veterinarian", specialization:"Neurology", specIcon:Brain, yearsExp:16, isOnline:false, rating:5.0, reviews:189, avatar:"MO" },
  { id:"5", name:"Dr. Lisa Park", title:"DVM, DACVO", role:"Veterinarian", specialization:"Ophthalmology", specIcon:Eye, yearsExp:8, isOnline:true, rating:4.7, reviews:154, avatar:"LP" },
  { id:"6", name:"Dr. David Moreau", title:"DVM, DACVS", role:"Veterinarian", specialization:"Soft Tissue Surgery", specIcon:Syringe, yearsExp:13, isOnline:true, rating:4.8, reviews:298, avatar:"DM" },
  { id:"7", name:"Dr. Aisha Patel", title:"DVM, CVA", role:"Veterinarian", specialization:"Holistic & Acupuncture", specIcon:PawPrint, yearsExp:10, isOnline:false, rating:4.9, reviews:201, avatar:"AP" },
  { id:"8", name:"Dr. Thomas Wright", title:"DVM, DACVECC", role:"Veterinarian", specialization:"Emergency & Critical Care", specIcon:Stethoscope, yearsExp:18, isOnline:true, rating:5.0, reviews:412, avatar:"TW" },
];

export default function ExpertiseCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);
  const scroll = (dir: "left"|"right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <SceneShell
      id="experts"
      label="Experts"
      eyebrow="Scene 06"
      tone="violet"
      intensity={0.85}
      className="relative w-full px-6 py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl" data-depth="0.5">
        {/* ── Header: title left, "View All" right ── */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.2 }}
          transition={{ duration:0.7 }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#00ACC1]">Our Veterinarians</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">Meet the Doctors</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">
              Our team of experienced veterinarians is dedicated to providing the
              best care for your pets, every step of the way.
            </p>
          </div>
          <a
            href="#experts"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(0,172,193,0.2)] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#00ACC1] shadow-[0_10px_30px_-18px_rgba(0,77,64,0.5)] backdrop-blur-sm transition-all hover:bg-white hover:shadow-[0_14px_34px_-16px_rgba(0,172,193,0.5)]"
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* ── Carousel with side arrows ── */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:0.2 }}
          transition={{ duration:0.7, delay:0.1 }}
          className="relative"
        >
          {/* Prev */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous doctors"
            className={`absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all sm:flex ${
              canScrollLeft
                ? "border-[rgba(0,172,193,0.18)] bg-white/90 text-[#004D40] shadow-[0_12px_30px_-16px_rgba(0,77,64,0.6)] backdrop-blur hover:bg-white hover:text-[#00ACC1]"
                : "cursor-not-allowed border-[rgba(0,172,193,0.06)] bg-white/50 text-[#B0BEC5]"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next doctors"
            className={`absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border transition-all sm:flex ${
              canScrollRight
                ? "border-[rgba(0,172,193,0.18)] bg-white/90 text-[#004D40] shadow-[0_12px_30px_-16px_rgba(0,77,64,0.6)] backdrop-blur hover:bg-white hover:text-[#00ACC1]"
                : "cursor-not-allowed border-[rgba(0,172,193,0.06)] bg-white/50 text-[#B0BEC5]"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory [perspective:1600px]"
            style={{ scrollbarWidth:"none", msOverflowStyle:"none" }}
          >
            <div className="shrink-0 w-0 lg:w-[calc((100vw-1280px)/2-24px)]" />
            {doctors.map((d, i) => <DoctorCard key={d.id} doctor={d} index={i} />)}
            <div className="shrink-0 w-6 lg:w-[calc((100vw-1280px)/2-24px)]" />
          </div>
        </motion.div>

        {/* Mobile nav arrows */}
        <div className="mt-2 flex justify-center gap-3 sm:hidden">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous doctors"
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${canScrollLeft ? "border-[rgba(0,172,193,0.18)] bg-white text-[#004D40]" : "cursor-not-allowed border-[rgba(0,172,193,0.06)] bg-white/50 text-[#B0BEC5]"}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next doctors"
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${canScrollRight ? "border-[#00ACC1]/30 bg-[#00ACC1]/10 text-[#00ACC1]" : "cursor-not-allowed border-[rgba(0,172,193,0.06)] bg-white/50 text-[#B0BEC5]"}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {doctors.map((_, i) => (
            <div key={i} className="h-1.5 rounded-full transition-all" style={{ width: i===0?"24px":"6px", backgroundColor: i===0?"#00ACC1":"rgba(0,172,193,0.2)" }} />
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  const glow = useCardGlow({ accentRgb: "0,172,193", maxTilt: 4 });

  /* Shallow 3D arc so the row reads as an arrangement floating in the world
     rather than a flat filmstrip. Tilt is kept subtle on purpose. */
  const arc = ((index % 3) - 1) * 3;
  const rise = (1 - Math.abs(arc) / 3) * 14;

  return (
    <div
      className="shrink-0 snap-start"
      style={{
        transform: `perspective(1600px) rotateY(${arc}deg) translateZ(${rise}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -8, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
        style={{ ...glow.tiltStyle }}
        {...glow.handlers}
        className="group relative h-full"
      >
        <div
          className="glass-surface relative flex h-full w-[256px] flex-col items-center overflow-hidden rounded-[28px] px-6 py-8 text-center"
          style={{ "--glass-tint": "0,172,193" } as React.CSSProperties}
        >
          {/* Cursor-following spotlight glow */}
          <motion.div className="pointer-events-none absolute inset-0" style={glow.spotlightStyle} />
          {/* Shimmer sweep on hover */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <div className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 -translate-x-full transition-all duration-700 ease-out group-hover:translate-x-[360%] group-hover:opacity-100" />
          </div>

          {/* ── Avatar ── */}
          <div className="relative">
            {/* soft halo that blooms on hover */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#00ACC1]/25 to-[#4DD0E1]/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            {/* thin brand ring */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[#00ACC1]/70 via-[#4DD0E1]/60 to-[#B2EBF2]/50" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#B2EBF2] to-[#E0F7FA] shadow-[0_14px_34px_-16px_rgba(0,77,64,0.6)]">
              <span className="text-2xl font-light text-[#004D40]">{doctor.avatar}</span>
            </div>
            {doctor.isOnline && (
              <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            )}
          </div>

          {/* ── Details ── */}
          <h3 className="relative mt-5 text-base font-semibold tracking-tight text-[#004D40]">{doctor.name}</h3>
          <p className="relative mt-1 text-xs font-medium text-[#00ACC1]">{doctor.role}</p>
          <p className="relative mt-0.5 text-xs text-[#90A4AE]">{doctor.yearsExp}+ Years</p>

          <a
            href="#experts"
            className="relative mt-5 inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,172,193,0.2)] bg-[#E0F7FA]/60 px-5 py-2 text-xs font-semibold text-[#00ACC1] transition-all hover:gap-2.5 hover:bg-[#00ACC1]/10"
          >
            View Profile
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
