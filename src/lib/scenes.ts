/**
 * Scene registry — the single source of truth for the scroll story.
 *
 * Every full-page section becomes a "scene". The registry powers:
 *   • the scroll rail / mobile scene indicator
 *   • the navigation active state
 *   • the scene bridges (Scene 01 → Scene 08)
 *
 * `aliases` are extra anchor ids rendered by <SceneShell>. They keep the
 * legacy in-page links (footer + nav) working without inventing content.
 */

export interface SceneDefinition {
  /** DOM id of the section */
  id: string;
  /** Short label used by the rail / indicator */
  label: string;
  /** Scene numbering shown in bridges, e.g. "Scene 03" */
  eyebrow: string;
  /** One-line narrative used in the scene bridges */
  story: string;
  /** Additional anchor ids that resolve to this scene */
  aliases?: string[];
}

export const scenes: SceneDefinition[] = [
  {
    id: "home",
    label: "Intro",
    eyebrow: "Scene 01",
    story: "Smart veterinary care, reimagined in depth",
  },
  {
    id: "services",
    label: "Services",
    eyebrow: "Scene 02",
    story: "Telehealth, surgery, wellness & emergency care",
    aliases: ["telehealth", "surgery", "dental", "vax"],
  },
  {
    id: "journey",
    label: "Journey",
    eyebrow: "Scene 03",
    story: "Consult → prescribe → locate → emergency",
  },
  {
    id: "doctors",
    label: "Care Network",
    eyebrow: "Scene 04",
    story: "Clinics and supply shops around you",
    aliases: ["clinic", "clinics"],
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    eyebrow: "Scene 05",
    story: "Vet-grade products, delivered",
    aliases: ["shop"],
  },
  {
    id: "experts",
    label: "Experts",
    eyebrow: "Scene 06",
    story: "Board-certified specialists on call",
  },
  {
    id: "about",
    label: "About",
    eyebrow: "Scene 07",
    story: "Who we are and what we stand for",
    aliases: ["blog", "careers", "partner"],
  },
  {
    id: "contact",
    label: "Start Care",
    eyebrow: "Scene 08",
    story: "Your companion's next step",
  },
];

export const sceneCount = scenes.length;

/** Scene that follows the provided one (wraps around). */
export function nextSceneOf(id: string): SceneDefinition | undefined {
  const i = scenes.findIndex((s) => s.id === id);
  if (i === -1) return undefined;
  return scenes[(i + 1) % scenes.length];
}

export function sceneById(id: string): SceneDefinition | undefined {
  return scenes.find((s) => s.id === id);
}

/** Compact "03 / 08" label for progress chrome. */
export function sceneCounter(id: string): string {
  const i = scenes.findIndex((s) => s.id === id);
  if (i === -1) return "";
  return `${String(i + 1).padStart(2, "0")} / ${String(sceneCount).padStart(2, "0")}`;
}

/** Scene ids in DOM order — used by the active-scene observers. */
export const sceneIds = scenes.map((s) => s.id);
