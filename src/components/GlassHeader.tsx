"use client";

import { useState } from "react";
import { EmergencyModal } from "./EmergencyModal";

const links = [
  { label: "Services", href: "#services" },
  { label: "Find a Doctor", href: "#doctors" },
  { label: "Pharmacy", href: "#pharmacy" },
  { label: "Shop", href: "#shop" },
];

export function GlassHeader() {
  const [sosOpen, setSosOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 backdrop-blur-xl bg-white/70 border-b border-[rgba(0,172,193,0.08)]">
          <a href="/" className="flex items-center gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Vetenariy logo"
            >
              <ellipse cx="18" cy="22" rx="7" ry="6" fill="#00ACC1" opacity="0.9" />
              <ellipse cx="10" cy="14" rx="3.5" ry="4" fill="#00ACC1" opacity="0.75" />
              <ellipse cx="26" cy="14" rx="3.5" ry="4" fill="#00ACC1" opacity="0.75" />
              <ellipse cx="13" cy="9" rx="2.8" ry="3.2" fill="#00ACC1" opacity="0.6" />
              <ellipse cx="23" cy="9" rx="2.8" ry="3.2" fill="#00ACC1" opacity="0.6" />
              <path
                d="M6 22 H13 L15 18 L17 26 L19 16 L21 24 L23 20 H30"
                stroke="#0097A7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
              />
            </svg>
            <span className="text-lg font-semibold tracking-tight text-[#004D40]">
              Vetenariy
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#546E7A] transition-colors hover:text-[#00ACC1]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setSosOpen(true)}
            className="group relative flex h-9 items-center gap-1.5 rounded-full bg-red-50 px-4 text-sm font-semibold text-red-500 transition-all hover:bg-red-100 hover:shadow-lg hover:shadow-red-500/10"
            aria-label="Emergency SOS"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            SOS
          </button>
        </div>
      </header>

      <EmergencyModal open={sosOpen} onClose={() => setSosOpen(false)} />
    </>
  );
}
