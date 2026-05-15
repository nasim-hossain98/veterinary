import Hero from "@/components/Hero";
import ServiceBento from "@/components/ServiceBento";
import FindAndLocate from "@/components/FindAndLocate";
import VetPharmacy from "@/components/VetPharmacy";
import ExpertiseCarousel from "@/components/ExpertiseCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center font-sans">
      <main className="flex flex-1 w-full flex-col items-center">
        <Hero />

        <ServiceBento />

        <FindAndLocate />

        <VetPharmacy />

        <ExpertiseCarousel />
      </main>

      <Footer />
    </div>
  );
}
