"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Plus,
  ShoppingCart,
  Pill,
  FlaskConical,
  Cookie,
  Droplets,
  Bone,
  Check,
  Info,
  ChevronRight,
} from "lucide-react";

type Category = "all" | "prescription" | "vitamins" | "dry-food" | "wet-food" | "accessories";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: Category;
  image: string;
  badge?: string;
  info: {
    keyIngredients?: string[];
    dosage?: string;
    description?: string;
  };
}

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Products", icon: ShoppingCart },
  { id: "prescription", label: "Prescription", icon: Pill },
  { id: "vitamins", label: "Vitamins", icon: FlaskConical },
  { id: "dry-food", label: "Dry Food", icon: Cookie },
  { id: "wet-food", label: "Wet Food", icon: Droplets },
  { id: "accessories", label: "Accessories", icon: Bone },
];

const products: Product[] = [
  {
    id: "1",
    name: "Hill's Prescription Diet",
    brand: "Hill's",
    price: 89.99,
    category: "prescription",
    image: "",
    badge: "Rx Required",
    info: {
      keyIngredients: ["Chicken", "Brown Rice", "Omega Fatty Acids"],
      dosage: "As prescribed by veterinarian",
      description: "Clinical nutrition for kidney health support",
    },
  },
  {
    id: "2",
    name: "PureVita Joint Support",
    brand: "PureVita",
    price: 34.99,
    category: "vitamins",
    image: "",
    badge: "Best Seller",
    info: {
      keyIngredients: ["Glucosamine", "Chondroitin", "MSM", "Turmeric"],
      dosage: "1 tablet per 25 lbs daily",
      description: "Advanced joint mobility formula",
    },
  },
  {
    id: "3",
    name: "Royal Canin Renal Support",
    brand: "Royal Canin",
    price: 76.5,
    category: "dry-food",
    image: "",
    info: {
      keyIngredients: ["Pork", "Chicken Fat", "Fish Oil", "Antioxidants"],
      description: "Veterinary exclusive renal support diet",
    },
  },
  {
    id: "4",
    name: "Pro Plan Veterinary Diets",
    brand: "Purina",
    price: 4.99,
    category: "wet-food",
    image: "",
    badge: "New",
    info: {
      keyIngredients: ["Ocean Fish", "Liver", "Essential Vitamins"],
      dosage: "1 can per 10 lbs body weight",
      description: "Gastrointestinal health formula",
    },
  },
  {
    id: "5",
    name: "Buffered Aspirin",
    brand: "Nutri-Vet",
    price: 12.99,
    category: "prescription",
    image: "",
    badge: "Rx Required",
    info: {
      keyIngredients: ["Aspirin (120mg)", "Microcrystalline Cellulose"],
      dosage: "5mg per lb every 12 hours",
      description: "Pain relief for medium to large dogs",
    },
  },
  {
    id: "6",
    name: "Probiotic Daily Chews",
    brand: "Zesty Paws",
    price: 28.99,
    category: "vitamins",
    image: "",
    info: {
      keyIngredients: ["DE111 Probiotic", "Pumpkin", "Papaya"],
      dosage: "1 soft chew per 25 lbs",
      description: "Digestive health and immune support",
    },
  },
  {
    id: "7",
    name: "Orijen Original",
    brand: "Orijen",
    price: 94.99,
    category: "dry-food",
    image: "",
    badge: "Premium",
    info: {
      keyIngredients: ["Free-Run Chicken", "Turkey", "Wild-Caught Fish", "Eggs"],
      description: "Biologically appropriate whole prey diet",
    },
  },
  {
    id: "8",
    name: "Blue Buffalo Wilderness",
    brand: "Blue Buffalo",
    price: 3.49,
    category: "wet-food",
    image: "",
    info: {
      keyIngredients: ["Real Duck", "Chicken Broth", "Potatoes", "Carrots"],
      dosage: "Feed as meal or topper",
      description: "High-protein grain-free paté",
    },
  },
  {
    id: "9",
    name: "Adjustable Slow Feeder",
    brand: "Outward Hound",
    price: 24.99,
    category: "accessories",
    image: "",
    info: {
      description: "Maze design slows eating by 10x",
    },
  },
  {
    id: "10",
    name: "Omega-3 Fish Oil",
    brand: "Nordic Naturals",
    price: 22.99,
    category: "vitamins",
    image: "",
    badge: "Vet Recommended",
    info: {
      keyIngredients: ["Wild Anchovy Oil", "EPA", "DHA", "Vitamin E"],
      dosage: "0.5 tsp per 20 lbs daily",
      description: "Pharmaceutical-grade omega supplement",
    },
  },
  {
    id: "11",
    name: "Hydrolyzed Protein",
    brand: "Royal Canin",
    price: 82.0,
    category: "prescription",
    image: "",
    badge: "Rx Required",
    info: {
      keyIngredients: ["Hydrolyzed Soy Protein", "Coconut Oil", "B Vitamins"],
      dosage: "As directed by veterinarian",
      description: "For food sensitivities and allergies",
    },
  },
  {
    id: "12",
    name: "Drinkwell Fountain",
    brand: "PetSafe",
    price: 49.99,
    category: "accessories",
    image: "",
    badge: "Best Seller",
    info: {
      description: "Encourages hydration with filtered circulating water",
    },
  },
];

