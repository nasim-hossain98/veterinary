"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook.
 *
 * Implemented with `useSyncExternalStore` so it never needs a
 * setState-in-effect dance: the server snapshot is `false` (no assumption
 * about the viewport during SSR) and the client snapshot is read directly
 * from the match media list, with change events driving re-renders.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);

      /* Safari < 14 only supports the deprecated addListener API */
      if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", onStoreChange);
        return () => mql.removeEventListener("change", onStoreChange);
      }
      mql.addListener(onStoreChange);
      return () => mql.removeListener(onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Respect the visitor's motion preference (used by non-Framer effects). */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True below the given viewport width. */
export function useIsMobile(breakpoint = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

/** True for mouse / trackpad users (pointer-driven effects only). */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** True when the browser reports a low-power / small-screen device. */
export function useIsLowPowerDevice(): boolean {
  return useMediaQuery("(max-width: 767px), (update: slow)");
}
