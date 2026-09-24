/**
 * Scroll choreography helpers built on GSAP + ScrollTrigger.
 *
 * Design goals
 *  • Native scrolling is never hijacked — smoothness comes from GSAP's
 *    `scrub` interpolation, which lags the real scroll position slightly
 *    and eases every layer into place. The user always stays in control,
 *    keyboard/scrollbar/trackpad behaviour is untouched and the fixed
 *    header keeps using real scroll events.
 *  • One shared, tunable visual language: every depth layer is declared in
 *    markup with `data-depth="0.2 … 1.6"` and animated here.
 *  • `prefers-reduced-motion` short-circuits everything: no ScrollTrigger
 *    is created at all and the page renders as a normal, static document.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Single easing curve used across the whole experience. */
export const SCENE_EASE = "power2.out";

/** Cubic-bezier mirrored from CSS for JS-driven transitions. */
export const SCENE_BEZIER = [0.22, 1, 0.36, 1] as const;

export interface DepthSceneOptions {
  /** Global strength multiplier (mobile is automatically softened). */
  intensity?: number;
  /** Vertical travel, in px, for a layer with data-depth="1". */
  travel?: number;
  /** Scale delta applied to a layer with data-depth="1". */
  scaleDelta?: number;
  /** Camera pitch for the scene container, in degrees (0 disables). */
  cameraRotate?: number;
  /** Scrub smoothing in seconds. */
  scrub?: number;
}

/**
 * Register scroll-linked depth movement for every `[data-depth]` element
 * inside `root`, plus an optional camera pitch on the scene container.
 *
 * Returns a cleanup function that reverts every tween and ScrollTrigger.
 */
export function createDepthScene(
  root: HTMLElement,
  {
    intensity = 1,
    travel = 96,
    scaleDelta = 0.07,
    cameraRotate = 2.5,
    scrub = 1,
  }: DepthSceneOptions = {}
): () => void {
  const mm = gsap.matchMedia();

  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      reduce: "(prefers-reduced-motion: reduce)",
      desktop: "(min-width: 1024px)",
      tablet: "(min-width: 768px) and (max-width: 1023px)",
      mobile: "(max-width: 767px)",
    },
    (context) => {
      const { reduce, desktop, tablet } = context.conditions as {
        reduce: boolean;
        desktop: boolean;
        tablet: boolean;
        mobile: boolean;
      };

      /* Accessibility: leave the document completely still. */
      if (reduce) return;

      /* Depth is deliberately reduced on smaller viewports — a subtle
         parallax instead of a "scaled-down desktop" effect. */
      const deviceFactor = desktop ? 1 : tablet ? 0.6 : 0.35;
      const factor = intensity * deviceFactor;

      const layers = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll<HTMLElement>("[data-depth]")
      );

      layers.forEach((el) => {
        const depth = Number.parseFloat(el.dataset.depth ?? "0.5") || 0.5;
        const strength = depth * factor;
        /* Layers can opt into a fade by adding data-depth-fade. */
        const fades = el.dataset.depthFade !== undefined;

        gsap.fromTo(
          el,
          {
            y: 0,
            scale: 1 + scaleDelta * strength,
          },
          {
            y: -travel * strength,
            scale: 1 - scaleDelta * strength * 0.45,
            ...(fades ? { opacity: 0.55 } : null),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const camera = root.querySelector<HTMLElement>("[data-scene-camera]");
      if (camera && cameraRotate > 0 && desktop) {
        gsap.fromTo(
          camera,
          { rotateX: cameraRotate * factor },
          {
            rotateX: -cameraRotate * factor,
            ease: "none",
            transformOrigin: "50% 30%",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: scrub + 0.4,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      return () => {
        /* matchMedia reverts tweens automatically on cleanup */
      };
    }
  );

  return () => mm.revert();
}

/**
 * Scroll an anchor target into view.
 * Honours `prefers-reduced-motion` by jumping instantly.
 */
export function scrollToId(id: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

/** True when the visitor asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
