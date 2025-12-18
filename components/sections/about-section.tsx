"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Code, Coffee } from "lucide-react"

const timeline = [
  // {
  //   year: "2024",
  //   title: "Lead Developer",
  //   company: "TechCorp Solutions",
  //   description: "Direction technique d'une équipe de 5 développeurs, architecture de solutions cloud-native.",
  // },
  {
    year: "2026",
    title: "Full-Stack Developer",
    company: "ISGI",
    description: "Développement d'applications React/Node.js .",
  },
  {
    year: "2025",
    title: "1 ére année en developpement digital",
    company: "ISGI",
    description: "Savoir les base de programmation.",},
  {
    year: "2024",
    title: "baccalauréat",
    company: "École Alwiaame",
    description: "baccalauréat en sciences physiques",
  },
]

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
       
       
       
       {/* ================= TITRE ULTRA PREMIUM ================= */}
<div className="relative text-center mb-24">
  {/* AURA SOFT */}
  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    <div
      className="
        w-[480px] h-[160px]
        rounded-full
        bg-gradient-to-r
        from-indigo-500/20
        via-sky-400/25
        to-indigo-500/20
        blur-[110px]
        animate-aura-slow
      "
    />
  </div>

  {/* TITRE */}
  <h2
    className="
      relative
      inline-block
      font-orbitron
      text-4xl
      md:text-5xl
      lg:text-6xl
      tracking-[0.28em]
      uppercase
      text-transparent
      bg-clip-text
      bg-gradient-to-r
      from-slate-900
      via-indigo-500
      to-slate-900
      dark:from-slate-100
      dark:via-indigo-400
      dark:to-slate-100
      animate-title-float
    "
  >
            À Propos De Moi

    {/* SCRIBBLE DESSINÉ */}
    <svg
      className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-[115%] h-6"
      viewBox="0 0 320 40"
      fill="none"
    >
      <path
        d="M10 28 C45 20, 90 34, 135 26 C180 18, 230 32, 270 25 C290 22, 305 30, 315 27"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scribble-draw"
      />
    </svg>
  </h2>

  {/* LIGNE TECH FINE */}
  <div className="mt-10 flex justify-center">
    <div className="relative h-px w-52 bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-scan-ultra" />
    </div>
  </div>

  {/* SOUS-TITRE */}
  <p className="mt-8 text-[11px] md:text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
  Développeur passionné avec la création d'applications web modernes et performantes.
  </p>
</div>


        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Personal Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="p-6 sm:p-8 bg-card/50 border border-purple-500/20 rounded-2xl backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="text-center sm:text-left mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">Qui suis-je ?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Passionné par les technologies web depuis mes études, j'ai développé une expertise complète en
                  développement full-stack. J'aime créer des solutions élégantes qui allient performance technique et
                  expérience utilisateur exceptionnelle.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  <span className="text-foreground">Casablanca, Morocco</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  <span className="text-foreground">1+ années d'expérience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  <span className="text-foreground">3+ projets réalisés</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  <span className="text-foreground">∞ cafés consommés</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                  React Expert
                </Badge>
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                  Node.js
                </Badge>
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                  TypeScript
                </Badge>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-foreground text-center lg:text-left">Mon parcours</h3>
            <div className="space-y-4 sm:space-y-6">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative pl-6 sm:pl-8 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-purple-600 to-violet-500" />
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-purple-600 transform -translate-x-1/2" />

                  <div className="p-4 sm:p-6 bg-card/50 border border-purple-500/20 rounded-xl backdrop-blur-sm hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <Badge variant="outline" className="text-violet-400 border-violet-500/50 w-fit">
                        {item.year}
                      </Badge>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">{item.title}</h4>
                    </div>
                    <p className="text-purple-300 font-medium mb-2 text-sm sm:text-base">{item.company}</p>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
