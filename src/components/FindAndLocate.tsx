"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Navigation,
  Clock,
  Stethoscope,
  ShoppingBag,
  ChevronRight,
  Star,
} from "lucide-react";

type TabType = "medical" | "supplies";

interface Clinic {
  id: string;
  name: string;
  distance: string;
  isOpen: boolean;
  rating: number;
  address: string;
  phone: string;
}

interface Shop {
  id: string;
  name: string;
  distance: string;
  brands: string[];
  rating: number;
  address: string;
}

const clinics: Clinic[] = [
  {
    id: "1",
    name: "Central Vet Clinic",
    distance: "0.8 km",
    isOpen: true,
    rating: 4.8,
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "PetCare Hospital",
    distance: "2.3 km",
    isOpen: true,
    rating: 4.6,
    address: "456 Park Avenue, Midtown",
    phone: "+1 (555) 987-6543",
  },
  {
    id: "3",
    name: "Animal Wellness Center",
    distance: "4.1 km",
    isOpen: false,
    rating: 4.9,
    address: "789 Oak Road, Uptown",
    phone: "+1 (555) 456-7890",
  },
];

const shops: Shop[] = [
  {
    id: "1",
    name: "Premium Pet Supplies",
    distance: "1.2 km",
    brands: ["Royal Canin", "Purina", "Hill's"],
    rating: 4.7,
    address: "321 Commerce St, Downtown",
  },
  {
    id: "2",
    name: "PetWorld Store",
    distance: "3.5 km",
    brands: ["Royal Canin", "Blue Buffalo", "Orijen"],
    rating: 4.5,
    address: "654 Market Ave, Midtown",
  },
  {
    id: "3",
    name: "Animal Essentials",
    distance: "5.2 km",
    brands: ["Purina", "Wellness", "Instinct"],
    rating: 4.4,
    address: "987 Trade Blvd, Uptown",
  },
];

