"use client";

import WorldBackdrop from "@/components/world/WorldBackdrop";
import DepthField from "./DepthField";
import SceneIndicator from "./SceneIndicator";
import SceneRail from "./SceneRail";
import ScrollProgress from "./ScrollProgress";

/**
 * ScrollExperience — the persistent chrome that turns the page into a
 * continuous journey:
 *
 *  • WorldBackdrop — the one aqua environment every scene floats inside
 *  • DepthField    — atmospheric particles the world travels through
 *  • ScrollProgress— hairline progress bar
 *  • SceneRail     — desktop chapter navigation
 *  • SceneIndicator— compact chapter pill for tablet / mobile
 *
 * All five are decorative or navigation-only; the actual scenes stay in the
 * normal document flow so the page remains readable, printable and
 * navigable without JavaScript.
 */
export default function ScrollExperience() {
  return (
    <>
      <WorldBackdrop />
      <DepthField />
      <ScrollProgress />
      <SceneRail />
      <SceneIndicator />
    </>
  );
}
