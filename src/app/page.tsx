import Hero from "@/components/Hero";
import ServiceBento from "@/components/ServiceBento";
import FindAndLocate from "@/components/FindAndLocate";
import VetPharmacy from "@/components/VetPharmacy";
import ExpertiseCarousel from "@/components/ExpertiseCarousel";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Footer from "@/components/Footer";
import SceneTransition from "@/components/world/SceneTransition";
import ScrollExperience from "@/components/experience/ScrollExperience";
import { sceneById } from "@/lib/scenes";

/**
 * The landing page as one continuous 3D world.
 *
 *   Scene 01 — Intro (Hero)          → camera dive into the brand
 *   Scene 02 — Services (bento)      → what we offer
 *   Scene 03 — Journey               → how it works, along a paw trail
 *   Scene 04 — Care Network (map)    → clinics & shops around you
 *   Scene 05 — Pharmacy              → vet-grade products
 *   Scene 06 — Experts               → the doctors
 *   Scene 07 — About                 → who we are
 *   Scene 08 — Start Care + Footer   → CTA and closing chapter
 *
 * The background never swaps between sections — a single WorldBackdrop is
 * painted once behind everything and each scene parallaxes through it. Each
 * hand-off is a SceneTransition: a liquid curtain, expanding depth rings and
 * a chapter label that resolves out of blur, so scenes flow into each other
 * instead of stacking like slides.
 */
export default function Home() {
  return (
    <>
      {/* Persistent scroll chrome: world backdrop, particles, progress, rail */}
      <ScrollExperience />

      <div className="relative z-10 flex flex-col flex-1 items-center font-sans">
        <main className="flex flex-1 w-full flex-col items-center">
          <Hero />

          <SceneTransition scene={sceneById("services")!} />
          <ServiceBento />

          <SceneTransition scene={sceneById("journey")!} />
          <Journey />

          <SceneTransition scene={sceneById("doctors")!} />
          <FindAndLocate />

          <SceneTransition scene={sceneById("pharmacy")!} />
          <VetPharmacy />

          <SceneTransition scene={sceneById("experts")!} />
          <ExpertiseCarousel />

          <SceneTransition scene={sceneById("about")!} />
          <About />
        </main>

        <Footer />
      </div>
    </>
  );
}
