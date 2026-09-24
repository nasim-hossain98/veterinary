import { Bird, Bug, Cat, Cross, Dog, Pill, Stethoscope, Syringe } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Pharmacy catalogue — the single source of truth for the
   /pharmacy route. Kept as plain data (no JSX) so it can be
   imported from both server and client components.

   This is intentionally separate from the general shop catalogue
   (`products.ts`): the pharmacy is medical-first (medicines,
   vaccines, parasite control, first-aid supplies and diagnostics),
   and its cart ids are prefixed with `ph-` so they never collide
   with shop items in the shared cart.
   ───────────────────────────────────────────────────────────── */

export interface PharmacyCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  /** Icon colour drawn from the brand palette. */
  tint: string;
  /** Soft wash behind the icon tile. */
  wash: string;
  /** "r,g,b" accent driving the glass tint, spotlight and shadow. */
  glow: string;
  /** One-line context shown under the category. */
  descriptor: string;
}

export interface PharmacyProduct {
  id: string;
  name: string;
  blurb: string;
  price: number;
  category: string;
  /** Species this product is intended for. */
  species: string[];
  badge?: string;
  rating: number;
  reviewCount: number;
}

export const pharmacyCategories: PharmacyCategory[] = [
  {
    id: "medicines",
    label: "Medicines",
    icon: Pill,
    tint: "#FF8A80",
    wash: "rgba(255,138,128,0.16)",
    glow: "255,138,128",
    descriptor: "Vet-formulated treatments for everyday and specialist care.",
  },
  {
    id: "vaccines",
    label: "Vaccines",
    icon: Syringe,
    tint: "#00ACC1",
    wash: "rgba(0,172,193,0.16)",
    glow: "0,172,193",
    descriptor: "Core and lifestyle immunisations, cold-chain protected.",
  },
  {
    id: "parasite",
    label: "Parasite Control",
    icon: Bug,
    tint: "#FFB74D",
    wash: "rgba(255,183,77,0.18)",
    glow: "255,183,77",
    descriptor: "Flea, tick, worm and mite protection that lasts.",
  },
  {
    id: "first-aid",
    label: "First Aid & Supplies",
    icon: Cross,
    tint: "#26C6DA",
    wash: "rgba(38,198,218,0.18)",
    glow: "38,198,218",
    descriptor: "Wound care, dressings and everyday medical essentials.",
  },
  {
    id: "diagnostics",
    label: "Diagnostics",
    icon: Stethoscope,
    tint: "#BA68C8",
    wash: "rgba(186,104,200,0.18)",
    glow: "186,104,200",
    descriptor: "At-home monitoring and rapid test kits.",
  },
];

