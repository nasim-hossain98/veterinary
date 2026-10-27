"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
  Search,
  X,
} from "lucide-react";
import { useCardGlow } from "@/components/ui/useCardGlow";
import SceneShell from "@/components/experience/SceneShell";

type TabType = "medical" | "supplies";

interface Clinic {
  id: string;
  name: string;
  distance: string;
  isOpen: boolean;
  rating: number;
  address: string;
  phone: string;
  city: string;
  area: string;
}

interface Shop {
  id: string;
  name: string;
  distance: string;
  brands: string[];
  rating: number;
  address: string;
  city: string;
  area: string;
}

/* ── Bangladesh location data ─────────────────────────────────────── */

const bangladeshLocations: Record<string, string[]> = {
  Dhaka: [
    "Dhanmondi",
    "Gulshan",
    "Banani",
    "Uttara",
    "Mirpur",
    "Mohammadpur",
    "Tejgaon",
    "Motijheel",
    "Bashundhara",
    "Lalmatia",
  ],
  Chittagong: [
    "Agrabad",
    "Nasirabad",
    "Halishahar",
    "Pahartali",
    "Khulshi",
    "Chandgaon",
  ],
  Sylhet: ["Zindabazar", "Ambarkhana", "Kumarpara", "Tilagor", "Shibgonj"],
  Rajshahi: ["Shaheb Bazar", "Upashahar", "Kazla", "Motihar", "Station Road"],
  Khulna: ["Sonadanga", "Boyra", "Khalishpur", "Daulatpur", "Shib Bari"],
  Rangpur: ["Jahaj Company", "Mahiganj", "Lalbagh", "Shapla Chattar"],
  Barisal: ["Band Road", "Sadar Road", "Cox's Road", "Kawnia"],
  Comilla: ["Kandirpar", "Monohorgonj", "Laksam Road", "Court Area"],
};

const clinics: Clinic[] = [
  {
    id: "1",
    name: "Dhanmondi Vet Clinic",
    distance: "0.8 km",
    isOpen: true,
    rating: 4.8,
    address: "Road 27, Dhanmondi, Dhaka",
    phone: "+880 1711-123456",
    city: "Dhaka",
    area: "Dhanmondi",
  },
  {
    id: "2",
    name: "PetCare Hospital Dhaka",
    distance: "2.3 km",
    isOpen: true,
    rating: 4.6,
    address: "Gulshan Avenue, Gulshan, Dhaka",
    phone: "+880 1812-987654",
    city: "Dhaka",
    area: "Gulshan",
  },
  {
    id: "3",
    name: "Animal Wellness Center",
    distance: "4.1 km",
    isOpen: false,
    rating: 4.9,
    address: "Sector 7, Uttara, Dhaka",
    phone: "+880 1611-456789",
    city: "Dhaka",
    area: "Uttara",
  },
  {
    id: "4",
    name: "Mirpur Pet Hospital",
    distance: "1.5 km",
    isOpen: true,
    rating: 4.5,
    address: "Section 10, Mirpur, Dhaka",
    phone: "+880 1911-111222",
    city: "Dhaka",
    area: "Mirpur",
  },
  {
    id: "5",
    name: "Banani Vet Care",
    distance: "3.0 km",
    isOpen: true,
    rating: 4.7,
    address: "Road 11, Banani, Dhaka",
    phone: "+880 1755-333444",
    city: "Dhaka",
    area: "Banani",
  },
  {
    id: "6",
    name: "Chittagong Vet Clinic",
    distance: "1.2 km",
    isOpen: true,
    rating: 4.4,
    address: "Agrabad C/A, Agrabad, Chittagong",
    phone: "+880 1811-555666",
    city: "Chittagong",
    area: "Agrabad",
  },
  {
    id: "7",
    name: "Halishahar Animal Care",
    distance: "2.8 km",
    isOpen: false,
    rating: 4.3,
    address: "Block B, Halishahar, Chittagong",
    phone: "+880 1612-777888",
    city: "Chittagong",
    area: "Halishahar",
  },
  {
    id: "8",
    name: "Sylhet Pet Hospital",
    distance: "0.9 km",
    isOpen: true,
    rating: 4.6,
    address: "Zindabazar Point, Zindabazar, Sylhet",
    phone: "+880 1711-999000",
    city: "Sylhet",
    area: "Zindabazar",
  },
  {
    id: "9",
    name: "Rajshahi Vet Center",
    distance: "1.7 km",
    isOpen: true,
    rating: 4.5,
    address: "Shaheb Bazar Road, Shaheb Bazar, Rajshahi",
    phone: "+880 1811-222333",
    city: "Rajshahi",
    area: "Shaheb Bazar",
  },
  {
    id: "10",
    name: "Khulna Animal Clinic",
    distance: "2.1 km",
    isOpen: true,
    rating: 4.2,
    address: "Sonadanga Main Road, Sonadanga, Khulna",
    phone: "+880 1911-444555",
    city: "Khulna",
    area: "Sonadanga",
  },
];

