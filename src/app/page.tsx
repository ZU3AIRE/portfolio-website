import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import LinkedinRecommendationsSection from "@/components/sections/LinkedinRecommendationsSection";
import ContactSection from "@/components/sections/ContactSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import VolunteeringSection from "@/components/sections/VolunteeringSection";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <VolunteeringSection />
      <LinkedinRecommendationsSection />
      <ContactSection />
    </MainLayout>
  );
}
