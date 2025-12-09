import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSectionServer } from "@/components/sections/about-section-server"
import { SkillsSectionServer } from "@/components/sections/skills-section-server"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import { CertificatesSection } from "@/components/sections/CertificatesSection"

export default async function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen" role="main">
        <HeroSection />
        <AboutSectionServer />
        <SkillsSectionServer />
        <CertificatesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer role="contentinfo">
        {/* Footer content if needed */}
      </footer>
    </>
  )
}
