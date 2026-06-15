"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { EmergencyModal } from "./EmergencyModal";

const links = [
  { label: "Services", href: "#services", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { label: "Find a Doctor", href: "#doctors", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Pharmacy", href: "#pharmacy", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { label: "Shop", href: "#shop", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
];

function NavIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

/* ─── Hamburger-to-X animated icon ─── */
function MenuToggle({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative z-50 flex md:hidden h-10 w-10 items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm border border-[rgba(0,172,193,0.12)] transition-colors hover:bg-white/80"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" className="overflow-visible">
        <motion.line
          x1="3" y1="6" x2="17" y2="6"
          stroke="#004D40" strokeWidth="1.8" strokeLinecap="round"
          animate={isOpen ? { y1: 10, y2: 10, rotate: 45 } : { y1: 6, y2: 6, rotate: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "center" }}
        />
        <motion.line
          x1="3" y1="10" x2="17" y2="10"
          stroke="#004D40" strokeWidth="1.8" strokeLinecap="round"
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: "center" }}
        />
        <motion.line
          x1="3" y1="14" x2="17" y2="14"
          stroke="#004D40" strokeWidth="1.8" strokeLinecap="round"
          animate={isOpen ? { y1: 10, y2: 10, rotate: -45 } : { y1: 14, y2: 14, rotate: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </button>
  );
}

export function GlassHeader() {
  const [sosOpen, setSosOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={false}
      >
        {/* Gradient border glow at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0,172,193,0.3) 20%, rgba(0,172,193,0.5) 50%, rgba(0,172,193,0.3) 80%, transparent 100%)",
          }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="absolute inset-0 transition-colors duration-500"
          animate={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0)",
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px) saturate(100%)",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px) saturate(100%)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <nav className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* ─── Logo ─── */}
          <motion.a
            href="/"
            className="group relative flex items-center gap-2.5 z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              {/* Glow ring behind logo */}
              <motion.div
                className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#00ACC1]/20 to-[#4DD0E1]/20"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00ACC1] to-[#0097A7] shadow-lg shadow-[#00ACC1]/25">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Vetenariy logo"
                >
                  <ellipse cx="18" cy="22" rx="7" ry="6" fill="white" opacity="0.95" />
                  <ellipse cx="10" cy="14" rx="3.5" ry="4" fill="white" opacity="0.8" />
                  <ellipse cx="26" cy="14" rx="3.5" ry="4" fill="white" opacity="0.8" />
                  <ellipse cx="13" cy="9" rx="2.8" ry="3.2" fill="white" opacity="0.65" />
                  <ellipse cx="23" cy="9" rx="2.8" ry="3.2" fill="white" opacity="0.65" />
                  <path
                    d="M6 22 H13 L15 18 L17 26 L19 16 L21 24 L23 20 H30"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.9"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#004D40] leading-tight">
                Vetenariy
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#00ACC1]/70 leading-none">
                Smart Pet Care
              </span>
            </div>
          </motion.a>

          {/* ─── Desktop Nav Links ─── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="group relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-[#546E7A] transition-colors hover:text-[#004D40]"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <NavIcon path={link.icon} className="opacity-0 group-hover:opacity-70 transition-opacity duration-300 text-[#00ACC1]" />
                <span className="relative">
                  {link.label}
                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#00ACC1] to-[#4DD0E1] transition-all duration-300 group-hover:w-full" />
                </span>
                {/* Hover background pill */}
                <span className="absolute inset-0 rounded-xl bg-[#00ACC1]/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>

          {/* ─── Right actions ─── */}
          <div className="flex items-center gap-3 z-10">
            {/* Book Appointment — desktop only */}
            <motion.a
              href="#doctors"
              className="hidden lg:flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00ACC1] to-[#0097A7] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#00ACC1]/20 transition-shadow hover:shadow-xl hover:shadow-[#00ACC1]/30"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Now
            </motion.a>

            {/* SOS Button */}
            <motion.button
              onClick={() => setSosOpen(true)}
              className="group relative flex h-10 items-center gap-2 rounded-full border border-red-200/60 bg-red-50/80 px-4 text-sm font-semibold text-red-500 backdrop-blur-sm transition-all hover:border-red-300 hover:bg-red-100/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Emergency SOS"
            >
              {/* Pulsing glow behind */}
              <span className="absolute inset-0 rounded-full animate-pulse bg-red-500/5" />
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              <span className="relative">SOS</span>
            </motion.button>

            {/* Mobile menu toggle */}
            <MenuToggle isOpen={mobileOpen} toggle={() => setMobileOpen(!mobileOpen)} />
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobile}
            />

            {/* Slide-down panel */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-40 md:hidden"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="rounded-b-3xl border-b border-[rgba(0,172,193,0.12)] bg-white/95 backdrop-blur-2xl px-6 pb-8 pt-24 shadow-2xl shadow-[#00ACC1]/5">
                <div className="flex flex-col gap-2">
                  {links.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="group flex items-center gap-4 rounded-2xl px-4 py-4 text-base font-medium text-[#004D40] transition-colors hover:bg-[#00ACC1]/[0.06]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] text-[#00ACC1]">
                        <NavIcon path={link.icon} className="w-5 h-5" />
                      </div>
                      <span>{link.label}</span>
                      <svg className="ml-auto h-4 w-4 text-[#90A4AE] transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                {/* Mobile CTA */}
                <motion.a
                  href="#doctors"
                  onClick={closeMobile}
                  className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00ACC1] to-[#0097A7] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#00ACC1]/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Book an Appointment
                </motion.a>

                {/* Decorative bottom element */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#90A4AE]">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#00ACC1]/30" />
                  <span>Smart Veterinary Care</span>
                  <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#00ACC1]/30" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Spacer for fixed header ─── */}
      <div className="h-[72px]" />

      <EmergencyModal open={sosOpen} onClose={() => setSosOpen(false)} />
    </>
  );
}
