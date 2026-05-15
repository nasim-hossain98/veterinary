"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope, HeartPulse, Syringe, Bone, Brain, Eye, Microscope, PawPrint,
  ChevronLeft, ChevronRight,
} from "lucide-react";

interface Doctor {
  id: string; name: string; title: string; specialization: string;
  specIcon: React.ElementType; yearsExp: number; isOnline: boolean;
  rating: number; reviews: number; avatar: string;
}

const doctors: Doctor[] = [
  { id:"1", name:"Dr. Sarah Mitchell", title:"DVM, DACVIM", specialization:"Internal Medicine", specIcon:HeartPulse, yearsExp:14, isOnline:true, rating:4.9, reviews:342, avatar:"SM" },
  { id:"2", name:"Dr. James Chen", title:"DVM, MS", specialization:"Orthopedic Surgery", specIcon:Bone, yearsExp:11, isOnline:false, rating:4.8, reviews:218, avatar:"JC" },
  { id:"3", name:"Dr. Emily Rodriguez", title:"DVM, DACVD", specialization:"Dermatology", specIcon:Microscope, yearsExp:9, isOnline:true, rating:4.9, reviews:276, avatar:"ER" },
  { id:"4", name:"Dr. Michael Okafor", title:"DVM, PhD", specialization:"Neurology", specIcon:Brain, yearsExp:16, isOnline:false, rating:5.0, reviews:189, avatar:"MO" },
  { id:"5", name:"Dr. Lisa Park", title:"DVM, DACVO", specialization:"Ophthalmology", specIcon:Eye, yearsExp:8, isOnline:true, rating:4.7, reviews:154, avatar:"LP" },
  { id:"6", name:"Dr. David Moreau", title:"DVM, DACVS", specialization:"Soft Tissue Surgery", specIcon:Syringe, yearsExp:13, isOnline:true, rating:4.8, reviews:298, avatar:"DM" },
  { id:"7", name:"Dr. Aisha Patel", title:"DVM, CVA", specialization:"Holistic & Acupuncture", specIcon:PawPrint, yearsExp:10, isOnline:false, rating:4.9, reviews:201, avatar:"AP" },
  { id:"8", name:"Dr. Thomas Wright", title:"DVM, DACVECC", specialization:"Emergency & Critical Care", specIcon:Stethoscope, yearsExp:18, isOnline:true, rating:5.0, reviews:412, avatar:"TW" },
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
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);
  const scroll = (dir: "left"|"right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="w-full px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.7 }} className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#00ACC1]">Our Experts</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">Meet the Doctors</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">Board-certified specialists with years of experience, available for consultations when you need them.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${canScrollLeft ? "border-[rgba(0,172,193,0.15)] bg-white text-[#546E7A] hover:bg-[#E0F7FA] shadow-sm" : "border-[rgba(0,172,193,0.05)] bg-[#E0F7FA]/50 text-[#90A4AE] cursor-not-allowed"}`}><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => scroll("right")} disabled={!canScrollRight} className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${canScrollRight ? "border-[#00ACC1]/30 bg-[#00ACC1]/10 text-[#00ACC1] hover:bg-[#00ACC1]/20" : "border-[rgba(0,172,193,0.05)] bg-[#E0F7FA]/50 text-[#90A4AE] cursor-not-allowed"}`}><ChevronRight className="h-5 w-5" /></button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }} transition={{ duration:0.7, delay:0.1 }}>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth:"none", msOverflowStyle:"none" }}>
            <div className="shrink-0 w-0 lg:w-[calc((100vw-1280px)/2-24px)]" />
            {doctors.map((d, i) => <DoctorCard key={d.id} doctor={d} index={i} />)}
            <div className="shrink-0 w-6 lg:w-[calc((100vw-1280px)/2-24px)]" />
          </div>
        </motion.div>
        <div className="mt-8 flex items-center justify-center gap-2">
          {doctors.map((_, i) => <div key={i} className="h-1.5 rounded-full transition-all" style={{ width: i===0?"24px":"6px", backgroundColor: i===0?"#00ACC1":"rgba(0,172,193,0.2)" }} />)}
        </div>
      </div>
    </section>
  );
}

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  const SpecIcon = doctor.specIcon;
  return (
    <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.5, delay:index*0.08 }} whileHover={{ y:-4 }} className="group relative shrink-0 snap-start">
      <div className="relative w-[280px] overflow-hidden rounded-2xl border border-[rgba(0,172,193,0.08)] bg-white transition-all duration-500 hover:border-[#00ACC1]/30 hover:shadow-[0_12px_40px_rgba(0,172,193,0.18)]">
        <div className="relative h-72 overflow-hidden bg-gradient-to-b from-[#E0F7FA] to-[#B2EBF2]">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage:"radial-gradient(circle at 30% 40%, rgba(0,172,193,0.12) 0%, transparent 50%)" }} />
          <div className="absolute inset-0 flex items-center justify-center pt-6">
            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-[#00ACC1]/20 to-transparent blur-2xl" />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#B2EBF2] to-[#E0F7FA] shadow-lg">
                <span className="text-3xl font-light text-[#004D40]">{doctor.avatar}</span>
              </div>
              {doctor.isOnline && (
                <div className="absolute -right-1 -top-1">
                  <div className="relative">
                    <div className="absolute -inset-1.5 animate-ping rounded-full bg-emerald-400/40" />
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500"><div className="h-1.5 w-1.5 rounded-full bg-white" /></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-center gap-1.5 rounded-full border border-white/60 bg-white/70 py-2 backdrop-blur-sm">
              <SpecIcon className="h-3.5 w-3.5 text-[#00ACC1]" />
              <span className="text-xs font-medium text-[#004D40]">{doctor.specialization}</span>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-[#004D40]">{doctor.name}</h3>
          <p className="mt-0.5 text-xs text-[#90A4AE]">{doctor.title}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(0,172,193,0.1)] bg-[#E0F7FA]">
                <span className="text-sm font-semibold text-[#00ACC1]">{doctor.yearsExp}</span>
              </div>
              <span className="text-[11px] text-[#90A4AE]">yrs exp</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-sm font-medium text-[#004D40]">{doctor.rating}</span>
              <span className="text-[11px] text-[#90A4AE]">({doctor.reviews})</span>
            </div>
          </div>
          <button className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${doctor.isOnline ? "border border-[#00ACC1]/30 bg-[#00ACC1]/10 text-[#00ACC1] hover:bg-[#00ACC1]/20" : "border border-[rgba(0,172,193,0.08)] bg-[#E0F7FA]/50 text-[#546E7A] hover:bg-[#E0F7FA]"}`}>
            {doctor.isOnline ? (<><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>Book Consultation</>) : "View Profile"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
