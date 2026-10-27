import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight, Home, Stethoscope } from "lucide-react";
import WorldBackdrop from "@/components/world/WorldBackdrop";
import Footer from "@/components/Footer";
import FindAndLocate from "./FindAndLocate";

export const metadata: Metadata = {
  title: "Find a Doctor — PawCare",
  description:
    "Search for veterinary doctors, clinics, and hospitals across Bangladesh. Filter by city, area, or name to find the right vet care near you.",
};

/**
 * /find-doctor — dedicated page for locating vet doctors and clinics.
 *
 * A server component that sets metadata and renders the FindAndLocate
 * search engine inside the shared aqua world.
 */
export default function FindDoctorPage() {
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
              <span className="font-medium text-[#004D40]">Find a Doctor</span>
            </nav>

            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/65 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00ACC1] shadow-[0_14px_34px_-26px_rgba(0,77,64,0.9)] backdrop-blur-sm">
              <Stethoscope className="h-3.5 w-3.5" />
              Find the Doctor
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#004D40] sm:text-5xl">
              Find vet doctors &amp;{" "}
              <span className="bg-gradient-to-r from-[#00ACC1] via-[#26C6DA] to-[#00BFA5] bg-clip-text text-transparent">
                clinics near you
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#546E7A]">
              Search by city, area, or clinic name to discover veterinary
              doctors, hospitals, and pet care centers across Bangladesh.
            </p>
          </div>

          <Suspense>
            <FindAndLocate />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
