import type { Metadata } from "next";
import WorldBackdrop from "@/components/world/WorldBackdrop";
import Footer from "@/components/Footer";
import ShopCatalog from "@/components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop — PawCare",
  description:
    "Vet-grade medications, premium pet food, supplements, grooming and wellness products — all in one PawCare store.",
};

/**
 * /shop — the full PawCare product catalogue.
 *
 * The interactive catalogue (category tabs, search, cart) lives in the
 * client component <ShopCatalog>. A single fixed <WorldBackdrop> keeps the
 * page inside the same aqua environment as the landing experience, and the
 * shared <GlassHeader>/<Footer> come from the root layout / component set.
 */
export default function ShopPage() {
  return (
    <>
      <WorldBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col font-sans">
        <main className="flex-1">
          <ShopCatalog />
        </main>
        <Footer />
      </div>
    </>
  );
}