/* ── Load the Leaflet map client-side only ─────────────────────────── */
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[500px] lg:min-h-[600px] items-center justify-center rounded-3xl bg-[#E0F7FA]/40">
      <div className="flex flex-col items-center gap-3 text-[#90A4AE]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00ACC1]/30 border-t-[#00ACC1]" />
        <span className="text-sm">Loading map…</span>
      </div>
    </div>
  ),
});

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function FindAndLocate() {
  const [activeTab, setActiveTab] = useState<TabType>("medical");

  return (
    <section id="doctors" className="w-full px-6 py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#00ACC1]">
            Location Services
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">
            The &ldquo;Find &amp; Locate&rdquo; Engine
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">
            Discover veterinary clinics and pet supply stores near you.
            Real-time availability, directions, and more.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* ── Sidebar Controls ── */}
          <div className="space-y-6">
            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border border-[rgba(0,172,193,0.18)] p-2 shadow-[0_8px_32px_rgba(0,172,193,0.12)]"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
              }}
            >
              <div className="relative flex rounded-xl bg-[#E0F7FA]/50 p-1">
                <motion.div
                  className="absolute inset-y-1 rounded-lg bg-[#00ACC1]/15 border border-[#00ACC1]/30"
                  layoutId="activeTab"
                  initial={false}
                  animate={{
                    x: activeTab === "medical" ? "0%" : "100%",
                    width: "50%",
                  }}
                  transition={{ type: "spring", duration: 0.5 }}
                />
                <button
                  onClick={() => setActiveTab("medical")}
                  className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors ${
                    activeTab === "medical"
                      ? "text-[#00ACC1]"
                      : "text-[#90A4AE] hover:text-[#546E7A]"
                  }`}
                >
                  <Stethoscope className="h-4 w-4" />
                  Medical
                </button>
                <button
                  onClick={() => setActiveTab("supplies")}
                  className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors ${
                    activeTab === "supplies"
                      ? "text-[#00ACC1]"
                      : "text-[#90A4AE] hover:text-[#546E7A]"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Supplies
                </button>
              </div>
            </motion.div>

            {/* Clinic / Shop List — Desktop */}
            <div className="hidden lg:block space-y-4">
              <AnimatePresence mode="wait">
                {activeTab === "medical" ? (
                  <motion.div
                    key="medical"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {clinics.map((clinic, index) => (
                      <ClinicCard key={clinic.id} clinic={clinic} index={index} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="supplies"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {shops.map((shop, index) => (
                      <ShopCard key={shop.id} shop={shop} index={index} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Map Area ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative min-h-[500px] lg:min-h-[600px] rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(0,172,193,0.18)",
              boxShadow: "0 8px 40px rgba(0,172,193,0.12), 0 1px 0 rgba(255,255,255,0.9) inset",
            }}
          >
            <LeafletMap activeTab={activeTab} />
          </motion.div>
        </div>

        {/* Cards — Mobile Below Map */}
        <div className="mt-6 lg:hidden">
          <AnimatePresence mode="wait">
            {activeTab === "medical" ? (
              <motion.div
                key="medical-mobile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4"
              >
                {clinics.map((clinic, index) => (
                  <ClinicCard key={clinic.id} clinic={clinic} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="supplies-mobile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4"
              >
                {shops.map((shop, index) => (
                  <ShopCard key={shop.id} shop={shop} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ GLASS CARD SHELL ══════════════════════════════
   Matches ServiceBento's GlassCard exactly:
   • rgba(255,255,255,0.72) frosted white base
   • backdrop-blur-[22px]
   • Hairline top-edge "glass rim" shine
   • Subtle bottom-corner accent bloom on hover
   • Lifts y:-8 on hover with bigger shadow
═══════════════════════════════════════════════════════════════════════ */
function GlassCard({
  children,
  accentRgb = "0,172,193",
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  accentRgb?: string;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.12,
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 56px rgba(${accentRgb},0.20), 0 4px 16px rgba(${accentRgb},0.10), 0 1px 0 rgba(255,255,255,1) inset`,
        border: `1px solid rgba(${accentRgb},0.35)`,
        transition: { duration: 0.22, ease: "easeOut" },
      } as Parameters<typeof motion.div>[0]["whileHover"]}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        border: `1px solid rgba(${accentRgb},0.18)`,
        boxShadow: `0 4px 24px rgba(${accentRgb},0.10), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(${accentRgb},0.06) inset`,
      }}
    >
      {/* Glass rim — top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
        }}
      />
      {/* Hover accent bloom */}
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, rgba(${accentRgb},0.18) 0%, transparent 70%)`,
          filter: "blur(16px)",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════ CLINIC CARD ═══════════════════════════════════ */

function ClinicCard({ clinic, index }: { clinic: Clinic; index: number }) {
  return (
    <GlassCard accentRgb="255,138,128" index={index}>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8A80]/15 border border-[#FF8A80]/25">
              <Stethoscope className="h-5 w-5 text-[#FF8A80]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                {clinic.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-[#90A4AE]">{clinic.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[#E0F7FA] px-2.5 py-1">
            <MapPin className="h-3 w-3 text-[#90A4AE]" />
            <span className="text-xs text-[#546E7A]">{clinic.distance}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              clinic.isOpen
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            <Clock className="h-3 w-3" />
            {clinic.isOpen ? "Open Now" : "Closed"}
          </div>
        </div>

        <p className="mt-3 text-sm text-[#90A4AE]">{clinic.address}</p>

        <div className="mt-4 flex gap-3">
          <a
            href={`tel:${clinic.phone}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00ACC1]/10 px-4 py-2.5 text-sm font-medium text-[#00ACC1] transition-colors hover:bg-[#00ACC1]/20"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[rgba(0,172,193,0.15)] bg-white/60 px-4 py-2.5 text-sm font-medium text-[#546E7A] transition-colors hover:bg-[#E0F7FA] hover:text-[#004D40]">
            <Navigation className="h-4 w-4" />
            Directions
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

/* ═══════════════════════ SHOP CARD ════════════════════════════════════ */

function ShopCard({ shop, index }: { shop: Shop; index: number }) {
  return (
    <GlassCard accentRgb="77,208,225" index={index}>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4DD0E1]/15 border border-[#4DD0E1]/25">
              <ShoppingBag className="h-5 w-5 text-[#4DD0E1]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                {shop.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-[#90A4AE]">{shop.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[#E0F7FA] px-2.5 py-1">
            <MapPin className="h-3 w-3 text-[#90A4AE]" />
            <span className="text-xs text-[#546E7A]">{shop.distance}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-[#90A4AE] mb-2">Available Brands</p>
          <div className="flex flex-wrap gap-2">
            {shop.brands.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-[#4DD0E1]/20 bg-[#4DD0E1]/10 px-3 py-1 text-xs text-[#0097A7]"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-3 text-sm text-[#90A4AE]">{shop.address}</p>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4DD0E1]/10 border border-[#4DD0E1]/15 px-4 py-2.5 text-sm font-medium text-[#0097A7] transition-colors hover:bg-[#4DD0E1]/20">
          <Navigation className="h-4 w-4" />
          Get Directions
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </GlassCard>
  );
}
