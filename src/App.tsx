import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GlobalEditingTimeline } from "@/components/shared/GlobalEditingTimeline";

function App() {
  return (
<main className="dark min-h-screen bg-neutral-950 md:pb-[86px]">     <GlobalEditingTimeline />

      <HeroSection />
      <PortfolioSection />
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}

export default App;