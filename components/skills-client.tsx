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

/* ================= TYPES ================= */
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

/* ================= CUSTOM PROGRESS ================= */
function CustomProgress({
  value,
  color,
  category,
}: {
  value: number
  color?: string
  category?: string
}) {
  const getProgressClass = (category: string) => {
    switch (category) {
      case "Frontend":
        return "progress-frontend"
      case "Backend":
        return "progress-backend"
      case "Base de données":
        return "progress-database"
      case "DevOps & Cloud":
        return "progress-devops"
      default:
        return ""
    }
  }

  return (
    <div className="relative w-full h-4 rounded-full overflow-hidden bg-black/10 backdrop-blur-md">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${getProgressClass(
          category || ""
        )} progress-bar-patterned`}
        style={{
          width: `${value}%`,
          backgroundColor: color,
        }}
      />
    </div>
  )
}

/* ================= CATEGORY CONFIG ================= */
const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="h-6 w-6" />,
  Backend: <Server className="h-6 w-6" />,
  "Base de données": <Database className="h-6 w-6" />,
  "DevOps & Cloud": <Cloud className="h-6 w-6" />,
}

const categoryColors: Record<string, string> = {
  Frontend: "#2563EB",
  Backend: "#10B981",
  "Base de données": "#F59E0B",
  "DevOps & Cloud": "#EF4444",
}

/* ================= COLOR HELPERS ================= */
const getCardBackgroundColor = (category: string, index: number) => {
  const base = categoryColors[category] || "#2563EB"
  const opacity = 0.08 + (index % 4) * 0.04
  return `${base}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}`
}

const getCardBorderColor = (category: string) => {
  const base = categoryColors[category] || "#2563EB"
  return `${base}55`
}

/* ================= LOGOS ================= */
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

/* ================= MAIN COMPONENT ================= */
export function SkillsClient({ skillsData }: SkillsClientProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({})
  const sectionRef = useRef<HTMLElement>(null)

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

  const data = Object.keys(skillsData).length ? skillsData : defaultSkillsData

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const values: Record<string, number> = {}
          Object.values(data).flat().forEach((s) => (values[s.name] = s.level))
          setTimeout(() => setAnimatedSkills(values), 400)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [data])

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TITRE OUTLINE ================= */}
        <div className="relative text-center mb-24">
        <h2
  data-text="MES COMPETENCES"
  className="
    outline-animated
    font-orbitron
    text-5xl md:text-6xl lg:text-7xl
    uppercase
    tracking-widest
    text-center
  "
>
  Mes Compétences
</h2>



          {/* SOUS-TITRE */}
          <p className="mt-8 text-[11px] md:text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
            Technologies & Expertise
          </p>
        </div>

        <div className="h-32 mb-20">
          <LogoLoop logos={techLogos} speed={120} fadeOut scaleOnHover />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.keys(data).map((category, index) => (
            <Card
              key={category}
              className="relative p-6 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              style={{
                backgroundColor: getCardBackgroundColor(category, index),
                border: `1px solid ${getCardBorderColor(category)}`,
                boxShadow: `0 0 40px ${categoryColors[category]}30`,
              }}
            >
              {/* GRID TECH */}
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div
                  className="p-3 rounded-xl relative"
                  style={{ backgroundColor: `${categoryColors[category]}33` }}
                >
                  {categoryIcons[category]}
                </div>
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>

              {/* SKILLS */}
              <div className="space-y-5 relative z-10">
                {data[category].map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span>{skill.name}</span>
                      <Badge className="bg-white/70">{skill.level}%</Badge>
                    </div>
                    <CustomProgress
                      value={animatedSkills[skill.name] || 0}
                      color={categoryColors[category]}
                      category={category}
                    />
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
