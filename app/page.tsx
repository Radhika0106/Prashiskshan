import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemStrip } from "@/components/ProblemStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { PeerExchange } from "@/components/PeerExchange";
import { StatsBar } from "@/components/StatsBar";
import { RuralIndia } from "@/components/RuralIndia";
import { CTAFooterStrip } from "@/components/CTAFooterStrip";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemStrip />
        <HowItWorks />
        <Features />
        <PeerExchange />
        <StatsBar />
        <RuralIndia />
        <CTAFooterStrip />
      </main>
      <Footer />
    </>
  );
}
