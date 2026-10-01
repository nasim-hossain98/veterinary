"use client";

import { motion } from "framer-motion";
import {
  Ambulance,
  ArrowRight,
  Building2,
  Cross,
  HandHeart,
  HeartPulse,
  Home,
  MapPin,
  Monitor,
  PawPrint,
  Phone,
  Pill,
  Ribbon,
  Search,
  ShoppingBag,
  Stethoscope,
  Truck,
  Users,
  Video,
} from "lucide-react";
import SceneShell from "@/components/experience/SceneShell";
import FloatChip from "@/components/world/FloatChip";
import { useCardGlow } from "@/components/ui/useCardGlow";
import Reveal from "@/components/ui/Reveal";

/* ─────────────────────────── shared shells ─────────────────────────── */

/**
 * RevealCard — grid cell that fades up on entry.
 *
 * The wrapper is the grid item, so `col-span` and `row-span` remain intact.
 */
function RevealCard({
  delay = 0,
  className = "",

  children,
}: {
  delay?: number;
  className?: string;

  children: React.ReactNode;
}) {
  const card = (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );

  return <div className={`h-full ${className}`}>{card}</div>;
}

/**
 * GlassCard — the frosted surface every service card is built on.
 *
 * Uses the shared `.glass-surface` primitive (see globals.css) so these cards
 * match every other card in the world, then layers the two interactions that
 * make a bento feel tactile: a cursor-following spotlight. The `--glass-tint`
 * variable carries each card's palette accent into the border, shadow and hover bloom.
 */
