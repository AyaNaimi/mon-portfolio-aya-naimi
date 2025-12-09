"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentLayout, setCurrentLayout] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setCurrentLayout((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [isVisible])

  // ⭐️ Compétences / avantages
  const benefits = [
    "Interfaces web modernes et réactives",
    "Expériences utilisateurs fluides et intuitives",
    "Design mobile-first et animations soignées",
    "Full-stack suivant les meilleures pratiques",
    "Code sécurisé, performant et maintenable",
  ]

  // ⭐️ Layouts animés
  const layouts = [
    {
      name: "Dashboard View",
      color: "cyan",
      content: (
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            <div className="h-8 w-32 rounded-md bg-cyan-500/30 animate-pulse" />
            <div className="space-y-2">
              {[100, 83, 66].map((width, index) => (
                <div
                  key={index}
                  className="h-4 rounded bg-muted animate-shimmer"
                  style={{ width: `${width}%`, animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {["cyan", "blue", "purple"].map((color, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg border bg-${color}-500/15 border-${color}-500/30 animate-float`}
                style={{ animationDelay: `${index * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Kanban Board",
      color: "blue",
      content: (
        <div className="grid h-full grid-cols-3 gap-3">
          {[
            { color: "bg-blue-500/10 border-blue-500/20", items: 3 },
            { color: "bg-emerald-500/10 border-emerald-500/20", items: 4 },
            { color: "bg-amber-500/10 border-amber-500/20", items: 2 },
          ].map((col, colIndex) => (
            <div key={colIndex} className="space-y-2">
              <div
                className={`h-6 rounded border ${col.color} animate-pulse`}
                style={{ animationDelay: `${colIndex * 0.2}s` }}
              />
              {Array.from({ length: col.items }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="h-12 rounded-md bg-muted/50 border border-border animate-slide-up"
                  style={{ animationDelay: `${colIndex * 0.2 + itemIndex * 0.15}s` }}
                />
              ))}
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Analytics View",
      color: "purple",
      content: (
        <div className="flex h-full flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            {["purple", "pink", "indigo"].map((color, index) => (
              <div
                key={index}
                className={`rounded-lg border bg-${color}-500/10 border-${color}-500/20 p-3 animate-float`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`h-3 w-12 rounded bg-${color}-500/30 mb-2 animate-pulse`} />
                <div className={`h-6 w-16 rounded bg-${color}-500/20`} />
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex h-full items-end justify-between gap-2">
              {[60, 80, 45, 90, 70, 85, 55].map((height, index) => (
                <div
                  key={index}
                  className="w-full rounded-t bg-gradient-to-t from-purple-500/40 to-purple-500/10 animate-bar-grow"
                  style={{ height: `${height}%`, animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Calendar View",
      color: "emerald",
      content: (
        <div className="flex h-full flex-col gap-3">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-6 rounded bg-muted/50 animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
          <div className="grid flex-1 grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, index) => (
              <div
                key={index}
                className={`rounded border animate-fade-in ${
                  [3, 7, 12, 18, 24].includes(index)
                    ? "bg-emerald-500/10 border-emerald-500/20 animate-pulse-glow"
                    : "bg-muted/30 border-border"
                }`}
                style={{ animationDelay: `${index * 0.03}s` }}
              />
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <header ref={sectionRef} id="hero" className="relative py-24 sm:py-32 overflow-hidden" role="banner">
      {/* Clean Background */}
      <div className="absolute inset-0 clean-background z-0">
        <div className="pattern-overlay"></div>
      </div>
      
      <style jsx>{`
        @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{opacity:.5;transform:translateX(-10px)}50%{opacity:1;transform:translateX(0)}100%{opacity:.5;transform:translateX(-10px)} }
        @keyframes slide-up { 0%{transform:translateY(10px);opacity:0}100%{transform:translateY(0);opacity:1} }
        @keyframes bar-grow { 0%{transform:scaleY(0);transform-origin:bottom}100%{transform:scaleY(1);transform-origin:bottom} }
        @keyframes fade-in { 0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0)}50%{box-shadow:0 0 20px 2px rgba(16,185,129,.3)} }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up .6s ease-out forwards; }
        .animate-bar-grow { animation: bar-grow 1s ease-out forwards,float 3s ease-in-out infinite 1s; }
        .animate-fade-in { animation: fade-in .5s ease-out forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        .clean-background {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(135deg, 
            color-mix(in oklch, var(--background) 97%, var(--accent) 3%) 0%, 
            var(--background) 50%,
            color-mix(in oklch, var(--background) 97%, var(--secondary) 3%) 100%
          );
        }
        
        .pattern-overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: 
            linear-gradient(90deg, transparent 68px, color-mix(in oklch, var(--accent) 40%, transparent) 69px, color-mix(in oklch, var(--accent) 40%, transparent) 70px, transparent 71px),
            linear-gradient(0deg, transparent 68px, color-mix(in oklch, var(--secondary) 30%, transparent) 69px, color-mix(in oklch, var(--secondary) 30%, transparent) 70px, transparent 71px);
          background-size: 70px 70px, 70px 70px;
          opacity: 0.3;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT SIDE — TEXT */}
          <div className="flex flex-col justify-center">
            <Badge variant="outline" className="mb-4 w-fit border-accent/50 text-accent">
              <span className="animate-pulse-glow" aria-label="Profession">Développeuse Full-Stack</span>
            </Badge>

            <h1 className="mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              <span className="block">Naimi Aya</span>
              <span className="block text-accent mt-2">Créatrice d'Expériences Digitales</span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground text-pretty">
              Passionnée par le web moderne, je crée des interfaces réactives et intuitives, transformant les idées en solutions digitales performantes avec React, Next.js et TypeScript.
            </p>

            <section aria-labelledby="benefits-heading" className="mb-8">
              <h2 id="benefits-heading" className="sr-only">Compétences et Services</h2>
              <ul className="space-y-3" role="list">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3" role="listitem">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT SIDE — ANIMATED MOCKUPS */}
          <div className="relative">
            <figure className="relative" role="img" aria-label="Démos d'interfaces utilisateur animées">
              <Card className="overflow-hidden border-border bg-card/98 backdrop-blur-sm shadow-xl rounded-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-accent/30 via-card/90 to-background p-6 relative rounded-xl">
                  {layouts.map((layout, index) => (
                    <div 
                      key={index} 
                      className={`absolute inset-4 transition-all duration-1000 ease-in-out transform ${currentLayout === index ? "opacity-100 scale-100 rotate-0 z-10 shadow-2xl" : "opacity-0 scale-95 -rotate-3 z-0"}`} 
                      style={{ transitionDelay: `${index * 100}ms` }}
                      aria-label={`${layout.name} - Exemple d'interface`}
                    >
                      {layout.content}
                    </div>
                  ))}
                </div>
              </Card>
              <figcaption className="sr-only">
                Collection d'interfaces utilisateur animées montrant différentes vues : tableau de bord, kanban, analytics et calendrier
              </figcaption>
            </figure>

            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl border border-accent/50 bg-accent/15 backdrop-blur-sm transition-all duration-1000 animate-float transform" style={{ animationDelay: "0.5s" }} />
          </div>

        </div>
      </div>
    </header>
  )
}
