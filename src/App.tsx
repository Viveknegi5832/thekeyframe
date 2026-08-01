import { useEffect } from "react";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

function App() {
  useEffect(() => {
    if (!window.location.hash) return;

    const target = document.querySelector(window.location.hash);
    target?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#0b0c0c]">
        <HeroSection />
        <PortfolioSection />
        <ServicesSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;
