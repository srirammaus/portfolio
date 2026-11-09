import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import TransitionBand from "@/components/site/TransitionBand";
import AboutSection from "@/components/site/AboutSection";
import ServicesSection from "@/components/site/ServicesSection";
import SkillsSection from "@/components/site/SkillsSection";
import ProjectsSection from "@/components/site/ProjectsSection";
import IntegrationsSection from "@/components/site/IntegrationsSection";
import SecuritySection from "@/components/site/SecuritySection";
import JournalTeaser from "@/components/site/JournalTeaser";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";
export default function Home({ reduced, setReduced, sceneOn, setSceneOn }) {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return undefined;
    const id = location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }, 90);
    return () => window.clearTimeout(timer);
  }, [location.hash, reduced]);

  return (
    <div className="relative min-h-screen">
      <Nav
        reduced={reduced}
        onToggleReduced={() => setReduced((v) => !v)}
        sceneOn={sceneOn}
        onToggleScene={() => setSceneOn((v) => !v)}
      />

      <main className="relative z-10">
        <Hero />
        <TransitionBand />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <IntegrationsSection />
        <SecuritySection />
        <JournalTeaser />
        <ContactSection />
        <Footer reduced={reduced} />
      </main>
    </div>
  );
}