export const pharmacyProducts: PharmacyProduct[] = [
  // ── Medicines ──
  { id: "ph-m1", name: "Amoxicillin 250mg", blurb: "Broad-spectrum antibiotic tablets", price: 12.0, category: "medicines", species: ["Dogs", "Cats"], badge: "Prescription", rating: 4.8, reviewCount: 214 },
  { id: "ph-m2", name: "Anti-Inflammatory Chews", blurb: "Fast relief for aches & joints", price: 18.5, category: "medicines", species: ["Dogs", "Cats"], rating: 4.7, reviewCount: 168 },
  { id: "ph-m3", name: "Medicated Ear Drops", blurb: "Soothing treatment for ear infections", price: 15.75, category: "medicines", species: ["Dogs", "Cats"], rating: 4.6, reviewCount: 97 },
  { id: "ph-m4", name: "Antibiotic Eye Ointment", blurb: "Clears bacterial eye irritation", price: 14.25, category: "medicines", species: ["Dogs", "Cats", "Birds"], badge: "Prescription", rating: 4.7, reviewCount: 83 },
  { id: "ph-m5", name: "Antihistamine Tablets", blurb: "Eases allergies & itching", price: 11.0, category: "medicines", species: ["Dogs", "Cats"], rating: 4.5, reviewCount: 121 },
  { id: "ph-m6", name: "Avian Antibiotic Solution", blurb: "Water-soluble bird antibiotic", price: 16.5, category: "medicines", species: ["Birds"], badge: "Prescription", rating: 4.6, reviewCount: 54 },

  // ── Vaccines ──
  { id: "ph-v1", name: "Rabies Vaccine", blurb: "Core annual/triennial immunisation", price: 28.0, category: "vaccines", species: ["Dogs", "Cats"], badge: "Prescription", rating: 4.9, reviewCount: 342 },
  { id: "ph-v2", name: "DHPP Combination Vaccine", blurb: "Distemper, hepatitis, parvo & parainfluenza", price: 34.0, category: "vaccines", species: ["Dogs"], badge: "Prescription", rating: 4.9, reviewCount: 288 },
  { id: "ph-v3", name: "Feline FVRCP Vaccine", blurb: "Core protection for cats", price: 31.5, category: "vaccines", species: ["Cats"], badge: "Prescription", rating: 4.8, reviewCount: 176 },
  { id: "ph-v4", name: "Bordetella (Kennel Cough)", blurb: "Respiratory protection for social dogs", price: 26.0, category: "vaccines", species: ["Dogs"], rating: 4.7, reviewCount: 134 },
  { id: "ph-v5", name: "Feline Leukemia Vaccine", blurb: "Lifestyle protection against FeLV", price: 29.5, category: "vaccines", species: ["Cats"], badge: "Prescription", rating: 4.7, reviewCount: 98 },
  { id: "ph-v6", name: "Avian Polyomavirus Vaccine", blurb: "Protects young and breeding birds", price: 33.0, category: "vaccines", species: ["Birds"], badge: "Prescription", rating: 4.6, reviewCount: 41 },

  // ── Parasite Control ──
  { id: "ph-p1", name: "Flea & Tick Spot-On", blurb: "Monthly waterproof protection", price: 24.0, category: "parasite", species: ["Dogs", "Cats"], badge: "Best Seller", rating: 4.9, reviewCount: 486 },
  { id: "ph-p2", name: "Broad-Spectrum Dewormer", blurb: "Clears roundworm & tapeworm", price: 17.0, category: "parasite", species: ["Dogs", "Cats"], rating: 4.7, reviewCount: 203 },
  { id: "ph-p3", name: "Heartworm Prevention Chews", blurb: "Monthly heartworm shield", price: 26.5, category: "parasite", species: ["Dogs"], badge: "Prescription", rating: 4.8, reviewCount: 219 },
  { id: "ph-p4", name: "Ear Mite Treatment", blurb: "Fast relief from mites & itching", price: 13.5, category: "parasite", species: ["Cats", "Dogs"], rating: 4.6, reviewCount: 112 },
  { id: "ph-p5", name: "Avian Mite & Lice Spray", blurb: "Gentle external parasite control", price: 12.0, category: "parasite", species: ["Birds"], rating: 4.5, reviewCount: 67 },

  // ── First Aid & Supplies ──
  { id: "ph-a1", name: "Antiseptic Wound Spray", blurb: "Cleans and protects minor wounds", price: 9.5, category: "first-aid", species: ["Dogs", "Cats", "Birds"], rating: 4.7, reviewCount: 158 },
  { id: "ph-a2", name: "Pet First-Aid Kit", blurb: "35-piece essentials for emergencies", price: 29.0, category: "first-aid", species: ["Dogs", "Cats", "Birds"], badge: "Best Seller", rating: 4.9, reviewCount: 341 },
  { id: "ph-a3", name: "Self-Adhesive Bandage Wrap", blurb: "Flexible, no-clip cohesive wrap", price: 7.5, category: "first-aid", species: ["Dogs", "Cats"], rating: 4.6, reviewCount: 96 },
  { id: "ph-a4", name: "Recovery Cone Collar", blurb: "Soft, comfortable post-op collar", price: 15.0, category: "first-aid", species: ["Dogs", "Cats"], rating: 4.5, reviewCount: 128 },
  { id: "ph-a5", name: "Sterile Syringes (5-pack)", blurb: "Needle-free oral dosing syringes", price: 6.0, category: "first-aid", species: ["Dogs", "Cats", "Birds"], rating: 4.7, reviewCount: 74 },

  // ── Diagnostics ──
  { id: "ph-d1", name: "Digital Pet Thermometer", blurb: "Fast, accurate temperature reads", price: 13.0, category: "diagnostics", species: ["Dogs", "Cats"], rating: 4.6, reviewCount: 142 },
  { id: "ph-d2", name: "Urine Test Strips (25)", blurb: "Screen for UTI & kidney markers", price: 11.5, category: "diagnostics", species: ["Dogs", "Cats"], rating: 4.5, reviewCount: 88 },
  { id: "ph-d3", name: "Blood Glucose Monitor Kit", blurb: "At-home diabetes monitoring", price: 39.0, category: "diagnostics", species: ["Dogs", "Cats"], badge: "Prescription", rating: 4.7, reviewCount: 63 },
];

