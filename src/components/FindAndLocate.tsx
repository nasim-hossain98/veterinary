"use client";

import { useState } from "react";
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
            The &ldquo;Find & Locate&rdquo; Engine
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">
            Discover veterinary clinics and pet supply stores near you. Real-time availability, directions, and more.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6"
        >
          {/* Sidebar Controls */}
          <div className="space-y-6">
            {/* Toggle */}
            <div className="rounded-2xl border border-[rgba(0,172,193,0.08)] bg-white p-2 shadow-[0_8px_32px_rgba(0,172,193,0.15)]">
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
            </div>

            {/* Cards List - Desktop Sidebar */}
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

          {/* Map Area */}
          <div className="relative min-h-[500px] lg:min-h-[600px] rounded-3xl border border-[rgba(0,172,193,0.08)] bg-white overflow-hidden shadow-[0_8px_32px_rgba(0,172,193,0.15)]">
            {/* Map Background Grid */}
            <div className="absolute inset-0 opacity-40">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 172, 193, 0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 172, 193, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Map Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,172,193,0.05),transparent_70%)]" />

            {/* Map Markers */}
            <div className="absolute inset-0">
              {activeTab === "medical" ? (
                <>
                  <MapMarker top="30%" left="25%" type="medical" label="Central Vet" />
                  <MapMarker top="45%" left="55%" type="medical" label="PetCare" />
                  <MapMarker top="65%" left="40%" type="medical" label="Wellness" />
                </>
              ) : (
                <>
                  <MapMarker top="35%" left="30%" type="supplies" label="Premium" />
                  <MapMarker top="50%" left="60%" type="supplies" label="PetWorld" />
                  <MapMarker top="70%" left="45%" type="supplies" label="Essentials" />
                </>
              )}

              {/* User Location */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 animate-ping rounded-full bg-[#00ACC1]/20" />
                  <div className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#00ACC1] shadow-[0_0_20px_rgba(0,172,193,0.5)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute right-4 top-4 flex flex-col gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,172,193,0.08)] bg-white/90 text-[#546E7A] backdrop-blur-sm transition-colors hover:text-[#004D40] shadow-sm">
                <span className="text-lg font-medium">+</span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,172,193,0.08)] bg-white/90 text-[#546E7A] backdrop-blur-sm transition-colors hover:text-[#004D40] shadow-sm">
                <span className="text-lg font-medium">−</span>
              </button>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 rounded-xl border border-[rgba(0,172,193,0.08)] bg-white/90 px-4 py-3 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#FF8A80]">
                    <Stethoscope className="h-2 w-2 text-white" />
                  </div>
                  <span className="text-xs text-[#546E7A]">Clinic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#4DD0E1]">
                    <ShoppingBag className="h-2 w-2 text-white" />
                  </div>
                  <span className="text-xs text-[#546E7A]">Shop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full border-2 border-[#00ACC1] bg-[#00ACC1]/50" />
                  <span className="text-xs text-[#546E7A]">You</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards - Mobile Below Map */}
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

function ClinicCard({ clinic, index }: { clinic: Clinic; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group rounded-2xl border border-[rgba(0,172,193,0.08)] bg-white p-5 transition-all duration-300 hover:border-[#00ACC1]/30 hover:shadow-[0_8px_32px_rgba(0,172,193,0.18)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8A80]/15 border border-[#FF8A80]/20">
            <Stethoscope className="h-5 w-5 text-[#FF8A80]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#004D40]">{clinic.name}</h3>
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
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[rgba(0,172,193,0.1)] bg-white px-4 py-2.5 text-sm font-medium text-[#546E7A] transition-colors hover:bg-[#E0F7FA] hover:text-[#004D40]">
          <Navigation className="h-4 w-4" />
          Directions
        </button>
      </div>
    </motion.div>
  );
}

function ShopCard({ shop, index }: { shop: Shop; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group rounded-2xl border border-[rgba(0,172,193,0.08)] bg-white p-5 transition-all duration-300 hover:border-[#4DD0E1]/30 hover:shadow-[0_8px_32px_rgba(77,208,225,0.18)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4DD0E1]/15 border border-[#4DD0E1]/20">
            <ShoppingBag className="h-5 w-5 text-[#4DD0E1]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#004D40]">{shop.name}</h3>
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

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4DD0E1]/10 px-4 py-2.5 text-sm font-medium text-[#0097A7] transition-colors hover:bg-[#4DD0E1]/20">
        <Navigation className="h-4 w-4" />
        Get Directions
        <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function MapMarker({
  top,
  left,
  type,
  label,
}: {
  top: string;
  left: string;
  type: "medical" | "supplies";
  label: string;
}) {
  const isMedical = type === "medical";

  return (
    <motion.div
      className="absolute"
      style={{ top, left }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {/* Pulse ring */}
        <div
          className={`absolute -inset-3 animate-ping rounded-full opacity-30 ${
            isMedical ? "bg-[#FF8A80]" : "bg-[#4DD0E1]"
          }`}
        />

        {/* Marker */}
        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-lg ${
            isMedical
              ? "bg-[#FF8A80] shadow-[#FF8A80]/30"
              : "bg-[#4DD0E1] shadow-[#4DD0E1]/30"
          }`}
        >
          {isMedical ? (
            <Stethoscope className="h-5 w-5 text-white" />
          ) : (
            <ShoppingBag className="h-5 w-5 text-white" />
          )}
        </div>

        {/* Label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#004D40] backdrop-blur-sm shadow-sm">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
