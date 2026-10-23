import SpaceBackground from "@/components/effects/SpaceBackgroundWrapper";
import CustomCursor from "@/components/effects/CustomCursor";
import ScrollTelemetryHUD from "@/components/effects/ScrollTelemetryHUD";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollTelemetryHUD />
      <SpaceBackground />
      <Navbar />

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
