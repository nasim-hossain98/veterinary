"use client";

import { useEffect, useState } from "react";
import { sceneIds, scenes } from "@/lib/scenes";

/**
 * Tracks which scene currently occupies the middle of the viewport.
 *
 * A single IntersectionObserver watches every `[data-scene]` section with a
 * narrow root band (the middle 10% of the screen), which is far cheaper than
 * listening to scroll and measuring eight bounding boxes per frame.
 */
export function useActiveScene(): string {
  const [activeId, setActiveId] = useState<string>(sceneIds[0]);

  useEffect(() => {
    const elements = scenes
      .map((scene) => document.getElementById(scene.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        });

        /* First scene in document order that sits inside the middle band */
        const next = scenes.find((scene) => visible.has(scene.id));
        if (next) setActiveId((prev) => (prev === next.id ? prev : next.id));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeId;
}