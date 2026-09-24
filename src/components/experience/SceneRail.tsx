"use client";

import { useActiveScene } from "@/hooks/useActiveScene";
import { scenes } from "@/lib/scenes";

/**
 * SceneRail — the desktop timeline of the scroll story.
 *
 * Real anchor links (keyboard + screen-reader friendly, no JS scrolling
 * required), with the active chapter marked via `aria-current`. The rail is
 * decorative chrome, so it never captures the pointer outside its links.
 */
export default function SceneRail() {
  const activeId = useActiveScene();

  return (
    <nav
      aria-label="Scroll scenes"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex"
    >
      {scenes.map((scene, index) => {
        const isActive = scene.id === activeId;

        return (
          <a
            key={scene.id}
            href={`#${scene.id}`}
            aria-current={isActive ? "true" : undefined}
            className="pointer-events-auto group relative flex items-center justify-end gap-3 rounded-full py-1 pl-3"
          >
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? "translate-x-0 text-[#004D40] opacity-100"
                  : "translate-x-1 text-[#546E7A] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              }`}
            >
              {scene.label}
            </span>

            <span className="relative flex h-3 w-3 items-center justify-center">
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-2 w-2 bg-[#00ACC1] shadow-[0_0_0_4px_rgba(0,172,193,0.18)]"
                    : "h-1.5 w-1.5 bg-[#00ACC1]/30 group-hover:bg-[#00ACC1]/70"
                }`}
              />
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-[#00ACC1]/40"
                />
              )}
            </span>

            {index < scenes.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-2 right-[5px] h-2.5 w-px bg-gradient-to-b from-[rgba(0,172,193,0.35)] to-transparent"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
