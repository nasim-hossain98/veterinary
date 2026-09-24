import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Pill } from "lucide-react";
import WorldBackdrop from "@/components/world/WorldBackdrop";
import Footer from "@/components/Footer";
import PharmacyCatalog from "@/components/pharmacy/PharmacyCatalog";
import PetHealthGuide from "@/components/pharmacy/PetHealthGuide";

export const metadata: Metadata = {
  title: "Pharmacy — PawCare",
  description:
    "The PawCare pharmacy: vet-grade medicines, vaccines, parasite control, first-aid supplies and diagnostics — plus health and nutrition guidance for cats, dogs and birds.",
};

/**
 * /pharmacy — the full PawCare pharmacy.
 *
 * A server component that sets metadata and composes two client
 * sections inside the shared aqua world:
 *   • <PharmacyCatalog> — every medical product with category and
 *     species filters, search and add-to-cart.
 *   • <PetHealthGuide>  — health, nutrition and wellbeing tips for
 *     cats, dogs and birds.
 * WorldBackdrop + Footer keep it consistent with the landing page.
 */
export default function PharmacyPage() {
  return (
    <>
      <WorldBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col font-sans">
        <main className="flex-1">
          {/* ── Page header ── */}
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-10 sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-[#546E7A]">
              <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#00ACC1]">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#90A4AE]" />
              <span className="font-medium text-[#004D40]">Pharmacy</span>
            </nav>

            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/65 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00ACC1] shadow-[0_14px_34px_-26px_rgba(0,77,64,0.9)] backdrop-blur-sm">
              <Pill className="h-3.5 w-3.5" />
              The PawCare Pharmacy
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#004D40] sm:text-5xl">
              Medicines, vaccines &amp;{" "}
              <span className="bg-gradient-to-r from-[#00ACC1] via-[#26C6DA] to-[#00BFA5] bg-clip-text text-transparent">
                medical care
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">
              Vet-grade medications, immunisations, parasite control, first-aid
              supplies and at-home diagnostics — delivered to your door.
            </p>
          </div>

          <div className="mt-8">
            <PharmacyCatalog />
          </div>

          <PetHealthGuide />
        </main>
        <Footer />
      </div>
    </>
  );
}
