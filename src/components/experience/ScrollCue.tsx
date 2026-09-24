"use client";

import { ChevronDown } from "lucide-react";

/**
 * ScrollCue — a real, focusable link that hints at the journey ahead
 * ("scroll to explore") and doubles as a keyboard shortcut to the next
 * scene. The animated dot is decorative; the label carries the meaning.
 */
export default function ScrollCue({
  href = "#services",
  label = "Scroll to explore",
  className = "",
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-2 py-1 transition-colors ${className}`}
    >
      <span
        aria-hidden="true"
        className="relative flex h-9 w-6 items-center justify-center rounded-full border border-[rgba(0,172,193,0.35)] bg-white/65 backdrop-blur-sm transition-colors group-hover:border-[#00ACC1]/60"
      >
        <span
          data-ambient="true"
          className="absolute h-1.5 w-1 rounded-full bg-[#00ACC1]"
          style={{ animation: "vd-cue 1.9s ease-in-out infinite" }}
        />
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#546E7A] transition-colors group-hover:text-[#004D40]">
        {label}
      </span>
      <ChevronDown
        aria-hidden="true"
        className="h-3.5 w-3.5 text-[#00ACC1] transition-transform duration-300 group-hover:translate-y-0.5"
      />
    </a>
  );
}