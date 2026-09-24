import {
  Bath,
  Cookie,
  FlaskConical,
  Heart,
  Pill,
  Scissors,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Product catalogue — single source of truth for the shop.
   Used by the catalogue grid (/shop) and the product detail
   pages (/shop/[id]). Kept as plain data (no JSX) so it can be
   imported from both server and client components.
   ───────────────────────────────────────────────────────────── */

export interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  /** Icon colour drawn from the brand palette. */
  tint: string;
  /** Soft wash behind the icon tile. */
  wash: string;
  /** "r,g,b" accent driving the glass tint, spotlight and shadow. */
  glow: string;
  /** One-line context used to flesh out product descriptions. */
  descriptor: string;
  /** Shared selling points for products in this lane. */
  features: string[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  name: string;
  blurb: string;
  description: string;
  price: number;
  category: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  features: string[];
  reviews: Review[];
}

export const categories: Category[] = [
  {
    id: "medications",
    label: "Medications",
    icon: Pill,
    tint: "#FF8A80",
    wash: "rgba(255,138,128,0.16)",
    glow: "255,138,128",
    descriptor: "Vet-formulated treatments for everyday and specialist care.",
    features: [
      "Veterinarian approved formulation",
      "Clear, easy-to-follow dosing guide",
      "Batch-tested for safety and purity",
    ],
  },
  {
    id: "pet-food",
    label: "Pet Food",
    icon: Cookie,
    tint: "#4DD0E1",
    wash: "rgba(77,208,225,0.18)",
    glow: "77,208,225",
    descriptor: "Complete, balanced nutrition made from wholesome ingredients.",
    features: [
      "No artificial colours or fillers",
      "Complete & balanced daily nutrition",
      "Rich in protein and omega fatty acids",
    ],
  },
  {
    id: "supplements",
    label: "Supplements",
    icon: FlaskConical,
    tint: "#FFB74D",
    wash: "rgba(255,183,77,0.18)",
    glow: "255,183,77",
    descriptor: "Targeted daily support to keep your companion thriving.",
    features: [
      "Vet-recommended active ingredients",
      "Gentle on sensitive stomachs",
      "Tasty format pets actually enjoy",
    ],
  },
  {
    id: "grooming",
    label: "Grooming",
    icon: Scissors,
    tint: "#BA68C8",
    wash: "rgba(186,104,200,0.18)",
    glow: "186,104,200",
    descriptor: "Salon-quality grooming essentials for a healthy coat.",
    features: [
      "pH-balanced and skin-friendly",
      "Naturally derived ingredients",
      "Leaves coats soft and shining",
    ],
  },
  {
    id: "dental",
    label: "Dental Care",
    icon: Bath,
    tint: "#26C6DA",
    wash: "rgba(38,198,218,0.18)",
    glow: "38,198,218",
    descriptor: "Fresh breath and healthy gums, the easy way.",
    features: [
      "Fights plaque and tartar build-up",
      "Freshens breath naturally",
      "Simple to add to any routine",
    ],
  },
  {
    id: "wellness",
    label: "Wellness",
    icon: Heart,
    tint: "#00ACC1",
    wash: "rgba(0,172,193,0.16)",
    glow: "0,172,193",
    descriptor: "Everyday support for a calm, active, happy life.",
    features: [
      "Backed by veterinary research",
      "Supports long-term wellbeing",
      "Safe for daily, ongoing use",
    ],
  },
];

interface RawProduct {
  id: string;
  name: string;
  blurb: string;
  price: number;
  category: string;
  badge?: string;
  rating: number;
  reviewCount: number;
}

const rawProducts: RawProduct[] = [
  // Medications
  { id: "m1", name: "Amoxicillin 250mg", blurb: "Broad-spectrum antibiotic tablets", price: 12.0, category: "medications", badge: "Prescription", rating: 4.8, reviewCount: 214 },
  { id: "m2", name: "Anti-Inflammatory Chews", blurb: "Fast relief for aches & joints", price: 18.5, category: "medications", rating: 4.7, reviewCount: 168 },
  { id: "m3", name: "Flea & Tick Treatment", blurb: "Monthly spot-on protection", price: 24.0, category: "medications", badge: "Best Seller", rating: 4.9, reviewCount: 486 },
  { id: "m4", name: "Ear Infection Drops", blurb: "Soothing medicated ear care", price: 15.75, category: "medications", rating: 4.6, reviewCount: 97 },

  // Pet Food
  { id: "f1", name: "Grain-Free Salmon Kibble", blurb: "Omega-rich everyday nutrition", price: 32.0, category: "pet-food", badge: "Best Seller", rating: 4.9, reviewCount: 512 },
  { id: "f2", name: "Puppy Growth Formula", blurb: "Balanced protein for growing pups", price: 28.5, category: "pet-food", rating: 4.8, reviewCount: 243 },
  { id: "f3", name: "Senior Wellness Blend", blurb: "Gentle, joint-friendly recipe", price: 30.0, category: "pet-food", rating: 4.7, reviewCount: 189 },
  { id: "f4", name: "Wet Food Variety Pack", blurb: "12 tender, grain-free tins", price: 22.0, category: "pet-food", rating: 4.6, reviewCount: 156 },

  // Supplements
  { id: "s1", name: "Omega-3 Fish Oil", blurb: "Skin, coat & heart support", price: 18.0, category: "supplements", rating: 4.8, reviewCount: 201 },
  { id: "s2", name: "Joint Care Glucosamine", blurb: "Mobility & cartilage support", price: 26.0, category: "supplements", badge: "Best Seller", rating: 4.9, reviewCount: 377 },
  { id: "s3", name: "Probiotic Digestive Aid", blurb: "Daily gut-health powder", price: 21.5, category: "supplements", rating: 4.7, reviewCount: 142 },
  { id: "s4", name: "Multivitamin Chews", blurb: "Complete daily nutrients", price: 16.0, category: "supplements", rating: 4.6, reviewCount: 118 },

  // Grooming
  { id: "g1", name: "Oatmeal Shampoo", blurb: "Soothing wash for sensitive skin", price: 10.0, category: "grooming", rating: 4.7, reviewCount: 133 },
  { id: "g2", name: "Detangling Conditioner", blurb: "Silky, knot-free coats", price: 12.5, category: "grooming", rating: 4.6, reviewCount: 88 },
  { id: "g3", name: "Nail Clipper Set", blurb: "Safe, easy-grip trimming", price: 14.0, category: "grooming", rating: 4.5, reviewCount: 76 },
  { id: "g4", name: "Deshedding Brush", blurb: "Reduces shedding up to 90%", price: 19.0, category: "grooming", badge: "Best Seller", rating: 4.9, reviewCount: 402 },

  // Dental Care
  { id: "d1", name: "Enzymatic Toothpaste", blurb: "Poultry-flavoured plaque control", price: 9.5, category: "dental", rating: 4.6, reviewCount: 91 },
  { id: "d2", name: "Dental Chew Sticks", blurb: "Fresh breath & clean teeth", price: 13.0, category: "dental", rating: 4.7, reviewCount: 164 },
  { id: "d3", name: "Water Additive", blurb: "Fresh-breath daily rinse", price: 11.0, category: "dental", rating: 4.5, reviewCount: 63 },

  // Wellness
  { id: "w1", name: "Calming Anxiety Aid", blurb: "Natural stress & travel relief", price: 20.0, category: "wellness", rating: 4.7, reviewCount: 210 },
  { id: "w2", name: "Immune Support Drops", blurb: "Antioxidant daily boost", price: 17.5, category: "wellness", rating: 4.6, reviewCount: 104 },
  { id: "w3", name: "Hip & Mobility Support", blurb: "For active & senior pets", price: 27.0, category: "wellness", badge: "Best Seller", rating: 4.8, reviewCount: 288 },
];

const REVIEW_AUTHORS = [
  "Jamie L.", "Priya S.", "Marcus T.", "Elena R.", "Chris O.",
  "Nadia K.", "Tom B.", "Sofia M.", "Daniel W.", "Amara N.",
];

const REVIEW_TEMPLATES: { title: string; body: string; rating: number }[] = [
  { title: "Exactly what we needed", body: "My vet actually recommended something similar, and this has worked wonderfully. Delivery was quick and the packaging kept everything intact.", rating: 5 },
  { title: "Big difference for my pet", body: "We noticed an improvement within the first couple of weeks. Easy to use and my pet doesn't fuss at all. Will be reordering.", rating: 5 },
  { title: "Great quality, fair price", body: "Good value compared to the clinic. Quality feels premium and the instructions were clear and easy to follow.", rating: 4 },
  { title: "Does the job", body: "Solid product overall. Took my pet a little while to get used to it, but now it's part of our daily routine.", rating: 4 },
  { title: "Highly recommend", body: "Can't fault it. Trustworthy brand, arrived on time, and my companion is happier and healthier for it.", rating: 5 },
  { title: "Good, with a small note", body: "Works as described. I'd have liked a slightly larger size option, but the product itself is exactly as advertised.", rating: 4 },
  { title: "Would buy again", body: "Second time ordering. Consistent quality every time and the whole checkout experience is painless.", rating: 5 },
];

const DAYS = ["3 days ago", "1 week ago", "2 weeks ago", "3 weeks ago", "last month", "2 months ago"];

/** Simple deterministic hash so generated reviews are stable per product. */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function buildReviews(product: RawProduct): Review[] {
  const seed = hash(product.id);
  const count = 3 + (seed % 2); // 3 or 4 reviews
  return Array.from({ length: count }, (_, i) => {
    const t = REVIEW_TEMPLATES[(seed + i * 3) % REVIEW_TEMPLATES.length];
    const author = REVIEW_AUTHORS[(seed + i * 5) % REVIEW_AUTHORS.length];
    return {
      id: `${product.id}-r${i + 1}`,
      author,
      avatar: author
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      rating: t.rating,
      date: DAYS[(seed + i * 2) % DAYS.length],
      title: t.title,
      body: t.body,
    };
  });
}

export const products: Product[] = rawProducts.map((p) => {
  const cat = categories.find((c) => c.id === p.category)!;
  return {
    ...p,
    description: `${p.blurb}. ${cat.descriptor} Trusted by thousands of pet parents and dispensed straight from the PawCare pharmacy.`,
    features: cat.features,
    reviews: buildReviews(p),
  };
});

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategory(id: string): Category {
  return categories.find((c) => c.id === id)!;
}

/** Other products in the same category (for the "related" rail). */
export function relatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