export function getPharmacyCategory(id: string): PharmacyCategory {
  return pharmacyCategories.find((c) => c.id === id)!;
}

/* ────────────────────────────────────────────────────────────
   Pet health & nutrition guide — the informational section of the
   pharmacy page. Practical, vet-informed tips for the three most
   common companions, kept general (not a substitute for a
   consultation with a licensed veterinarian).
   ───────────────────────────────────────────────────────────── */

export interface PetGuide {
  id: string;
  species: string;
  icon: React.ElementType;
  tint: string;
  wash: string;
  glow: string;
  tagline: string;
  health: string[];
  nutrition: string[];
  /** A single highlighted recommendation. */
  tip: string;
}

export const petGuides: PetGuide[] = [
  {
    id: "dogs",
    species: "Dogs",
    icon: Dog,
    tint: "#00ACC1",
    wash: "rgba(0,172,193,0.14)",
    glow: "0,172,193",
    tagline: "Active companions that thrive on routine and exercise.",
    health: [
      "Keep core vaccines (rabies, DHPP) and boosters up to date.",
      "Use monthly flea, tick and heartworm prevention year-round.",
      "Brush teeth 2–3 times a week to prevent dental disease.",
      "Book an annual wellness check — twice yearly for seniors.",
    ],
    nutrition: [
      "Feed a complete, life-stage-appropriate diet (puppy, adult, senior).",
      "Split daily food into two measured meals to avoid overfeeding.",
      "Keep treats under 10% of daily calories.",
      "Always provide fresh water; avoid onions, grapes and chocolate.",
    ],
    tip: "A 30-minute daily walk supports weight, joints and behaviour.",
  },
  {
    id: "cats",
    species: "Cats",
    icon: Cat,
    tint: "#BA68C8",
    wash: "rgba(186,104,200,0.16)",
    glow: "186,104,200",
    tagline: "Independent obligate carnivores with subtle health cues.",
    health: [
      "Keep FVRCP and rabies vaccines current per your vet's schedule.",
      "Deworm regularly and use vet-approved parasite control.",
      "Scoop litter daily — changes in habits can signal illness.",
      "Watch for hidden pain; cats mask discomfort well.",
    ],
    nutrition: [
      "Choose high-protein food; taurine is essential for cats.",
      "Offer wet food to boost hydration and urinary health.",
      "Feed measured portions to prevent obesity.",
      "Never feed dog food, milk, onions or lilies (toxic).",
    ],
    tip: "A water fountain encourages drinking and protects the kidneys.",
  },
  {
    id: "birds",
    species: "Birds",
    icon: Bird,
    tint: "#FFB74D",
    wash: "rgba(255,183,77,0.18)",
    glow: "255,183,77",
    tagline: "Sensitive, social pets that need enrichment and clean air.",
    health: [
      "Schedule annual avian vet check-ups and beak/nail care.",
      "Keep the cage clean and away from draughts and fumes.",
      "Never expose birds to non-stick (PTFE) fumes — they're deadly.",
      "Provide 10–12 hours of quiet, dark sleep each night.",
    ],
    nutrition: [
      "Base the diet on formulated pellets, not just seed mixes.",
      "Add fresh vegetables and limited fruit daily.",
      "Provide a cuttlebone or mineral block for calcium.",
      "Avoid avocado, chocolate and caffeine — all toxic to birds.",
    ],
    tip: "Rotate toys and foraging activities weekly to prevent boredom.",
  },
];
