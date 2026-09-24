import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import WorldBackdrop from "@/components/world/WorldBackdrop";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/shop/ProductDetail";
import { getProduct, products } from "@/lib/products";

/* Pre-render every product page at build time. */
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product Not Found — PawCare" };
  return {
    title: `${product.name} — PawCare Shop`,
    description: product.description,
  };
}

/**
 * /shop/[id] — product detail page.
 *
 * Server component: resolves the product from the shared catalogue
 * (404 for unknown ids) and hands the plain data to the client-side
 * <ProductDetail> for the interactive gallery, quantity stepper and
 * cart actions. WorldBackdrop + Footer keep it in the same aqua world
 * as the rest of the site.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <>
      <WorldBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col font-sans">
        <main className="flex-1">
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-10 sm:px-8">
            <Link
              href="/shop"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-4 py-2 text-sm font-semibold text-[#546E7A] backdrop-blur-sm transition-all hover:-translate-x-0.5 hover:bg-white hover:text-[#004D40]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
            <ProductDetail product={product} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
