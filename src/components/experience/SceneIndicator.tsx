"use client";

import { useActiveScene } from "@/hooks/useActiveScene";
import { sceneCounter, sceneById, scenes } from "@/lib/scenes";

/**
 * SceneIndicator — the mobile/tablet alternative to the desktop rail.
 *
 * A compact glass pill that names the current chapter and shows progress as
 * eight dots. It is purely informational (`aria-hidden`) so it never adds
 * noise for screen readers, and `pointer-events-none` so it can never block
 * a tap on the content underneath.
 */
export default function SceneIndicator() {
  const activeId = useActiveScene();
  const scene = sceneById(activeId) ?? scenes[0];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 xl:hidden"
    >
      <div className="experience-glass flex items-center gap-3 rounded-full px-4 py-2">
        <span className="text-[10px] font-semibold tabular-nums tracking-[0.18em] text-[#00ACC1]">
          {sceneCounter(scene.id)}
        </span>
        <span className="h-3 w-px bg-[rgba(0,172,193,0.25)]" />
        <span className="max-w-[38vw] truncate text-[11px] font-medium uppercase tracking-[0.16em] text-[#004D40]">
          {scene.label}
        </span>
        <span className="flex items-center gap-1">
          {scenes.map((item) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                item.id === scene.id
                  ? "w-4 bg-[#00ACC1]"
                  : "w-1.5 bg-[rgba(0,172,193,0.25)]"
              }`}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
