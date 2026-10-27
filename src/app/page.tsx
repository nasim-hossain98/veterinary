import Hero from "@/components/Hero";
import ServiceBento from "@/components/ServiceBento";
import VetPharmacy from "@/components/VetPharmacy";
import ExpertiseCarousel from "@/components/ExpertiseCarousel";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Footer from "@/components/Footer";
import WorldBackdrop from "@/components/world/WorldBackdrop";

/**
 * The landing page content is arranged in the normal document flow, with a
 * shared static background behind each section.
 */
export default function Home() {
  return (
    <>
      <WorldBackdrop />

      <div className="relative z-10 flex flex-col flex-1 items-center font-sans">
        <main className="flex flex-1 w-full flex-col items-center">
          <Hero />

          <ServiceBento />
          <Journey />
          <VetPharmacy />
          <ExpertiseCarousel />
          <About />
        </main>

        <Footer />
      </div>
    </>
  );
}
