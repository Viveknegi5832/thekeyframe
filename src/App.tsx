import { useEffect } from "react";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SiteHeader } from "@/components/shared/SiteHeader";

function App() {
  useEffect(() => {
    if (!window.location.hash) return;

    const target = document.querySelector(window.location.hash);
    target?.scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  return (
    <>
      <a
        href="#content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" className="min-h-screen overflow-hidden bg-black">
        <HeroSection />
        <PortfolioSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;
