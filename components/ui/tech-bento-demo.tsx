"use client"

import { BellIcon, Share2Icon, Code2, Database, Smartphone, Globe, CalendarIcon, FileTextIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { BentoCard } from "@/components/ui/bento-card"
import { BentoGrid } from "@/components/ui/bento-grid"
import { Marquee } from "@/components/ui/marquee"
import "./cloud-animations.css"

const technologies = [
  {
    name: "React.js",
    description: "Bibliothèque JavaScript pour les interfaces utilisateur.",
  },
  {
    name: "Next.js",
    description: "Framework React pour la production avec SSR et SSG.",
  },
  {
    name: "TypeScript",
    description: "Superset de JavaScript avec typage statique.",
  },
  {
    name: "Node.js",
    description: "Runtime JavaScript côté serveur basé sur V8.",
  },
  {
    name: "Flutter",
    description: "Framework UI multiplateforme de Google.",
  },
  {
    name: "Docker",
    description: "Plateforme de conteneurisation pour les applications.",
  },
]

const features = [
  {
    Icon: Code2,
    name: "Frontend Development",
    description: "Interfaces modernes et performantes.",
    href: "#",
    cta: "Voir plus",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {technologies.map((tech, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {tech.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{tech.description}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Backend Development",
    description: "APIs robustes et scalables.",
    href: "#",
    cta: "Explorer",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90">
        <div className="space-y-3 p-4">
          {[
            "Node.js + Express",
            "RESTful APIs",
            "GraphQL",
            "Database Design",
            "Authentication",
            "Real-time Updates"
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/80">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Mobile Development",
    description: "Applications mobiles cross-platform.",
    href: "#",
    cta: "Découvrir",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105">
        <div className="flex items-center justify-center h-full">
          <div className="grid grid-cols-2 gap-4">
            <Smartphone className="w-16 h-16 text-purple-400/50" />
            <Globe className="w-16 h-16 text-blue-400/50" />
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "DevOps & Tools",
    description: "CI/CD et infrastructure moderne.",
    className: "col-span-3 lg:col-span-3",
    href: "#",
    cta: "En savoir plus",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2025, 10, 29, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top scale-75 rounded-md border [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
      />
    ),
  },
]

import { motion } from "framer-motion"

export function TechBentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}