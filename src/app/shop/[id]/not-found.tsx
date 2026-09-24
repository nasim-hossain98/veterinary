import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";
import WorldBackdrop from "@/components/world/WorldBackdrop";
import Footer from "@/components/Footer";

/** 404 for /shop/[id] — unknown or removed product id. */
export default function ProductNotFound() {
  return (
    <>
      <WorldBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col font-sans">
        <main className="flex flex-1 items-center justify-center px-5">
          <div className="w-full max-w-md rounded-[32px] border border-white/70 bg-white/70 px-8 py-14 text-center shadow-[0_40px_90px_-56px_rgba(0,77,64,0.7)] backdrop-blur-md">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-[#00ACC1]/10">
              <PackageSearch className="h-8 w-8 text-[#00ACC1]" />
            </span>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#004D40]">
              Product not found
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#546E7A]">
              This product may have been removed, or the link is incorrect.
            </p>
            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#00ACC1] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_44px_-20px_rgba(0,172,193,0.9)] transition-all hover:-translate-y-0.5 hover:bg-[#0097A7]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
