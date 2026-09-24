"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";
import { createDepthScene } from "@/lib/depthScene";

/** Palette-derived glow tints available to a scene. */
const TONES = {
  teal: "0,172,193",
  cyan: "77,208,225",
  blue: "1,87,155",
  violet: "186,104,200",
  coral: "255,138,128",
} as const;

export type SceneTone = keyof typeof TONES;

interface SceneShellProps {
  /** DOM id — must match an entry in `src/lib/scenes.ts`. */
  id: string;
  /** Accessible + rail label. */
  label: string;
  /** Chapter number, e.g. "Scene 03" (rendered by SceneTransition). */
  eyebrow: string;
  /** Legacy anchor ids that should resolve to this scene. */
  aliases?: string[];
  children: ReactNode;
  className?: string;
  /** Depth strength multiplier for this scene's layers. */
  intensity?: number;
  tone?: SceneTone;
  /** Camera pitch in degrees as the scene passes (0 disables). */
  camera?: number;
  atmosphere?: boolean;
  foreground?: boolean;
  /** Optional external ref (sections that already own a GSAP scope). */
  sectionRef?: Ref<HTMLElement>;
}

function assignRef(ref: Ref<HTMLElement> | undefined, node: HTMLElement | null) {
  if (!ref) return;
  if (typeof ref === "function") ref(node);
  else (ref as React.MutableRefObject<HTMLElement | null>).current = node;
}

/**
 * SceneShell — wraps a page section into a 3D scene of the scroll story.
 *
 * Responsibilities
 *  • registers the section with the scene system (`data-scene`)
 *  • renders the far "atmosphere" and near "foreground" depth layers
 *  • wires the scroll-linked depth choreography (createDepthScene)
 *  • exposes legacy anchor aliases as real (invisible) scroll targets
 *
 * Depth convention: any descendant tagged with `data-depth="0.2 … 1.6"`
 * is animated by the scene, where 0 is the far background and 1.6 the
 * nearest foreground. Layout/content is untouched — depth is purely additive.
 */
export default function SceneShell({
  id,
  label,
  eyebrow,
  aliases,
  children,
  className = "",
  intensity = 1,
  tone = "teal",
  camera = 2.2,
  atmosphere = true,
  foreground = true,
  sectionRef,
}: SceneShellProps) {
  const rootRef = useRef<HTMLElement>(null);
  const rgb = TONES[tone];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    return createDepthScene(el, { intensity, cameraRotate: camera });
  }, [intensity, camera]);

  return (
    <section
      id={id}
      data-scene={id}
      aria-label={`${eyebrow} — ${label}`}
      ref={(node: HTMLElement | null) => {
        rootRef.current = node;
        assignRef(sectionRef, node);
      }}
      className={`scene-perspective relative w-full ${className}`}
    >
      {/* Legacy anchor targets (footer / nav links) */}
      {aliases?.map((alias) => (
        <span
          key={alias}
          id={alias}
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 block h-px w-px overflow-hidden scroll-mt-[92px]"
        />
      ))}

      <div data-scene-camera className="scene-stage relative">
        {atmosphere && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Far: receding grid */}
            <div
              data-depth="0.18"
              className="depth-grid absolute inset-x-[-10%] top-[-8%] h-[58%] opacity-[0.12]"
            />
            {/* Mid: palette glows */}
            <div
              data-depth="0.4"
              className="motion-optional absolute -left-[8%] top-[16%] h-[360px] w-[360px] rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, rgba(${rgb},0.2) 0%, transparent 70%)`,
                animation: "vd-drift 28s ease-in-out infinite",
              }}
            />
            <div
              data-depth="0.62"
              className="motion-optional absolute -right-[6%] bottom-[4%] h-[320px] w-[320px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(77,208,225,0.16) 0%, transparent 72%)",
                animation: "vd-drift 34s ease-in-out infinite",
                animationDelay: "-9s",
              }}
            />
          </div>
        )}

        {children}

        {foreground && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {/* Near: out-of-focus glass shards that pass in front of content */}
            <div
              data-depth="1.05"
              className="absolute left-[4%] top-[14%] hidden h-24 w-24 rotate-[14deg] rounded-3xl border border-white/45 bg-white/25 md:block"
              style={{ boxShadow: "0 24px 60px -34px rgba(0,77,64,0.55)" }}
            />
            <div
              data-depth="1.3"
              className="absolute right-[8%] bottom-[16%] hidden h-16 w-16 -rotate-[18deg] rounded-2xl border border-white/40 bg-white/20 backdrop-blur-[1px] lg:block"
            />
          </div>
        )}
      </div>
    </section>
  );
}
