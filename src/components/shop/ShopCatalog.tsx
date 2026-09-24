"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bone,
  ChevronRight,
  Home,
  Plus,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useCardGlow } from "@/components/ui/useCardGlow";
import { useCart } from "@/components/providers/CartProvider";
import { categories, products, getCategory, type Product } from "@/lib/products";

/* ────────────────────────────────────────────────────────────
   Shop catalogue — every product across the PawCare store, told in
   the same aqua/glass language as the landing page. Category tabs
   filter a single floating grid; each card links to its detail
   page and can be added straight to the shared cart.
   ───────────────────────────────────────────────────────────── */

export default function ShopCatalog() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const { count, addItem } = useCart();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = active === "all" || p.category === active;
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        getCategory(p.category).label.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-10 sm:px-8">
      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-[#546E7A]">
        <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#00ACC1]">
          <Home className="h-3.5 w-3.5" />
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#90A4AE]" />
        <span className="font-medium text-[#004D40]">Shop</span>
      </nav>

      {/* ── Header ── */}
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/65 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00ACC1] shadow-[0_14px_34px_-26px_rgba(0,77,64,0.9)] backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ACC1] opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ACC1]" />
            </span>
            The PawCare Shop
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#004D40] sm:text-5xl">
            Everything your pet{" "}
            <span className="bg-gradient-to-r from-[#00ACC1] via-[#26C6DA] to-[#00BFA5] bg-clip-text text-transparent">
              needs
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">
            Vet-grade medications, premium nutrition, supplements, grooming and
            more — delivered to your door.
          </p>
        </div>

        {/* Cart pill */}
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
      <div className="mt-8 w-full max-w-md">
        <div className="flex items-center rounded-full border border-white/70 bg-white/80 shadow-[0_18px_44px_-30px_rgba(0,77,64,0.55)] backdrop-blur-md focus-within:shadow-[0_0_0_3px_rgba(0,172,193,0.15),0_18px_44px_-30px_rgba(0,77,64,0.55)]">
          <Search className="ml-5 h-4 w-4 shrink-0 text-[#90A4AE]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="flex-1 bg-transparent px-3 py-3.5 text-sm text-[#004D40] outline-none placeholder:text-[#90A4AE]"
          />
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Product categories">
        <CategoryTab
          label="All Products"
          active={active === "all"}
          onClick={() => setActive("all")}
          count={products.length}
        />
        {categories.map((c) => {
          const Icon = c.icon;
          const cnt = products.filter((p) => p.category === c.id).length;
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

      {/* ── Product grid ── */}
      <div className="mt-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active + query}
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
              Try a different search or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("all");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00ACC1] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0097A7]"
            >
              Clear filters
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="mt-16 overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-white/80 to-[#E0F7FA]/70 px-8 py-12 text-center shadow-[0_40px_90px_-56px_rgba(0,77,64,0.7)] backdrop-blur-sm">
        <Bone className="mx-auto h-8 w-8 text-[#00ACC1]" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#004D40] sm:text-3xl">
          Not sure what your pet needs?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[#546E7A]">
          Chat with a licensed vet and get a personalised product plan built
          around your companion.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00ACC1] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_44px_-20px_rgba(0,172,193,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[#0097A7]"
        >
          Ask a Vet
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
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

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: Product;
  index: number;
  onAdd: () => void;
}) {
  const category = getCategory(product.category);
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

        {/* Thumbnail area — links to the detail page */}
        <Link
          href={`/shop/${product.id}`}
          className="relative flex h-36 items-center justify-center overflow-hidden rounded-[18px]"
          style={{ background: category.wash }}
          aria-label={`View ${product.name}`}
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
        </Link>

        {/* Details */}
        <div className="relative mt-4 flex flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: category.tint }}>
            {category.label}
          </span>
          <Link href={`/shop/${product.id}`} className="mt-1">
            <h3 className="text-base font-semibold tracking-tight text-[#004D40] transition-colors hover:text-[#00ACC1]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">{product.blurb}</p>

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
