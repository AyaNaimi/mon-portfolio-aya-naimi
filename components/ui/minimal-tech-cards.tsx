"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Code2, Database, Smartphone, Globe, Layers } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function MinimalTechCards() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 4)
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible])

  const technologies = [
    {
      name: "Frontend Development",
      icon: Code2,
      description: "Interfaces utilisateur modernes et réactives",
      color: "cyan",
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
      details: "Création d'expériences web exceptionnelles avec les dernières technologies frontend."
    },
    {
      name: "Backend Solutions", 
      icon: Database,
      description: "APIs robustes et bases de données optimisées",
      color: "blue",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
      details: "Développement d'architectures serveur performantes et évolutives."
    },
    {
      name: "Mobile Development",
      icon: Smartphone,
      description: "Applications mobiles cross-platform",
      color: "purple", 
      skills: ["Flutter", "React Native", "iOS", "Android"],
      details: "Création d'applications mobiles natives et performantes."
    },
    {
      name: "Cloud & DevOps",
      icon: Globe,
      description: "Infrastructure moderne et déploiement automatique",
      color: "emerald",
      skills: ["Docker", "AWS", "CI/CD", "Kubernetes"],
      details: "Automatisation et optimisation des workflows de développement."
    }
  ]

  return (
    <div ref={sectionRef} className="relative w-full max-w-4xl mx-auto">
      <style jsx>{`
        @keyframes slide-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; transform: translateX(-5px); }
          50% { opacity: 1; transform: translateX(0px); }
          100% { opacity: 0.5; transform: translateX(-5px); }
        }
        @keyframes pulse-soft {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
          50% { box-shadow: 0 0 20px 2px rgba(59, 130, 246, 0.1); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div
        className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
          Technologies & Expertise
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
          Solutions technologiques modernes
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Un écosystème complet de compétences pour créer des applications performantes et élégantes
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technologies.map((tech, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden border-border bg-card transition-all duration-700 hover:shadow-lg cursor-pointer group ${
              currentCard === index ? 'ring-2 ring-accent/20' : ''
            } ${
              isVisible 
                ? "translate-y-0 opacity-100" 
                : "translate-y-12 opacity-0"
            }`}
            style={{ 
              transitionDelay: `${index * 150 + 200}ms`,
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-${tech.color}-500/10 border border-${tech.color}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                  <tech.icon className={`w-5 h-5 text-${tech.color}-500`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {tech.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground border border-border/50 animate-shimmer"
                      style={{ 
                        animationDelay: `${skillIndex * 0.1}s` 
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tech.details}
              </p>
            </div>

            {/* Accent border */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${tech.color}-500/50 to-${tech.color}-500/0 transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-0`} />

            {/* Hover effect */}
            <div className={`absolute inset-0 bg-${tech.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </Card>
        ))}
      </div>

      {/* Bottom description */}
      <div
        className={`text-center mt-12 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <p className="text-muted-foreground">
          Chaque technologie est choisie avec soin pour offrir les meilleures performances et une expérience utilisateur optimale
        </p>
      </div>
    </div>
  )
}