function GlassCard({
  children,
  className = "",
  accentRgb = "0,172,193",
}: {
  children: React.ReactNode;
  className?: string;
  accentRgb?: string;
}) {
  const glow = useCardGlow({ accentRgb });

  return (
    <motion.div
      className={`group glass-surface relative h-full cursor-pointer overflow-hidden rounded-3xl p-7 ${className}`}
      style={{ "--glass-tint": accentRgb } as React.CSSProperties}
      whileHover={{ y: -8, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
      {...glow.handlers}
    >
      {/* Cursor-following spotlight */}
      <motion.span className="pointer-events-none absolute inset-0" style={glow.spotlightStyle} />
      {/* Shimmer sweep on hover */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
        <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[360%] group-hover:opacity-100" />
      </span>
      <span className="glass-rim" />
      <span className="glass-bloom" />
      {children}
    </motion.div>
  );
}

/** Icon tile that scales + rotates on hover. */
function AnimatedIcon({
  children,
  bg,
  border,
}: {
  children: React.ReactNode;
  bg: string;
  border: string;
}) {
  return (
    <motion.div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${bg} ${border}`}
      whileHover={{ scale: 1.1, rotate: 3, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ServiceBento — Scene 02.
 *
 * The brief asks for the existing bento to become a *floating* composition:
 * one larger main card with secondary services arranged around it rather than
 * a rigid grid of equal tiles. All five services and their copy are unchanged.
 */
export default function ServiceBento() {

  return (
    <SceneShell
      id="services"
      label="Services"
      eyebrow="Scene 02"
      aliases={["telehealth", "surgery", "dental", "vax"]}
      className="relative w-full px-6 py-28"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Header: asymmetric, title left / intro right ── */}
        <div className="mb-14">
          <Reveal>
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#00ACC1]">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  data-ambient="true"
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ACC1] opacity-60"
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ACC1]" />
              </span>
              Our Services
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#004D40] sm:text-5xl">
              The Services We Provide
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#546E7A]">
              Everything your companion needs, organized in one place.
            </p>
          </Reveal>
        </div>

        {/* ── Floating bento ── */}
        <div className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {/* ══ 1. Main card — Veterinary Medical Services (spans two rows) ══ */}
          <RevealCard delay={0} className="sm:col-span-2 lg:col-span-3 lg:row-span-2">
            <div className="relative h-full">
              <GlassCard>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40"
                  style={{
                    background: "radial-gradient(circle,rgba(0,172,193,0.16),transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />

                {/* Floating UI anchored to the main card */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <FloatChip
                    icon={Video}
                    label="Online Consult"
                    detail="HD video call"
                    tone="teal"
                    delay={0.5}
                    float={5}
                    className="absolute -right-4 top-[32%] hidden xl:block"
                  />
                  <FloatChip
                    icon={Monitor}
                    label="Offline Visit"
                    detail="In-clinic"
                    tone="cyan"
                    delay={0.65}
                    float={6}
                    className="absolute -left-5 bottom-[18%] hidden xl:block"
                  />
                </div>

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,172,193,0.2)] bg-[rgba(0,172,193,0.08)] px-3 py-1 text-xs font-medium text-[#00ACC1]">
                      <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
                      Online & Offline
                    </span>
                    <Stethoscope className="h-7 w-7 text-[#00ACC1]/50" aria-hidden="true" />
                  </div>

                  {/* Illustration */}
                  <div
                    className="mb-6 mt-8 flex items-center justify-center overflow-hidden rounded-2xl p-6"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(0,172,193,0.07),rgba(178,235,242,0.3))",
                      border: "1px solid rgba(0,172,193,0.12)",
                    }}
                  >
                    <div
                      className="relative flex h-44 w-full max-w-[280px] items-center justify-center rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(0,172,193,0.14)",
                        boxShadow: "0 4px 20px rgba(0,172,193,0.08)",
                      }}
                    >
                      <span className="absolute inset-0 rounded-xl opacity-40 [background:radial-gradient(circle_at_50%_30%,rgba(0,172,193,0.12),transparent_70%)]" />
                      <div className="relative flex flex-col items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[rgba(0,172,193,0.2)] bg-[rgba(0,172,193,0.1)] shadow-[0_0_30px_-5px_rgba(0,172,193,0.25)]">
                          <Stethoscope className="h-8 w-8 text-[#00ACC1]" aria-hidden="true" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600">
                          <span className="relative flex h-1.5 w-1.5">
                            <span
                              data-ambient="true"
                              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"
                            />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </span>
                          Available Now
                        </div>
                        <div className="mt-1 flex gap-1.5">
                          {["bg-[#00ACC1]", "bg-emerald-400", "bg-amber-400"].map((c, i) => (
                            <motion.span
                              key={c}
                              className={`h-2 w-2 rounded-full ${c}`}
                              animate={{ scale: [1, 1.25, 1] }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                      Veterinary Medical Services
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[#546E7A]">
                      Full-spectrum veterinary care — online video consultations
                      and in-clinic appointments. Diagnostics, treatment plans,
                      and follow-ups all in one place.
                    </p>
                    <a
                      href="#doctors"
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00ACC1] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,172,193,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(0,172,193,0.45)]"
                    >
                      Book Consultation
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </div>
          </RevealCard>

          {/* ══ 2. Emergency Veterinary Services ══ */}
          <RevealCard delay={0.1} className="lg:col-span-3">
            <GlassCard accentRgb="255,82,82">
              <div className="relative flex h-full flex-col justify-between gap-4">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <AnimatedIcon bg="bg-[#FF5252]/12" border="border-[#FF5252]/20">
                      <Ambulance className="h-6 w-6 text-[#FF5252]" aria-hidden="true" />
                    </AnimatedIcon>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-500">
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          data-ambient="true"
                          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
                        />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                      </span>
                      24/7 Emergency
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Emergency Veterinary Services
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Critical care when every second counts. Trauma teams on
                    standby — no appointment needed.
                  </p>
                </div>
                <a
                  href="tel:911"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#FF5252] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(255,82,82,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(255,82,82,0.45)]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call Emergency
                </a>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ 3. Pet Shop Marketplace ══ */}
          <RevealCard delay={0.15} className="lg:col-span-3">
            <GlassCard accentRgb="255,183,77">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#FFB74D]/15" border="border-[#FFB74D]/25">
                  <ShoppingBag className="h-6 w-6 text-[#FFB74D]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Pet Shop Marketplace
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Food, toys, accessories & more — curated products from
                    trusted sellers delivered to your door.
                  </p>
                  <a
                    href="#shop"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    Browse Shop
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ 4. Pet Medicine & Pharmacy ══ */}
          <RevealCard delay={0.2} className="lg:col-span-2">
            <GlassCard accentRgb="129,199,132">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#81C784]/15" border="border-[#81C784]/25">
                  <Pill className="h-6 w-6 text-[#81C784]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Pet Medicine & Pharmacy
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Prescription refills, OTC medications & supplements
                    delivered fast.
                  </p>
                  <a
                    href="#pharmacy"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    Order Medicine
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ 5. Home Veterinary Visits ══ */}
          <RevealCard delay={0.25} className="lg:col-span-2">
            <GlassCard accentRgb="77,208,225">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#4DD0E1]/15" border="border-[#4DD0E1]/25">
                  <Home className="h-6 w-6 text-[#4DD0E1]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Home Veterinary Visits
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Licensed vets come to your home for checkups, vaccinations
                    & minor treatments.
                  </p>
                  <a
                    href="#home-visit"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    Book Home Visit
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ 6. Mobile Clinic Services ══ */}
          <RevealCard delay={0.3} className="lg:col-span-2">
            <GlassCard accentRgb="149,117,205">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#9575CD]/15" border="border-[#9575CD]/25">
                  <Truck className="h-6 w-6 text-[#9575CD]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Mobile Clinic Services
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Fully equipped mobile units for diagnostics, grooming &
                    on-site procedures.
                  </p>
                  <a
                    href="#mobile-clinic"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    Request Unit
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ 7. Nearby Pet Shelters ══ */}
          <RevealCard delay={0.35} className="lg:col-span-2">
            <GlassCard accentRgb="255,138,128">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#FF8A80]/15" border="border-[#FF8A80]/25">
                  <Building2 className="h-6 w-6 text-[#FF8A80]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Nearby Pet Shelters
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Discover local shelters, meet adoptable pets & find your
                    next best friend.
                  </p>
                  <a
                    href="#shelters"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    Find Shelters
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ 8. Pet Rescue Services ══ */}
          <RevealCard delay={0.4} className="lg:col-span-2">
            <GlassCard accentRgb="240,98,146">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#F06292]/15" border="border-[#F06292]/25">
                  <Search className="h-6 w-6 text-[#F06292]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Pet Rescue Services
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Report lost or found animals. Coordinate with rescue teams
                    & volunteers nearby.
                  </p>
                  <a
                    href="#rescue"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    Report a Pet
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ 9. Pet Burial Services ══ */}
          <RevealCard delay={0.45} className="lg:col-span-2">
            <GlassCard accentRgb="144,164,174">
              <div className="relative flex h-full flex-col justify-between">
                <AnimatedIcon bg="bg-[#90A4AE]/15" border="border-[#90A4AE]/25">
                  <Cross className="h-6 w-6 text-[#90A4AE]" aria-hidden="true" />
                </AnimatedIcon>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Pet Burial Services
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#546E7A]">
                    Compassionate cremation, memorial & burial arrangements
                    to honor your companion.
                  </p>
                  <a
                    href="#burial"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00ACC1] transition-colors hover:text-[#0097A7]"
                  >
                    Arrange Service
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>

          {/* ══ 10. Fundraising & Donations ══ */}
          <RevealCard delay={0.5} className="sm:col-span-2 lg:col-span-6">
            <GlassCard accentRgb="255,213,79">
              <div className="relative flex h-full flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <AnimatedIcon bg="bg-[#FFD54F]/15" border="border-[#FFD54F]/25">
                      <HandHeart className="h-6 w-6 text-[#FFD54F]" aria-hidden="true" />
                    </AnimatedIcon>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                      <Ribbon className="h-3 w-3" aria-hidden="true" />
                      Make a Difference
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#004D40] transition-colors duration-300 group-hover:text-[#00ACC1]">
                    Fundraising & Donations
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#546E7A]">
                    Support pets and street animals in need. Start or contribute
                    to fundraisers for medical bills, rescue operations, shelter
                    supplies & community welfare programs.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 sm:w-56">
                  {[
                    { icon: HeartPulse, text: "Medical fund drives" },
                    { icon: Users, text: "Community campaigns" },
                    { icon: PawPrint, text: "Street animal welfare" },
                  ].map((item) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5"
                      style={{
                        background: "rgba(255,213,79,0.08)",
                        border: "1px solid rgba(255,213,79,0.2)",
                      }}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.18 },
                      }}
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-[#FFD54F]" aria-hidden="true" />
                      <span className="text-sm text-[#546E7A]">{item.text}</span>
                    </motion.div>
                  ))}
                  <a
                    href="#donate"
                    className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-[#FFD54F] px-5 py-2.5 text-sm font-semibold text-[#004D40] shadow-[0_4px_20px_rgba(255,213,79,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(255,213,79,0.45)]"
                  >
                    Donate Now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </RevealCard>
        </div>
      </div>
    </SceneShell>
  );
}
