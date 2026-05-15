"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Award,
  Stethoscope,
  ArrowUpRight,
  Send,
  Heart,
  Clock,
  Globe,
  PawPrint,
  Sparkles,
} from "lucide-react";
import { PawHeartLogo } from "./PawHeartLogo";

/* ───────────────── Data ───────────────── */

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Telehealth", href: "#telehealth" },
      { label: "In-Clinic Visits", href: "#clinic" },
      { label: "Surgery", href: "#surgery" },
      { label: "Dental Care", href: "#dental" },
      { label: "Vaccinations", href: "#vax" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pet Health Blog", href: "#blog" },
      { label: "Vet Pharmacy", href: "#pharmacy" },
      { label: "Find a Clinic", href: "#clinics" },
      { label: "Emergency Guide", href: "#emergency" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Partner With Us", href: "#partner" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const certifications = [
  { icon: ShieldCheck, label: "Veterinary Council Approved" },
  { icon: Award, label: "ISO 9001 Certified" },
  { icon: Stethoscope, label: "AAHA Accredited" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

/* ───────────────── Component ───────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* ── CTA Banner ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative -mb-20 z-10 overflow-hidden rounded-3xl p-10 sm:p-14 border border-[rgba(0,172,193,0.12)]"
          style={{
            background: "linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 50%, #E1F5FE 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#00ACC1]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#4DD0E1]/8 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#004D40] sm:text-3xl">
                Ready to give your pet the best care?
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#546E7A]">
                Join thousands of pet parents who trust Vetenariy for their companion&apos;s health and happiness.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00ACC1] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[rgba(0,172,193,0.3)] transition-all hover:bg-[#0097A7] hover:-translate-y-0.5 hover:shadow-xl">
                Get Started <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="tel:+18001234567" className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(0,172,193,0.2)] bg-white/70 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-[#00ACC1] transition-all hover:bg-white hover:shadow-md">
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="relative pt-32 pb-0">


        {/* Floating decorative paw prints */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [-8, 8], rotate: [0, 15] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute top-24 left-[8%] opacity-[0.04]"
          >
            <PawPrint className="h-32 w-32 text-[#00ACC1]" />
          </motion.div>
          <motion.div
            animate={{ y: [10, -10], rotate: [10, -10] }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
            className="absolute top-40 right-[12%] opacity-[0.03]"
          >
            <PawPrint className="h-24 w-24 text-[#00ACC1]" />
          </motion.div>
          <motion.div
            animate={{ y: [-6, 6] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
            className="absolute bottom-48 left-[45%] opacity-[0.03]"
          >
            <PawPrint className="h-20 w-20 text-[#00ACC1]" />
          </motion.div>
          {/* Sparkle accents */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-[30%]"
          >
            <Sparkles className="h-6 w-6 text-[#00ACC1]" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.04, 0.1, 0.04] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-36 left-[20%]"
          >
            <Sparkles className="h-5 w-5 text-[#4DD0E1]" />
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* ── Top Grid ── */}
          <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12 lg:gap-10">
            {/* ── Brand Column ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeInUp}
              className="lg:col-span-4"
            >
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] ring-1 ring-[rgba(0,172,193,0.15)] shadow-[0_4px_16px_rgba(0,172,193,0.1)]">
                  <PawHeartLogo />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-[#004D40]">
                    Vetenariy
                  </span>
                  <p className="text-[10px] font-medium tracking-wider text-[#00ACC1]">
                    SMART VET CARE
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#546E7A]">
                Advanced veterinary care powered by AI. Exceptional healthcare
                for your beloved companions — anytime, anywhere.
              </p>

              {/* Social Links */}
              <div className="mt-8 flex gap-2.5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 17 }}
                    className="group flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] text-[#0097A7] ring-1 ring-[rgba(0,172,193,0.1)] shadow-sm transition-all hover:shadow-[0_8px_24px_rgba(0,172,193,0.2)] hover:text-[#00ACC1] hover:from-white hover:to-[#E0F7FA]"
                    aria-label={social.name}
                  >
                    {social.svg}
                  </motion.a>
                ))}
              </div>

              {/* Contact Card — Glass card with gradient border */}
              <div className="mt-8 rounded-2xl p-[1px] bg-gradient-to-br from-[#00ACC1]/20 via-[#4DD0E1]/10 to-[#B2EBF2]/20">
                <div className="rounded-2xl bg-white/70 backdrop-blur-sm p-6 shadow-[0_8px_32px_rgba(0,172,193,0.08)]">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="h-4 w-4 text-[#00ACC1]" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#00ACC1]">
                      Get in Touch
                    </span>
                  </div>

                  <a href="tel:+18001234567" className="group flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ACC1] to-[#0097A7] shadow-lg shadow-[rgba(0,172,193,0.25)]">
                      <Phone className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#90A4AE]">24/7 Emergency</p>
                      <p className="font-mono text-base font-bold tracking-wider text-[#004D40] transition-colors group-hover:text-[#00ACC1]">1-800-123-4567</p>
                    </div>
                  </a>

                  <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,172,193,0.12)] to-transparent" />

                  <a href="mailto:care@vetenariy.ai" className="group flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/25">
                      <Mail className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#90A4AE]">Email</p>
                      <p className="text-sm font-medium text-[#004D40]/80 transition-colors group-hover:text-emerald-600">care@vetenariy.ai</p>
                    </div>
                  </a>

                  <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,172,193,0.12)] to-transparent" />

                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8A80] to-[#FF5252] shadow-lg shadow-[#FF8A80]/25">
                      <MapPin className="h-4.5 w-4.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#90A4AE]">HQ</p>
                      <p className="text-sm font-medium text-[#004D40]/80">123 PetCare Lane, SF</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Link Columns ── */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
                {footerLinks.map((section, si) => (
                  <motion.div
                    key={section.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={si + 1}
                    variants={fadeInUp}
                  >
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00ACC1]">
                      <span className="inline-block h-px w-4 bg-gradient-to-r from-[#00ACC1] to-transparent" />
                      {section.title}
                    </h4>
                    <ul className="mt-6 space-y-4">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="group inline-flex items-center gap-2 text-[13px] text-[#546E7A] transition-all hover:text-[#004D40] hover:translate-x-1"
                          >
                            <span className="inline-block h-1 w-1 rounded-full bg-[#B2EBF2] transition-all duration-300 group-hover:w-2 group-hover:bg-[#00ACC1]" />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                {/* Newsletter */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={4}
                  variants={fadeInUp}
                  className="col-span-2 sm:col-span-1"
                >
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#00ACC1]">
                    <span className="inline-block h-px w-4 bg-gradient-to-r from-[#00ACC1] to-transparent" />
                    Stay Updated
                  </h4>
                  <p className="mt-4 text-[13px] leading-relaxed text-[#546E7A]">
                    Pet health tips &amp; platform updates, no spam.
                  </p>
                  <div className="mt-4 rounded-xl p-[1px] bg-gradient-to-r from-[#00ACC1]/20 to-[#4DD0E1]/20">
                    <div className="flex overflow-hidden rounded-xl bg-white shadow-sm">
                      <input
                        type="email"
                        placeholder="you@email.com"
                        className="h-12 flex-1 bg-transparent px-4 text-sm text-[#004D40] outline-none placeholder:text-[#B0BEC5]"
                      />
                      <button className="flex h-12 w-12 shrink-0 items-center justify-center bg-gradient-to-br from-[#00ACC1] to-[#0097A7] text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[rgba(0,172,193,0.3)]">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ── Certifications — Horizontal Cards ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3"
              >
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.label}
                    whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(0,172,193,0.12)" }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                    className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#F5FDFE] to-[#E0F7FA] p-4 ring-1 ring-[rgba(0,172,193,0.08)] shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ACC1] to-[#0097A7] shadow-md shadow-[rgba(0,172,193,0.2)]">
                      <cert.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-[#004D40]">
                      {cert.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="border-t border-[rgba(0,172,193,0.08)] py-7">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E0F7FA] to-[#B2EBF2] px-4 py-2 ring-1 ring-[rgba(0,172,193,0.08)] shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-semibold text-[#004D40]/70">
                    All Systems Operational
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#90A4AE]">
                  <Globe className="h-3 w-3" />
                  English (US)
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#90A4AE]">
                  <Clock className="h-3 w-3" />
                  24/7 Support
                </div>
              </div>

              <p className="flex items-center gap-1.5 text-xs text-[#546E7A]">
                &copy; {new Date().getFullYear()} Vetenariy. Made with
                <Heart className="h-3.5 w-3.5 fill-[#FF8A80] text-[#FF8A80] animate-pulse" />
                for pets
              </p>

              <div className="flex items-center gap-5">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[11px] text-[#90A4AE] transition-colors hover:text-[#004D40]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
