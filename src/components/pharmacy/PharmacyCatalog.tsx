"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, ShoppingBag, Star } from "lucide-react";
import { useCardGlow } from "@/components/ui/useCardGlow";
import { useCart } from "@/components/providers/CartProvider";
import {
  pharmacyCategories,
  pharmacyProducts,
  getPharmacyCategory,
  type PharmacyProduct,
} from "@/lib/pharmacy";

/* ────────────────────────────────────────────────────────────
   Pharmacy catalogue — every medical product in the PawCare
   pharmacy (medicines, vaccines, parasite control, first-aid
   supplies and diagnostics). Category + species filters narrow a
   single floating grid, told in the same aqua/glass language as
   the rest of the site. Items add straight to the shared cart.
   ───────────────────────────────────────────────────────────── */

const SPECIES = ["Dogs", "Cats", "Birds"] as const;

export default function PharmacyCatalog() {
  const [active, setActive] = useState<string>("all");
  const [species, setSpecies] = useState<string>("all");
  const [query, setQuery] = useState("");
  const { count, addItem } = useCart();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pharmacyProducts.filter((p) => {
      const matchesCategory = active === "all" || p.category === active;
      const matchesSpecies = species === "all" || p.species.includes(species);
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        getPharmacyCategory(p.category).label.toLowerCase().includes(q);
      return matchesCategory && matchesSpecies && matchesQuery;
    });
  }, [active, species, query]);

  return (
    <section
      id="products"
      className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 pt-2 sm:px-8"
    >
      {/* ── Cart pill ── */}
      <div className="flex justify-end">
        <div className="flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-2.5 shadow-[0_16px_40px_-28px_rgba(0,77,64,0.9)] backdrop-blur-sm">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#00ACC1] text-white">
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#FF8A80] px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </span>
          <div className="pr-1 leading-tight">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#90A4AE]">Cart</p>
            <p className="text-sm font-bold text-[#004D40]">{count} item{count === 1 ? "" : "s"}</p>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="mt-4 w-full max-w-md">
        <div className="flex items-center rounded-full border border-white/70 bg-white/80 shadow-[0_18px_44px_-30px_rgba(0,77,64,0.55)] backdrop-blur-md focus-within:shadow-[0_0_0_3px_rgba(0,172,193,0.15),0_18px_44px_-30px_rgba(0,77,64,0.55)]">
          <Search className="ml-5 h-4 w-4 shrink-0 text-[#90A4AE]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medicines, vaccines, supplies…"
            aria-label="Search pharmacy products"
            className="flex-1 bg-transparent px-3 py-3.5 text-sm text-[#004D40] outline-none placeholder:text-[#90A4AE]"
          />
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Pharmacy categories">
        <CategoryTab
          label="All Products"
          active={active === "all"}
          onClick={() => setActive("all")}
          count={pharmacyProducts.length}
        />
        {pharmacyCategories.map((c) => {
          const Icon = c.icon;
          const cnt = pharmacyProducts.filter((p) => p.category === c.id).length;
          return (
            <CategoryTab
              key={c.id}
              label={c.label}
              icon={<Icon className="h-4 w-4" style={{ color: active === c.id ? "#fff" : c.tint }} />}
              active={active === c.id}
              onClick={() => setActive(c.id)}
              count={cnt}
            />
          );
        })}
      </div>

      {/* ── Species filter ── */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#90A4AE]">
          For
        </span>
        <SpeciesChip label="All Pets" active={species === "all"} onClick={() => setSpecies("all")} />
        {SPECIES.map((s) => (
          <SpeciesChip
            key={s}
            label={s}
            active={species === s}
            onClick={() => setSpecies(s)}
          />
        ))}
      </div>

      {/* ── Product grid ── */}
      <div className="mt-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active + species + query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onAdd={() => addItem({ id: product.id, name: product.name, price: product.price })}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="mt-6 rounded-3xl border border-white/70 bg-white/60 px-6 py-16 text-center backdrop-blur-sm">
            <p className="text-lg font-semibold text-[#004D40]">No products found</p>
            <p className="mt-1 text-sm text-[#546E7A]">
              Try a different search, category or pet.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("all");
                setSpecies("all");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00ACC1] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0097A7]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryTab({
  label,
  icon,
  active,
  onClick,
  count,
}: {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
        active
          ? "border-transparent bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white shadow-[0_14px_30px_-16px_rgba(0,172,193,0.95)]"
          : "border-white/70 bg-white/65 text-[#546E7A] backdrop-blur-sm hover:bg-white hover:text-[#004D40]"
      }`}
    >
      {icon}
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
          active ? "bg-white/25 text-white" : "bg-[#00ACC1]/10 text-[#00ACC1]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function SpeciesChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
        active
          ? "border-[#00ACC1] bg-[#00ACC1]/10 text-[#00ACC1]"
          : "border-white/70 bg-white/60 text-[#546E7A] backdrop-blur-sm hover:bg-white hover:text-[#004D40]"
      }`}
    >
      {label}
    </button>
  );
}

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: PharmacyProduct;
  index: number;
  onAdd: () => void;
}) {
  const category = getPharmacyCategory(product.category);
  const Icon = category.icon;
  const glow = useCardGlow({ accentRgb: category.glow, maxTilt: 5, radius: 200, intensity: 0.24 });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <div
        className="glass-surface relative flex h-full flex-col overflow-hidden rounded-[26px] p-5"
        style={{ "--glass-tint": category.glow, ...glow.tiltStyle } as unknown as React.CSSProperties}
        {...glow.handlers}
      >
        {/* Cursor-following spotlight */}
        <motion.span className="pointer-events-none absolute inset-0" style={glow.spotlightStyle} />
        <span className="glass-rim" />
        <span className="glass-bloom" />

        {/* Thumbnail */}
        <div
          className="relative flex h-36 items-center justify-center overflow-hidden rounded-[18px]"
          style={{ background: category.wash }}
        >
          {product.badge && (
            <span
              className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: product.badge === "Prescription" ? "#01579B" : "#FF8A80" }}
            >
              {product.badge}
            </span>
          )}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-[#004D40] backdrop-blur-sm">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/70 bg-white/50 shadow-[0_16px_30px_-20px_rgba(0,77,64,0.95)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
            <Icon className="h-9 w-9" style={{ color: category.tint }} />
          </span>
        </div>

        {/* Details */}
        <div className="relative mt-4 flex flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: category.tint }}>
            {category.label}
          </span>
          <h3 className="mt-1 text-base font-semibold tracking-tight text-[#004D40]">
            {product.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">{product.blurb}</p>

          {/* Species tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.species.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[rgba(0,172,193,0.16)] bg-white/70 px-2 py-0.5 text-[10px] font-medium text-[#546E7A]"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between pt-1">
            <span className="text-lg font-bold text-[#004D40]">
              ${product.price.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#00ACC1] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,172,193,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#0097A7] active:scale-95"
            >
              <Plus className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
