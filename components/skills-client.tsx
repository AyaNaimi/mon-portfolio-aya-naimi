"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, Server, Cloud } from "lucide-react"
import LogoLoop from "@/components/LogoLoop"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiPython,
  SiJavascript,
  SiVercel,
  SiFigma,
  SiPostman,
  SiGit,
  SiSupabase,
  SiGithub,
  SiGitlab,
} from "react-icons/si"

interface Skill {
  id: string
  category: string
  name: string
  level: number
  order: number
}

interface SkillsClientProps {
  skillsData: Record<string, Skill[]>
}

// ============================
// ⭐ CUSTOM PROGRESS BAR AVEC PATTERN
// ============================
function CustomProgress({ value, color, category }: { value: number; color?: string; category?: string }) {
  // Mapping des catégories vers leurs patterns CSS
  const getPatternClass = (category: string) => {
    switch (category) {
      case 'Frontend': return 'progress-pattern-1'
      case 'Backend': return 'progress-pattern-2'
      case 'Base de données': return 'progress-pattern-3'
      case 'DevOps & Cloud': return 'progress-pattern-4'
      default: return 'progress-pattern-1'
    }
  }

  // Mapping des catégories vers leurs classes de gradient
  const getProgressClass = (category: string) => {
    switch (category) {
      case 'Frontend': return 'progress-frontend'
      case 'Backend': return 'progress-backend'
      case 'Base de données': return 'progress-database'
      case 'DevOps & Cloud': return 'progress-devops'
      default: return ''
    }
  }

  const patternClass = category ? getPatternClass(category) : ''
  const progressClass = category ? getProgressClass(category) : ''

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full relative overflow-hidden progress-bar-patterned">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${progressClass} ${patternClass}`}
        style={{
          width: `${value}%`,
          backgroundColor: color || "#2563EB",
        }}
      ></div>
    </div>
  )
}

// ===============================
// ICONES DES CATÉGORIES
// ===============================
const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="h-6 w-6" />,
  Backend: <Server className="h-6 w-6" />,
  "Base de données": <Database className="h-6 w-6" />,
  "DevOps & Cloud": <Cloud className="h-6 w-6" />,
}

// Couleurs par catégorie
const categoryColors: Record<string, string> = {
  Frontend: "#2563EB",       // bleu vif
  Backend: "#10B981",        // vert lumineux
  "Base de données": "#F59E0B", // orange chaud
  "DevOps & Cloud": "#8B5CF6",  // violet vibrant
}

// ===============================
// TECH LOGOS POUR LogoLoop
// ===============================
const techLogos = [
  { node: <SiReact className="h-10 w-10 text-[#61DAFB]" />, title: "React" },
  { node: <SiNextdotjs className="h-10 w-10" />, title: "Next.js" },
  { node: <SiTypescript className="h-10 w-10 text-[#3178C6]" />, title: "TypeScript" },
  { node: <SiTailwindcss className="h-10 w-10 text-[#38BDF8]" />, title: "Tailwind CSS" },
  { node: <SiPython className="h-10 w-10 text-[#3776AB]" />, title: "Python" },
  { node: <SiDocker className="h-10 w-10 text-[#2496ED]" />, title: "Docker" },
  { node: <SiJavascript className="h-10 w-10 text-[#F7DF1E]" />, title: "JavaScript" },
  { node: <SiVercel className="h-10 w-10" />, title: "Vercel" },
  { node: <SiFigma className="h-10 w-10 text-[#F24E1E]" />, title: "Figma" },
  { node: <SiPostman className="h-10 w-10 text-[#FF6C37]" />, title: "Postman" },
  { node: <SiGit className="h-10 w-10 text-[#F05033]" />, title: "Git" },
  { node: <SiSupabase className="h-10 w-10 text-[#3ECF8E]" />, title: "Supabase" },
  { node: <SiGithub className="h-10 w-10 text-gray-500" />, title: "GitHub" },
  { node: <SiGitlab className="h-10 w-10 text-[#FC6D26]" />, title: "GitLab" },
]

// ===============================
// ⭐ MAIN COMPONENT
// ===============================
export function SkillsClient({ skillsData }: SkillsClientProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: number }>({})
  const sectionRef = useRef<HTMLElement>(null)

  // Show default skills if none from database
  const defaultSkillsData: Record<string, Skill[]> = {
    Frontend: [
      { id: "1", category: "Frontend", name: "React", level: 90, order: 1 },
      { id: "2", category: "Frontend", name: "Next.js", level: 85, order: 2 },
      { id: "3", category: "Frontend", name: "TypeScript", level: 80, order: 3 },
      { id: "4", category: "Frontend", name: "Tailwind CSS", level: 85, order: 4 },
    ],
    Backend: [
      { id: "5", category: "Backend", name: "Node.js", level: 75, order: 1 },
      { id: "6", category: "Backend", name: "Python", level: 70, order: 2 },
      { id: "7", category: "Backend", name: "Express.js", level: 75, order: 3 },
    ],
    "Base de données": [
      { id: "8", category: "Base de données", name: "PostgreSQL", level: 70, order: 1 },
      { id: "9", category: "Base de données", name: "Supabase", level: 80, order: 2 },
    ],
    "DevOps & Cloud": [
      { id: "10", category: "DevOps & Cloud", name: "Docker", level: 65, order: 1 },
      { id: "11", category: "DevOps & Cloud", name: "Vercel", level: 80, order: 2 },
    ],
  }

  const displaySkillsData = Object.keys(skillsData).length > 0 ? skillsData : defaultSkillsData
  const displayCategories = Object.keys(displaySkillsData)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => {
            const updated: { [key: string]: number } = {}
            Object.values(displaySkillsData).forEach((cat) => {
              cat.forEach((s) => (updated[s.name] = s.level))
            })
            setAnimatedSkills(updated)
          }, 500)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [displaySkillsData])

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TITRE */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 font-playfair ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Mes compétences
          </h2>
        </div>

        {/* LOGO LOOP */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          

          <div className="relative h-32 max-w-5xl mx-auto">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              hoverSpeed={10}
              fadeOut
              scaleOnHover
            />
          </div>
        </div>

        {/* GRILLE DES COMPÉTENCES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {displayCategories.map((category, catIndex) => (
            <Card
              key={category}
              className={`glass p-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + catIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  {categoryIcons[category]}
                </div>
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>

              <div className="space-y-5">
                {displaySkillsData[category].map((skill, idx) => (
                  <div
                    key={skill.id}
                    className={`transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
                    }`}
                    style={{ transitionDelay: `${500 + idx * 80}ms` }}
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span>{skill.name}</span>
                      <Badge variant="outline">{skill.level}%</Badge>
                    </div>

                    {/* Barre de progression avec pattern */}
                    <CustomProgress value={animatedSkills[skill.name] || 0} color={categoryColors[category]} category={category} />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
