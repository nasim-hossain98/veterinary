"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Heart,
  Home,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { useCardGlow } from "@/components/ui/useCardGlow";
import { useCart } from "@/components/providers/CartProvider";
import {
  getCategory,
  relatedProducts,
  type Product,
  type Review,
} from "@/lib/products";

/* ────────────────────────────────────────────────────────────
   Product detail — the /shop/[id] experience.

   Two-column hero (gallery + purchase panel) above a details /
   reviews tab bar and a "related products" rail. Everything speaks
   the same aqua/glass language as the catalogue: glass surfaces,
   cursor spotlights, spring entrances and the shared cart context.
   ───────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [tab, setTab] = useState<"details" | "reviews">("details");
  const { count, addItem } = useCart();

  /* Resolved client-side: the Category object carries a lucide icon
     component, which cannot cross the server → client boundary as a prop. */
  const category = getCategory(product.category);
  const Icon = category.icon;
  const related = relatedProducts(product);

  const add = (quantity: number) =>
    addItem({ id: product.id, name: product.name, price: product.price }, quantity);

  return (
    <>
      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-[#546E7A]">
        <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#00ACC1]">
          <Home className="h-3.5 w-3.5" />
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#90A4AE]" />
        <Link href="/shop" className="transition-colors hover:text-[#00ACC1]">
          Shop
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-[#90A4AE]" />
        <span className="font-medium text-[#004D40]">{product.name}</span>
      </nav>

      {/* ── Hero: gallery + purchase panel ── */}
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        {/* Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="glass-surface relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[32px] p-10 sm:min-h-[26rem]"
          style={{ "--glass-tint": category.glow } as React.CSSProperties}
        >
          <span className="glass-rim" />
          <span className="glass-bloom" />
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: category.wash }}
          />
          {/* soft pedestal glow behind the icon */}
          <span
            aria-hidden="true"
            className="absolute h-64 w-64 rounded-full blur-3xl"
            style={{ background: `rgba(${category.glow},0.28)` }}
          />

          {product.badge && (
            <span
              className="absolute left-5 top-5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg"
              style={{ backgroundColor: product.badge === "Prescription" ? "#01579B" : "#FF8A80" }}
            >
              {product.badge}
            </span>
          )}

          <motion.span
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="relative flex h-36 w-36 items-center justify-center rounded-[28px] border border-white/70 bg-white/60 shadow-[0_30px_60px_-28px_rgba(0,77,64,0.95)] backdrop-blur-sm sm:h-44 sm:w-44"
          >
            <Icon className="h-16 w-16 sm:h-20 sm:w-20" style={{ color: category.tint }} />
          </motion.span>
        </motion.section>


        {/* Purchase panel */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="glass-surface relative flex flex-col overflow-hidden rounded-[32px] p-7 sm:p-9"
          style={{ "--glass-tint": category.glow } as React.CSSProperties}
        >
          <span className="glass-rim" />
          <span className="glass-bloom" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: category.tint }}
              >
                <Icon className="h-3.5 w-3.5" />
                {category.label}
              </span>
              <h1 className="mt-2 text-3xl font-bold leading-[1.1] tracking-tight text-[#004D40] sm:text-4xl">
                {product.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setWishlisted((w) => !w)}
              aria-pressed={wishlisted}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-all active:scale-90 ${
                wishlisted
                  ? "border-transparent bg-[#FF8A80] text-white shadow-[0_12px_26px_-12px_rgba(255,138,128,0.95)]"
                  : "border-white/70 bg-white/65 text-[#546E7A] hover:text-[#FF8A80]"
              }`}
            >
              <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Rating */}
          <div className="relative mt-4 flex items-center gap-2.5">
            <StarRow rating={product.rating} />
            <span className="text-sm font-semibold text-[#004D40]">{product.rating.toFixed(1)}</span>
            <button
              type="button"
              onClick={() => setTab("reviews")}
              className="text-sm text-[#546E7A] underline-offset-2 transition-colors hover:text-[#00ACC1] hover:underline"
            >
              ({product.reviewCount} reviews)
            </button>
          </div>

          <p className="relative mt-5 leading-relaxed text-[#546E7A]">{product.description}</p>

          {/* Price */}
          <div className="relative mt-6 flex items-end gap-3">
            <span className="text-4xl font-bold tracking-tight text-[#004D40]">
              ${product.price.toFixed(2)}
            </span>
            <span className="pb-1.5 text-sm text-[#90A4AE]">incl. taxes · per unit</span>
          </div>

          {/* Quantity + actions */}
          <div className="relative mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-white/70 bg-white/75 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#004D40] transition-colors hover:text-[#00ACC1] disabled:opacity-35"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span aria-live="polite" className="w-8 text-center text-sm font-bold text-[#004D40]">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center rounded-full text-[#004D40] transition-colors hover:text-[#00ACC1]"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => add(qty)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#00ACC1] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_44px_-20px_rgba(0,172,193,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[#0097A7] active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => add(qty)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#004D40] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_44px_-22px_rgba(0,77,64,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#00695C] active:scale-95"
            >
              <Zap className="h-4 w-4" />
              Buy Now
            </button>
          </div>

          <p aria-live="polite" className="relative mt-4 text-xs font-medium text-[#546E7A]">
            {count > 0 ? `${count} item${count === 1 ? "" : "s"} in your cart` : "Your cart is empty"}
          </p>

          {/* Feature list */}
          <ul className="relative mt-6 space-y-2.5 border-t border-white/60 pt-6">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-[#455A64]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00BFA5]" />
                {f}
              </li>
            ))}
          </ul>

          {/* Trust badges */}
          <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <TrustBadge icon={<Truck className="h-4 w-4" />} label="Free delivery over $50" />
            <TrustBadge icon={<RotateCcw className="h-4 w-4" />} label="30-day easy returns" />
            <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} label="Vet approved" />
          </div>
        </motion.section>
      </div>

      {/* ── Tabs: details / reviews ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
        className="glass-surface relative mt-8 overflow-hidden rounded-[32px] p-7 sm:p-9"
        style={{ "--glass-tint": category.glow } as React.CSSProperties}
      >
        <span className="glass-rim" />
        <span className="glass-bloom" />

        <div className="relative flex gap-2" role="tablist" aria-label="Product information">
          <TabButton active={tab === "details"} onClick={() => setTab("details")}>
            Details
          </TabButton>
          <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")}>
            Reviews ({product.reviewCount})
          </TabButton>
        </div>

        {tab === "details" ? (
          <div className="relative mt-7 grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#004D40]">About this product</h2>
              <p className="mt-3 leading-relaxed text-[#546E7A]">{product.description}</p>
              <p className="mt-3 leading-relaxed text-[#546E7A]">
                Every {category.label.toLowerCase()} product in the PawCare shop is
                checked by our veterinary team before it ships, so you can order
                with confidence.
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/55 p-5 backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#004D40]">
                Why pets love it
              </h3>
              <ul className="mt-4 space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#455A64]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: category.tint }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="relative mt-7">
            {/* Summary */}
            <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/70 bg-white/55 p-6 backdrop-blur-sm sm:flex-row sm:items-center">
              <div className="text-center">
                <p className="text-5xl font-bold tracking-tight text-[#004D40]">
                  {product.rating.toFixed(1)}
                </p>
                <StarRow rating={product.rating} className="mt-2 justify-center" />
                <p className="mt-1.5 text-xs text-[#90A4AE]">{product.reviewCount} verified reviews</p>
              </div>
              <div className="h-px w-full bg-white/70 sm:h-16 sm:w-px" />
              <p className="max-w-md text-sm leading-relaxed text-[#546E7A]">
                Real feedback from PawCare pet parents. Reviews are collected after
                verified purchases and moderated by our care team.
              </p>
            </div>

            {/* Review cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {product.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} tint={category.tint} />
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* ── Related products ── */}
      {related.length > 0 && (
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: category.tint }}
              >
                More {category.label}
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#004D40] sm:text-3xl">
                You may also like
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1.5 text-sm font-semibold text-[#00ACC1] transition-colors hover:text-[#0097A7] sm:inline-flex"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <RelatedCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/* ────────────────────────── Pieces ────────────────────────── */

function StarRow({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-[#CFD8DC] text-[#CFD8DC]"
          }`}
        />
      ))}
    </span>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3.5 py-2 text-xs font-semibold text-[#455A64] backdrop-blur-sm">
      <span className="text-[#00ACC1]">{icon}</span>
      {label}
    </span>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
        active
          ? "border-transparent bg-gradient-to-r from-[#00ACC1] to-[#0097A7] text-white shadow-[0_14px_30px_-16px_rgba(0,172,193,0.95)]"
          : "border-white/70 bg-white/65 text-[#546E7A] backdrop-blur-sm hover:bg-white hover:text-[#004D40]"
      }`}
    >
      {children}
    </button>
  );
}

function ReviewCard({ review, tint }: { review: Review; tint: string }) {
  return (
    <article className="rounded-2xl border border-white/70 bg-white/60 p-5 backdrop-blur-sm transition-shadow hover:shadow-[0_20px_44px_-30px_rgba(0,77,64,0.7)]">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: tint }}
        >
          {review.avatar}
        </span>
        <div className="flex-1 leading-tight">
          <p className="text-sm font-semibold text-[#004D40]">{review.author}</p>
          <p className="text-xs text-[#90A4AE]">{review.date}</p>
        </div>
        <StarRow rating={review.rating} />
      </div>
      <h3 className="mt-4 text-sm font-bold text-[#004D40]">{review.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#546E7A]">{review.body}</p>
    </article>
  );
}


function RelatedCard({ product, index }: { product: Product; index: number }) {
  const category = getCategory(product.category);
  const Icon = category.icon;
  const glow = useCardGlow({ accentRgb: category.glow, maxTilt: 5, radius: 200, intensity: 0.24 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24), ease: EASE }}
      className="group h-full"
    >
      <div
        className="glass-surface relative flex h-full flex-col overflow-hidden rounded-[26px] p-5"
        style={{ "--glass-tint": category.glow, ...glow.tiltStyle } as unknown as React.CSSProperties}
        {...glow.handlers}
      >
        <motion.span className="pointer-events-none absolute inset-0" style={glow.spotlightStyle} />
        <span className="glass-rim" />
        <span className="glass-bloom" />

        <Link
          href={`/shop/${product.id}`}
          className="relative flex h-32 items-center justify-center overflow-hidden rounded-[18px]"
          style={{ background: category.wash }}
          aria-label={`View ${product.name}`}
        >
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-[#004D40] backdrop-blur-sm">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-white/50 shadow-[0_16px_30px_-20px_rgba(0,77,64,0.95)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
            <Icon className="h-7 w-7" style={{ color: category.tint }} />
          </span>
        </Link>

        <div className="relative mt-4 flex flex-1 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: category.tint }}>
            {category.label}
          </span>
          <Link href={`/shop/${product.id}`} className="mt-1">
            <h3 className="text-base font-semibold tracking-tight text-[#004D40] transition-colors hover:text-[#00ACC1]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#546E7A]">{product.blurb}</p>
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="text-lg font-bold text-[#004D40]">${product.price.toFixed(2)}</span>
            <Link
              href={`/shop/${product.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#00ACC1] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,172,193,0.95)] transition-all hover:-translate-y-0.5 hover:bg-[#0097A7] active:scale-95"
            >
              View
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