const shops: Shop[] = [
  {
    id: "1",
    name: "Premium Pet Supplies Dhaka",
    distance: "1.2 km",
    brands: ["Royal Canin", "Purina", "Hill's"],
    rating: 4.7,
    address: "Road 4, Dhanmondi, Dhaka",
    city: "Dhaka",
    area: "Dhanmondi",
  },
  {
    id: "2",
    name: "PetWorld Gulshan",
    distance: "3.5 km",
    brands: ["Royal Canin", "Blue Buffalo", "Orijen"],
    rating: 4.5,
    address: "Gulshan Circle 2, Gulshan, Dhaka",
    city: "Dhaka",
    area: "Gulshan",
  },
  {
    id: "3",
    name: "Animal Essentials Uttara",
    distance: "5.2 km",
    brands: ["Purina", "Wellness", "Instinct"],
    rating: 4.4,
    address: "Sector 3, Uttara, Dhaka",
    city: "Dhaka",
    area: "Uttara",
  },
  {
    id: "4",
    name: "Mirpur Pet Store",
    distance: "2.0 km",
    brands: ["Royal Canin", "Me-O", "Whiskas"],
    rating: 4.3,
    address: "Section 11, Mirpur, Dhaka",
    city: "Dhaka",
    area: "Mirpur",
  },
  {
    id: "5",
    name: "Chittagong Pet Mart",
    distance: "1.8 km",
    brands: ["Purina", "Royal Canin", "Drools"],
    rating: 4.6,
    address: "Nasirabad Market, Nasirabad, Chittagong",
    city: "Chittagong",
    area: "Nasirabad",
  },
  {
    id: "6",
    name: "Sylhet Pet Shop",
    distance: "0.7 km",
    brands: ["Royal Canin", "Whiskas"],
    rating: 4.1,
    address: "Ambarkhana Road, Ambarkhana, Sylhet",
    city: "Sylhet",
    area: "Ambarkhana",
  },
];

/* ═══════════════════════ MAIN COMPONENT ══════════════════════════════ */

