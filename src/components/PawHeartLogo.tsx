"use client";

export function PawHeartLogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Vetenariy logo"
    >
      {/* Main paw pad */}
      <ellipse cx="18" cy="22" rx="7" ry="6" fill="#00ACC1" opacity="0.9" />
      {/* Top-left toe */}
      <ellipse cx="10" cy="14" rx="3.5" ry="4" fill="#00ACC1" opacity="0.75" />
      {/* Top-right toe */}
      <ellipse cx="26" cy="14" rx="3.5" ry="4" fill="#00ACC1" opacity="0.75" />
      {/* Inner-left toe */}
      <ellipse cx="13" cy="9" rx="2.8" ry="3.2" fill="#00ACC1" opacity="0.6" />
      {/* Inner-right toe */}
      <ellipse cx="23" cy="9" rx="2.8" ry="3.2" fill="#00ACC1" opacity="0.6" />
      {/* Heartbeat line across pad */}
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
  );
}