export default function VetPharmacy() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [cartCount, setCartCount] = useState(0);
  const cartRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="pharmacy" className="w-full px-6 py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#00ACC1]">
              Shop Now
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">
              Vet-Pharmacy & Nutrition
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">
              Premium veterinary-grade products and nutrition for your companion&apos;s optimal health.
            </p>
          </div>

          {/* Cart Indicator */}
          <motion.div
            ref={cartRef}
            className="flex items-center gap-3"
            animate={cartCount > 0 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
            key={cartCount}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00ACC1]/10 border border-[#00ACC1]/20">
              <ShoppingCart className="h-5 w-5 text-[#00ACC1]" />
            </div>
            <div>
              <p className="text-xs text-[#90A4AE]">Cart</p>
              <p className="text-lg font-semibold text-[#004D40]">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mb-10 flex flex-wrap gap-3"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#00ACC1] text-white shadow-lg shadow-[rgba(0,172,193,0.3)]"
                    : "bg-white text-[#546E7A] border border-[rgba(0,172,193,0.08)] hover:bg-[#E0F7FA] hover:text-[#004D40]"
                }`}
              >
                <Icon className={`h-4 w-4 transition-colors ${isActive ? "text-white" : "text-[#90A4AE]"}`} />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                cartRef={cartRef}
                onAddToCart={() => setCartCount((c) => c + 1)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <button className="group flex items-center gap-2 rounded-full border border-[rgba(0,172,193,0.15)] bg-white px-8 py-3 text-sm font-medium text-[#546E7A] transition-all hover:border-[#00ACC1]/30 hover:bg-[#00ACC1]/10 hover:text-[#00ACC1] shadow-sm hover:shadow-md">
            View All Products
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  cartRef,
  onAddToCart,
}: {
  product: Product;
  index: number;
  cartRef: React.RefObject<HTMLDivElement | null>;
  onAddToCart: () => void;
}) {
  const [added, setAdded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const flyingItem = useAnimation();

  const handleAddToCart = async () => {
    if (!buttonRef.current || !cartRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;

    await flyingItem.start({
      x: [0, endX - startX],
      y: [0, endY - startY],
      scale: [1, 0.5, 0.3],
      opacity: [1, 1, 0],
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    });

    flyingItem.set({ x: 0, y: 0, scale: 1, opacity: 0 });
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover="hover"
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(0,172,193,0.08)] bg-white transition-all duration-500 hover:border-[#00ACC1]/30 hover:shadow-[0_12px_40px_rgba(0,172,193,0.18)]">
        {/* ── Product Image Area ── */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2]">
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              hover: { scale: 1.15, opacity: 0.8 },
            }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#00ACC1]/15 to-[#4DD0E1]/15 blur-2xl" />
          </motion.div>

          {/* Product Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              hover: { scale: 1.1, filter: "brightness(0.9)" },
            }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[rgba(0,172,193,0.12)] bg-white/80 backdrop-blur-sm shadow-sm">
              {product.category === "prescription" && <Pill className="h-10 w-10 text-[#FF8A80]/70" />}
              {product.category === "vitamins" && <FlaskConical className="h-10 w-10 text-amber-400/70" />}
              {product.category === "dry-food" && <Cookie className="h-10 w-10 text-[#4DD0E1]/70" />}
              {product.category === "wet-food" && <Droplets className="h-10 w-10 text-blue-400/70" />}
              {product.category === "accessories" && <Bone className="h-10 w-10 text-[#BA68C8]/70" />}
            </div>
          </motion.div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute left-3 top-3 z-10">
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  product.badge === "Rx Required"
                    ? "bg-red-50 text-red-500 border border-red-200"
                    : product.badge === "New"
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : product.badge === "Premium"
                    ? "bg-amber-50 text-amber-600 border border-amber-200"
                    : "bg-[#E0F7FA] text-[#00ACC1] border border-[rgba(0,172,193,0.2)]"
                }`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* ── Glassmorphism Lens Overlay ── */}
          <motion.div
            variants={{
              hover: { opacity: 1, y: 0 },
            }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col justify-end backdrop-blur-md bg-gradient-to-t from-white/95 via-white/70 to-transparent"
          >
            {/* Scan-line accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ACC1]/40 to-transparent" />

            <div className="p-5">
              {/* Header */}
              <div className="mb-3 flex items-center gap-2">
                <Info className="h-3.5 w-3.5 text-[#00ACC1]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#00ACC1]">
                  Quick Look
                </span>
              </div>

              {/* Key Ingredients */}
              {product.info.keyIngredients && (
                <div className="mb-3">
                  <p className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-[#90A4AE]">
                    Key Ingredients
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.info.keyIngredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="rounded-full border border-[rgba(0,172,193,0.1)] bg-[#E0F7FA]/60 px-2 py-0.5 text-[9px] text-[#546E7A] backdrop-blur-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dosage */}
              {product.info.dosage && (
                <div className="mb-3">
                  <p className="mb-0.5 text-[9px] uppercase tracking-[0.2em] text-[#90A4AE]">
                    Dosage
                  </p>
                  <p className="text-[11px] text-[#546E7A]">{product.info.dosage}</p>
                </div>
              )}

              {/* Description */}
              {product.info.description && (
                <p className="mb-4 text-[10px] leading-relaxed text-[#90A4AE]">
                  {product.info.description}
                </p>
              )}

              {/* Quick Add button */}
              <div className="relative">
                <motion.button
                  ref={buttonRef}
                  onClick={handleAddToCart}
                  disabled={added}
                  whileTap={{ scale: 0.95 }}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-300 ${
                    added
                      ? "border border-emerald-300 bg-emerald-50 text-emerald-600"
                      : "border border-[#00ACC1]/30 bg-[#00ACC1]/10 text-[#00ACC1] hover:bg-[#00ACC1]/20 hover:shadow-[0_0_15px_-3px_rgba(0,172,193,0.3)]"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span
                        key="done"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5" /> Added
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-1.5"
                      >
                        <Plus className="h-3.5 w-3.5" /> Quick Add
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Flying item animation */}
                <motion.div
                  animate={flyingItem}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 0 }}
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00ACC1] shadow-[0_0_15px_rgba(0,172,193,0.5)]">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <p className="mb-1 text-xs font-medium text-[#90A4AE]">{product.brand}</p>
          <h3 className="mb-3 font-semibold text-[#004D40]">{product.name}</h3>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#00ACC1]">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
