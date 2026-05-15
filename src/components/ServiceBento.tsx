"use client";

import { motion } from "framer-motion";
import {
  Syringe,
  Stethoscope,
  HeartPulse,
  CalendarCheck,
  ArrowRight,
  Clock,
  ShieldCheck,
  Apple,
} from "lucide-react";

const cardBase =
  "relative overflow-hidden rounded-3xl bg-white border border-[rgba(0,172,193,0.08)] p-8 cursor-pointer transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,172,193,0.18)]";

export default function ServiceBento() {
  return (
    <section id="services" className="w-full px-6 py-28">
      <div className="mx-auto max-w-6xl">
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

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Box 1 — Large: 24/7 Telehealth */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(0,172,193,0.22)" }}
            className={`${cardBase} sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 shadow-[0_8px_32px_rgba(0,172,193,0.15)]`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,172,193,0.06),transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,172,193,0.15)] bg-[rgba(0,172,193,0.08)] px-3 py-1 text-xs font-medium text-[#00ACC1]">
                  <Clock className="h-3.5 w-3.5" />
                  Always On
                </div>
                <Stethoscope className="h-7 w-7 text-[#00ACC1]/60" />
              </div>

              <div className="mt-8">
                <div className="mb-6 flex items-center justify-center rounded-2xl border border-[rgba(0,172,193,0.08)] bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] p-6">
                  <div className="relative flex h-44 w-full max-w-[280px] items-center justify-center rounded-xl border border-[rgba(0,172,193,0.15)] bg-white">
                    <div className="absolute inset-0 rounded-xl opacity-30 [background:radial-gradient(circle_at_50%_30%,rgba(0,172,193,0.15),transparent_70%)]" />
                    <div className="relative flex flex-col items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(0,172,193,0.2)] bg-[rgba(0,172,193,0.1)] shadow-[0_0_30px_-5px_rgba(0,172,193,0.3)]">
                        <Stethoscope className="h-8 w-8 text-[#00ACC1]" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Live
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-[#004D40]">
                  24/7 Telehealth
                </h3>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[#546E7A]">
                  Connect with licensed veterinarians anytime, anywhere. Video
                  consultations, prescription refills, and follow-ups — all from
                  your device.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Box 2 — Small: Vaccination */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(0,172,193,0.22)" }}
            className={`${cardBase} lg:col-span-1 shadow-[0_8px_32px_rgba(0,172,193,0.15)]`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,138,128,0.06),transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF8A80]/15 border border-[#FF8A80]/20">
                <Syringe className="h-6 w-6 text-[#FF8A80]" />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#004D40]">Vaccination</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                  Core & lifestyle vaccines tailored to your pet.
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
          </motion.div>

          {/* Box 3 — Small: Surgery */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(0,172,193,0.22)" }}
            className={`${cardBase} lg:col-span-1 shadow-[0_8px_32px_rgba(0,172,193,0.15)]`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(186,104,200,0.06),transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#BA68C8]/15 border border-[#BA68C8]/20">
                <ShieldCheck className="h-6 w-6 text-[#BA68C8]" />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#004D40]">Surgery</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                  State-of-the-art surgical suites with board-certified
                  surgeons.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Box 4 — Medium: Pet Wellness */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.36 }}
            whileHover={{ scale: 1.02, boxShadow: "0 16px 48px rgba(0,172,193,0.22)" }}
            className={`${cardBase} sm:col-span-2 lg:col-span-2 shadow-[0_8px_32px_rgba(0,172,193,0.15)]`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(77,208,225,0.06),transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between sm:flex-row sm:items-center sm:gap-8">
              <div className="flex-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4DD0E1]/15 border border-[#4DD0E1]/20">
                  <HeartPulse className="h-6 w-6 text-[#4DD0E1]" />
                </div>
                <h3 className="text-xl font-semibold text-[#004D40]">Pet Wellness</h3>
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
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-[rgba(0,172,193,0.08)] bg-[#E0F7FA]/50 px-4 py-3"
                  >
                    <tip.icon className="h-4 w-4 shrink-0 text-[#00ACC1]" />
                    <span className="text-sm text-[#546E7A]">{tip.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
