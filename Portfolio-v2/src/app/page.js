import FloatingSidebar from "@/components/FloatingSidebar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import EducationSection from "@/components/EducationSection";
import AchievementsSection from "@/components/AchievementsSection";
import SocialsSection from "@/components/SocialsSection";
import FinalMessageSection from "@/components/FinalMessageSection";

export default function Home() {
  return (
    <>
      <FloatingSidebar />
      <main className="main-content">
        <div className="container">
          <HeroSection />
          <ExperienceSection />
          <AboutSection />
          <ProjectsSection />
          <TechStackSection />
          <EducationSection />
          <AchievementsSection />
          <SocialsSection />
          <FinalMessageSection />
        </div>
      </main>
    </>
  );
}