export default function FindAndLocate() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("medical");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") ?? "");

  const cities = Object.keys(bangladeshLocations);
  const areas = selectedCity ? bangladeshLocations[selectedCity] || [] : [];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedArea("");
  };

  const clearFilters = () => {
    setSelectedCity("");
    setSelectedArea("");
    setSearchQuery("");
  };

  const filteredClinics = useMemo(() => {
    return clinics.filter((c) => {
      if (selectedCity && c.city !== selectedCity) return false;
      if (selectedArea && c.area !== selectedArea) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          c.area.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCity, selectedArea, searchQuery]);

  const filteredShops = useMemo(() => {
    return shops.filter((s) => {
      if (selectedCity && s.city !== selectedCity) return false;
      if (selectedArea && s.area !== selectedArea) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.area.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCity, selectedArea, searchQuery]);

  const hasActiveFilters = selectedCity || selectedArea || searchQuery;
  const activeList = activeTab === "medical" ? filteredClinics : filteredShops;

  return (
    <SceneShell
      id="doctors"
      label="Care Network"
      eyebrow="Scene 04"
      aliases={["clinic", "clinics"]}
      className="relative w-full px-6 py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="flex items-center gap-2 text-sm font-medium tracking-[0.2em] uppercase text-[#00ACC1]">
            Our Locations
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">
            The &ldquo;Find &amp; Locate&rdquo; Engine
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">
            Discover veterinary clinics and pet supply stores near you.
            Search by city, area, or name.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 glass-surface rounded-2xl p-5"
          style={{ "--glass-tint": "0,172,193" } as React.CSSProperties}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Field */}
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#90A4AE]" />
              <input
                type="text"
                placeholder="Search by name or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[rgba(0,172,193,0.18)] bg-white/60 py-2.5 pl-10 pr-4 text-sm text-[#004D40] placeholder:text-[#90A4AE] outline-none focus:border-[#00ACC1]/50 focus:ring-2 focus:ring-[#00ACC1]/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#90A4AE] hover:text-[#004D40]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full rounded-xl border border-[rgba(0,172,193,0.18)] bg-white/60 px-4 py-2.5 text-sm text-[#004D40] outline-none focus:border-[#00ACC1]/50 focus:ring-2 focus:ring-[#00ACC1]/10 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Area Dropdown */}
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              disabled={!selectedCity}
              className="w-full rounded-xl border border-[rgba(0,172,193,0.18)] bg-white/60 px-4 py-2.5 text-sm text-[#004D40] outline-none focus:border-[#00ACC1]/50 focus:ring-2 focus:ring-[#00ACC1]/10 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">
                {selectedCity ? "Select Area" : "Select city first"}
              </option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 rounded-xl border border-[rgba(0,172,193,0.15)] bg-white/60 px-4 py-2.5 text-sm font-medium text-[#546E7A] transition-colors hover:bg-[#E0F7FA] hover:text-[#004D40]"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Active filter badges */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCity && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#00ACC1]/10 border border-[#00ACC1]/20 px-3 py-1 text-xs font-medium text-[#00ACC1]">
                  <MapPin className="h-3 w-3" />
                  {selectedCity}
                  {selectedArea && ` > ${selectedArea}`}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FF8A80]/10 border border-[#FF8A80]/20 px-3 py-1 text-xs font-medium text-[#FF8A80]">
                  <Search className="h-3 w-3" />
                  {`"${searchQuery}"`}
                </span>
              )}
              <span className="inline-flex items-center rounded-full bg-[#E0F7FA]/50 px-3 py-1 text-xs text-[#546E7A]">
                {activeList.length} result{activeList.length !== 1 ? "s" : ""}{" "}
                found
              </span>
            </div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
          {/* Sidebar Controls */}
          <div className="space-y-6">
            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-surface rounded-2xl p-2"
              style={{ "--glass-tint": "0,172,193" } as React.CSSProperties}
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

            {/* Clinic / Shop List - Desktop */}
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
                    {filteredClinics.length > 0 ? (
                      filteredClinics.map((clinic, index) => (
                        <ClinicCard
                          key={clinic.id}
                          clinic={clinic}
                          index={index}
                        />
                      ))
                    ) : (
                      <EmptyState tab="medical" />
                    )}
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
                    {filteredShops.length > 0 ? (
                      filteredShops.map((shop, index) => (
                        <ShopCard key={shop.id} shop={shop} index={index} />
                      ))
                    ) : (
                      <EmptyState tab="supplies" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results Area (replaces map) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl p-6"
            style={
              {
                background: "rgba(255,255,255,0.45)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.65)",
                boxShadow:
                  "0 50px 120px -60px rgba(0,77,64,0.65), 0 12px 40px -22px rgba(0,172,193,0.45), 0 1px 0 rgba(255,255,255,0.95) inset",
              } as React.CSSProperties
            }
          >
            {/* Live status badge */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-3.5 py-2 shadow-[0_4px_20px_rgba(0,172,193,0.25)] backdrop-blur-md"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ACC1] opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00ACC1]" />
                </span>
                <span className="text-xs font-semibold text-[#004D40]">
                  {hasActiveFilters
                    ? `${activeList.length} result${activeList.length !== 1 ? "s" : ""} found`
                    : "Showing all locations"}
                </span>
              </motion.div>
            </div>

            {/* Results heading */}
            <h3 className="text-lg font-semibold text-[#004D40] mb-4">
              {activeTab === "medical"
                ? "Vet Doctors & Clinics"
                : "Pet Supply Stores"}
              {selectedArea
                ? ` in ${selectedArea}, ${selectedCity}`
                : selectedCity
                  ? ` in ${selectedCity}`
                  : ""}
            </h3>

            {/* Scrollable results list */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              <AnimatePresence mode="wait">
                {activeList.length > 0 ? (
                  activeTab === "medical" ? (
                    <motion.div
                      key="results-medical"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {filteredClinics.map((clinic, index) => (
                        <ClinicCard
                          key={clinic.id}
                          clinic={clinic}
                          index={index}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results-supplies"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {filteredShops.map((shop, index) => (
                        <ShopCard key={shop.id} shop={shop} index={index} />
                      ))}
                    </motion.div>
                  )
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F7FA]/50 mb-4">
                      <Search className="h-7 w-7 text-[#90A4AE]" />
                    </div>
                    <p className="text-lg font-medium text-[#546E7A]">
                      No{" "}
                      {activeTab === "medical"
                        ? "vet clinics"
                        : "pet stores"}{" "}
                      found
                    </p>
                    <p className="mt-1 text-sm text-[#90A4AE]">
                      Try adjusting your search or filters
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 rounded-xl bg-[#00ACC1]/10 px-5 py-2 text-sm font-medium text-[#00ACC1] hover:bg-[#00ACC1]/20 transition-colors"
                      >
                        Clear all filters
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Cards - Mobile Below Results */}
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
                {filteredClinics.length > 0 ? (
                  filteredClinics.map((clinic, index) => (
                    <ClinicCard
                      key={clinic.id}
                      clinic={clinic}
                      index={index}
                    />
                  ))
                ) : (
                  <EmptyState tab="medical" />
                )}
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
                {filteredShops.length > 0 ? (
                  filteredShops.map((shop, index) => (
                    <ShopCard key={shop.id} shop={shop} index={index} />
                  ))
                ) : (
                  <EmptyState tab="supplies" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SceneShell>
  );
}

/* ═══════════════════════ EMPTY STATE ═════════════════════════════════ */

function EmptyState({ tab }: { tab: TabType }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F7FA]/50 mb-3">
        <Search className="h-5 w-5 text-[#90A4AE]" />
      </div>
      <p className="text-sm font-medium text-[#546E7A]">
        No {tab === "medical" ? "clinics" : "shops"} found
      </p>
      <p className="mt-1 text-xs text-[#90A4AE]">
        Try a different area or search term
      </p>
    </div>
  );
}

/* ═══════════════════════ GLASS CARD SHELL ══════════════════════════════ */
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
  const glow = useCardGlow({ accentRgb });
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
      {...glow.handlers}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={glow.spotlightStyle}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <div className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 -translate-x-full transition-all duration-700 ease-out group-hover:translate-x-[360%] group-hover:opacity-100" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
        }}
      />
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

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#00ACC1]/10 border border-[#00ACC1]/15 px-2 py-0.5 text-xs text-[#0097A7]">
            <MapPin className="h-2.5 w-2.5" />
            {clinic.area}, {clinic.city}
          </span>
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
            className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00ACC1]/10 px-4 py-2.5 text-sm font-medium text-[#00ACC1] transition-colors hover:bg-[#00ACC1]/20"
          >
            <Phone className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-y-0.5" />
            Call
          </a>
          <button className="group/btn flex flex-1 items-center justify-center gap-2 rounded-xl border border-[rgba(0,172,193,0.15)] bg-white/60 px-4 py-2.5 text-sm font-medium text-[#546E7A] transition-colors hover:bg-[#E0F7FA] hover:text-[#004D40]">
            <Navigation className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
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

        <div className="mt-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#00ACC1]/10 border border-[#00ACC1]/15 px-2 py-0.5 text-xs text-[#0097A7]">
            <MapPin className="h-2.5 w-2.5" />
            {shop.area}, {shop.city}
          </span>
        </div>

        <div className="mt-3">
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

        <button className="group/btn mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4DD0E1]/10 border border-[#4DD0E1]/15 px-4 py-2.5 text-sm font-medium text-[#0097A7] transition-colors hover:bg-[#4DD0E1]/20">
          <Navigation className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          Get Directions
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </GlassCard>
  );
}