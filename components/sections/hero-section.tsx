"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentLayout, setCurrentLayout] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Palette harmonisée basée sur vos couleurs
  const colorPalette = {
    darkTeal: "#001617",
    deepCharcoal: "#010A0A",
    copper: "#CC561E",
    crimson: "#BF1A1A",
    amber: "#D97C1A",
    terracotta: "#B85C38",
    slate: "#2D3748",
    navy: "#1A365D",
    mauve: "#553C9A",
    emerald: "#047857",
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setCurrentLayout((prev) => (prev + 1) % 4)
    }, 4500)
    return () => clearInterval(interval)
  }, [isVisible])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  // ⭐️ Compétences / avantages
  const benefits = [
    "Interfaces web modernes et réactives",
    "Expériences utilisateurs fluides et intuitives",
    "Design mobile-first et animations soignées",
    "Full-stack suivant les meilleures pratiques",
    "Code sécurisé, performant et maintenable",
  ]

  // ⭐️ Layouts animés avec palette harmonisée
  const layouts = [
    {
      name: "Dashboard",
      color: colorPalette.darkTeal,
      accentColor: colorPalette.copper,
      icon: "📊",
      content: (
        <div className="flex h-full flex-col justify-between p-3 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg" style={{ backgroundColor: `${colorPalette.darkTeal}40` }} />
              <div className="h-3 w-16 sm:h-4 sm:w-24 rounded-full" style={{ backgroundColor: `${colorPalette.slate}30` }} />
            </div>
            <div className="space-y-2 sm:space-y-3">
              {[90, 75, 60].map((width, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-2 w-14 sm:h-3 sm:w-20 rounded-full bg-muted/50" />
                    <div className="h-2 w-8 sm:h-3 sm:w-10 rounded-full bg-muted/30" />
                  </div>
                  <div className="h-1.5 sm:h-2 rounded-full bg-muted/30 overflow-hidden">
                    <div 
                      className="h-full rounded-full animate-progress"
                      style={{ 
                        width: `${width}%`,
                        backgroundColor: index === 0 ? colorPalette.copper : 
                                      index === 1 ? colorPalette.terracotta : 
                                      colorPalette.darkTeal,
                        animationDelay: `${index * 0.3}s`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
            {[colorPalette.copper, colorPalette.crimson, colorPalette.darkTeal].map((color, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg sm:rounded-xl border animate-float flex flex-col items-center justify-center"
                style={{ 
                  animationDelay: `${index * 0.3}s`,
                  backgroundColor: `${color}15`,
                  borderColor: `${color}40`
                }}
              >
                <div className="text-sm sm:text-lg mb-1">{["🔥", "🚀", "⭐"][index]}</div>
                <div className="text-xs font-medium" style={{ color }}>+{42 - index * 10}%</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Kanban",
      color: colorPalette.deepCharcoal,
      accentColor: colorPalette.amber,
      icon: "📋",
      content: (
        <div className="grid h-full grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4">
          {[
            { title: "À faire", color: colorPalette.navy, items: ["Design UI", "Tests unitaires"] },
            { title: "En cours", color: colorPalette.copper, items: ["Développement", "API Rest"] },
            { title: "Terminé", color: colorPalette.emerald, items: ["Planification", "Maquettes"] },
          ].map((col, colIndex) => (
            <div key={colIndex} className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <div 
                  className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full"
                  style={{ backgroundColor: col.color }}
                />
                <div 
                  className="h-4 w-full rounded text-xs sm:text-sm font-medium flex items-center justify-between px-1 sm:px-2"
                  style={{ 
                    backgroundColor: `${col.color}15`,
                    color: col.color
                  }}
                >
                  <span className="truncate">{col.title}</span>
                  <span className="text-xs opacity-70">{col.items.length}</span>
                </div>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {col.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="h-12 sm:h-16 rounded-lg border animate-slide-up p-2 sm:p-3 flex flex-col justify-between"
                    style={{ 
                      animationDelay: `${colIndex * 0.2 + itemIndex * 0.15}s`,
                      backgroundColor: `${col.color}08`,
                      borderColor: `${col.color}25`
                    }}
                  >
                    <div className="text-xs font-medium truncate">{item}</div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i} 
                            className="h-0.5 w-0.5 sm:h-1 sm:w-1 rounded-full" 
                            style={{ backgroundColor: col.color }}
                          />
                        ))}
                      </div>
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full" style={{ backgroundColor: col.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Analytics",
      color: colorPalette.copper,
      accentColor: colorPalette.crimson,
      icon: "📈",
      content: (
        <div className="flex h-full flex-col gap-3 sm:gap-4 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { label: "Visites", value: "2.5K", change: "+24%", color: colorPalette.copper },
              { label: "Temps moyen", value: "4:32", change: "+12%", color: colorPalette.terracotta },
              { label: "Taux conversion", value: "3.8%", change: "+8%", color: colorPalette.mauve },
              { label: "Revenus", value: "$12.4K", change: "+32%", color: colorPalette.emerald },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-lg sm:rounded-xl border p-2 sm:p-3 animate-float"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  backgroundColor: `${stat.color}10`,
                  borderColor: `${stat.color}25`
                }}
              >
                <div className="text-xs opacity-70 mb-0.5 sm:mb-1 truncate">{stat.label}</div>
                <div className="flex items-baseline justify-between">
                  <div className="text-sm sm:text-lg font-bold truncate" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs px-1 py-0.5 rounded-full whitespace-nowrap" style={{ 
                    backgroundColor: `${stat.color}20`,
                    color: stat.color
                  }}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-lg sm:rounded-xl border p-3 sm:p-4" style={{ 
            backgroundColor: 'var(--card)',
            borderColor: `${colorPalette.slate}20`
          }}>
            <div className="flex h-full items-end justify-between gap-1 sm:gap-1.5">
              {[40, 65, 30, 80, 55, 90, 70, 50, 85, 60].map((height, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full rounded-t animate-bar-grow relative overflow-hidden group"
                    style={{ 
                      height: `${height}%`,
                      animationDelay: `${index * 0.08}s`,
                      background: `linear-gradient(to top, 
                        ${index % 4 === 0 ? colorPalette.copper : 
                         index % 4 === 1 ? colorPalette.terracotta : 
                         index % 4 === 2 ? colorPalette.mauve : 
                         colorPalette.emerald}60, 
                        ${index % 4 === 0 ? colorPalette.copper : 
                         index % 4 === 1 ? colorPalette.terracotta : 
                         index % 4 === 2 ? colorPalette.mauve : 
                         colorPalette.emerald}20)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[8px] sm:text-[10px] mt-0.5 sm:mt-1 opacity-50">D{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Calendrier",
      color: colorPalette.crimson,
      accentColor: colorPalette.amber,
      icon: "📅",
      content: (
        <div className="flex h-full flex-col gap-2 sm:gap-3 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-1 sm:mb-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded flex items-center justify-center text-xs" style={{ 
                backgroundColor: `${colorPalette.crimson}20`,
                color: colorPalette.crimson
              }}>
                ◀
              </div>
              <div className="text-xs sm:text-sm font-medium">Decembre 2025</div>
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded flex items-center justify-center text-xs" style={{ 
                backgroundColor: `${colorPalette.crimson}20`,
                color: colorPalette.crimson
              }}>
                ▶
              </div>
            </div>
            <div className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full" style={{ 
              backgroundColor: `${colorPalette.crimson}15`,
              color: colorPalette.crimson
            }}>
              Aujourd'hui
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
              <div
                key={index}
                className="h-4 sm:h-6 flex items-center justify-center text-xs font-medium"
                style={{ color: `${colorPalette.slate}70` }}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-7 gap-0.5 sm:gap-1">
            {Array.from({ length: 35 }).map((_, index) => {
              const isToday = index === 16;
              const hasEvent = [3, 7, 12, 18, 24, 29].includes(index);
              const isCurrentMonth = index >= 4 && index < 34;
              const dayColor = hasEvent ? colorPalette.crimson : 
                             isToday ? colorPalette.copper : 
                             colorPalette.slate;
              
              return (
                <div
                  key={index}
                  className={`rounded border flex items-center justify-center relative animate-fade-in text-xs sm:text-sm ${
                    !isCurrentMonth ? 'opacity-20' : ''
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.02}s`,
                    backgroundColor: isToday ? `${colorPalette.copper}20` :
                                 hasEvent ? `${colorPalette.crimson}10` : 
                                 'var(--muted)/10',
                    borderColor: isToday ? colorPalette.copper :
                               hasEvent ? `${colorPalette.crimson}30` : 
                               `${colorPalette.slate}20`,
                    color: dayColor
                  }}
                >
                  {index - 3 > 0 ? index - 3 : ''}
                  {hasEvent && (
                    <div className="absolute top-0.5 right-0.5 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full" style={{ 
                      backgroundColor: colorPalette.crimson
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ),
    },
  ]

  return (
    <header 
      ref={sectionRef} 
      id="hero" 
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden" 
      role="banner"
    >
      {/* Animated Background with Harmonized Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient Background with Mouse Tracking */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}% ${mousePosition.y}%, ${colorPalette.darkTeal}15 0%, transparent 80%),
                        radial-gradient(400px at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, ${colorPalette.crimson}10 0%, transparent 60%)`
          }}
        />
        
        {/* Harmonized Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, ${colorPalette.copper}12 25%, transparent 25%),
              linear-gradient(-45deg, ${colorPalette.copper}12 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, ${colorPalette.crimson}12 75%),
              linear-gradient(-45deg, transparent 75%, ${colorPalette.crimson}12 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
          }}
        />
        
        {/* Floating particles harmonisées */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-particle-float"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 9) % 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                backgroundColor: i % 6 === 0 ? colorPalette.copper : 
                                i % 6 === 1 ? colorPalette.crimson : 
                                i % 6 === 2 ? colorPalette.amber :
                                i % 6 === 3 ? colorPalette.mauve :
                                i % 6 === 4 ? colorPalette.emerald : 
                                colorPalette.darkTeal,
                opacity: Math.random() * 0.15 + 0.05,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 20 + 20}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes slide-up { 
          0% { transform: translateY(15px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes bar-grow { 
          0% { transform: scaleY(0); transform-origin: bottom; }
          100% { transform: scaleY(1); transform-origin: bottom; }
        }
        @keyframes fade-in { 
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes progress { 
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.05; }
          25% { transform: translate(10px, -15px) rotate(90deg); opacity: 0.1; }
          50% { transform: translate(-5px, -30px) rotate(180deg); opacity: 0.15; }
          75% { transform: translate(-10px, -15px) rotate(270deg); opacity: 0.1; }
        }
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 15px 0px ${colorPalette.copper}20;
          }
          50% { 
            box-shadow: 0 0 25px 3px ${colorPalette.copper}40;
          }
        }
        @keyframes text-glow {
          0%, 100% { 
            text-shadow: 0 0 8px ${colorPalette.crimson}30;
          }
          50% { 
            text-shadow: 0 0 15px ${colorPalette.crimson}60;
          }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
        .animate-bar-grow { animation: bar-grow 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-progress { animation: progress 1.5s ease-out forwards; }
        .animate-particle-float { animation: particle-float linear infinite; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 8s ease infinite; }
        
        @media (max-width: 640px) {
          .animate-float { animation-duration: 5s; }
          .animate-text-glow { animation-duration: 3s; }
        }
      `}</style>

      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 lg:bottom-5"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">

          {/* LEFT SIDE — TEXT CONTENT */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center gap-2 lg:gap-3">
                <Badge 
                  variant="outline" 
                  className="border-l-4 border-r rounded-lg px-3 py-1.5 lg:px-4 lg:py-2 backdrop-blur-sm"
                  style={{
                    borderLeftColor: colorPalette.copper,
                    borderRightColor: colorPalette.crimson,
                    borderTopColor: `${colorPalette.copper}30`,
                    borderBottomColor: `${colorPalette.crimson}30`,
                    background: `linear-gradient(90deg, ${colorPalette.copper}10, ${colorPalette.crimson}10)`
                  }}
                >
                  <Sparkles className="h-3 w-3 lg:h-3.5 lg:w-3.5 mr-1 lg:mr-2" style={{ color: colorPalette.amber }} />
                  <span className="font-semibold text-xs lg:text-sm" style={{ color: colorPalette.copper }}>
                    Développeuse Full-Stack
                  </span>
                </Badge>
                <div 
                  className="h-px flex-1 hidden sm:block"
                  style={{
                    background: `linear-gradient(90deg, ${colorPalette.copper}30, transparent)`
                  }}
                />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:text-4lg font-bold tracking-tight">
                <span className="block text-foreground ">Naimi Aya</span>
                <span 
                  className="block mt-2 lg:mt-3 font-bold"
                  style={{
                    background: `linear-gradient(135deg, 
                      ${colorPalette.copper} 0%, 
                      ${colorPalette.terracotta} 35%, 
                      ${colorPalette.crimson} 65%, 
                      ${colorPalette.darkTeal} 100%)`,
                    backgroundSize: '200% 200%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradient-shift 8s ease infinite'
                  }}
                >
                  Créatrice d'Expériences Digitales
                </span>
              </h1>
            </div>

            <p className="text-base lg:text-m leading-relaxed text-pretty max-w-2xl" style={{ color: colorPalette.slate }}>
              Passionnée par le web moderne, je transforme des idées innovantes en solutions digitales 
              performantes. Expert en React, Next.js et TypeScript, je crée des expériences utilisateur 
              exceptionnelles qui marquent les esprits.
            </p>

            {/* Benefits List */}
            <section aria-labelledby="benefits-heading " className="space-y-3 m:space-y-4 ">
              <h2 id="benefits-heading" className="sr-only">Compétences et Services</h2>
              <ul className="space-y-2 lg:space-y-3  " role="list">
                {benefits.map((benefit, index) => (
                  <li 
                    key={index} 
                    className="flex items-center  gap-3 lg:gap-4 group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-300 "
                    role="listitem"
                    onClick={() => setCurrentLayout(index)}
                    style={{
                    
                      borderLeft: `2px solid ${
                        index === 0 ? colorPalette.copper :
                        index === 1 ? colorPalette.crimson :
                        index === 2 ? colorPalette.amber :
                        index === 3 ? colorPalette.emerald :
                        colorPalette.mauve
                      }`
                    }}
                  >
                    <div className="relative flex-shrink-0">
                      <div 
                        className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-100  lg:text-m"
                        style={{
                          backgroundColor: `${
                            index === 0 ? colorPalette.copper :
                            index === 1 ? colorPalette.crimson :
                            index === 2 ? colorPalette.amber :
                            index === 3 ? colorPalette.emerald :
                            colorPalette.mauve
                          }20`
                        }}
                      />
                      <CheckCircle2 
                        className="h-5 w-5 lg:h-6 lg:w-6 relative z-10 transition-all group-hover:scale-110" 
                        style={{ 
                          color: index === 0 ? colorPalette.copper :
                                 index === 1 ? colorPalette.crimson :
                                 index === 2 ? colorPalette.amber :
                                 index === 3 ? colorPalette.emerald :
                                 colorPalette.mauve
                        }}
                        aria-hidden="true" 
                      />
                    </div>
                    <span className="text-sm lg:text-base  text-foreground group-hover:translate-x-1 lg:group-hover:translate-x-2 transition-transform duration-300">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 lg:gap-4 pt-2 lg:pt-4">
              <Button 
                className="group px-6 py-4 lg:px-8 lg:py-6 rounded-full font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                size="lg"
                style={{
                  background: `linear-gradient(135deg, 
                    ${colorPalette.copper} 0%, 
                    ${colorPalette.terracotta} 50%, 
                    ${colorPalette.crimson} 100%)`,
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 8s ease infinite'
                }}
              >
                <a href="#contact" className="text-white text-sm lg:text-base" style={{ textDecoration: "none" }}>
                  Voir mes projets
                </a>
                <ArrowRight className="ml-2 h-3 w-3 lg:h-4 lg:w-4 group-hover:translate-x-1 lg:group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-4 lg:px-8 lg:py-6 rounded-full font-semibold transition-all duration-300 hover:border-2"
                size="lg"
                style={{
                  borderColor: `teal`,
                  color: 'white'
                }}
              >
                <a href="#contact" className="text-sm lg:text-base" style={{ textDecoration: "none", color: "inherit" }}>
                  Contactez-moi
                </a>
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE — INTERACTIVE MOCKUP */}
          <div className="relative mt-8 lg:mt-0 lg:bottom-12">
            {/* Layout Indicator */}
            <div 
              className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 lg:gap-3 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl lg:rounded-2xl border shadow-lg z-20"
              style={{
                background: `linear-gradient(135deg, ${colorPalette.darkTeal}10, ${colorPalette.deepCharcoal}15)`,
                borderColor: `${colorPalette.slate}20`,
                boxShadow: `0 8px 20px ${colorPalette.darkTeal}10`,
                whiteSpace: 'nowrap'
              }}
            >
              <span className="text-xs lg:text-sm font-medium hidden sm:inline" style={{ color: colorPalette.slate }}>
                Exemple :
              </span>
              <div className="flex items-center gap-1.5 lg:gap-2">
                <span className="text-base lg:text-lg">{layouts[currentLayout].icon}</span>
                <span className="font-semibold text-sm lg:text-base" style={{ color: layouts[currentLayout].color }}>
                  {layouts[currentLayout].name}
                </span>
              </div>
              <div className="flex gap-1 ml-1.5 lg:ml-3">
                {layouts.map((layout, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLayout(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentLayout === index ? 'w-4 lg:w-6' : 'w-1.5'
                    }`}
                    style={{
                      backgroundColor: currentLayout === index 
                        ? layout.color 
                        : `${colorPalette.slate}40`
                    }}
                    aria-label={`Voir ${layout.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Main Mockup Card */}
            <figure className="relative mt-8 sm:mt-12" role="img" aria-label="Démos d'interfaces utilisateur animées">
              <Card 
                className="overflow-hidden border-2 backdrop-blur-xl shadow-xl lg:shadow-2xl rounded-2xl lg:rounded-3xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
                style={{
                  borderColor: `${colorPalette.slate}30`,
                  background: `linear-gradient(135deg, 
                    ${colorPalette.darkTeal}05, 
                    var(--card) 40%, 
                    var(--background) 100%)`,
                  boxShadow: `0 15px 40px -12px ${colorPalette.darkTeal}20`
                }}
              >
                <div className="aspect-[4/3] p-3 sm:p-4 lg:p-5 relative">
                  <div 
                    className="absolute inset-2 sm:inset-3 rounded-xl lg:rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, 
                        ${colorPalette.copper}05, 
                        ${colorPalette.crimson}03, 
                        ${colorPalette.darkTeal}05)`,
                      border: `1px solid ${colorPalette.slate}15`
                    }}
                  />
                  
                  {/* Animated Layouts */}
                  {layouts.map((layout, index) => (
                    <div 
                      key={index} 
                      className={`absolute inset-2 sm:inset-3 transition-all duration-700 ease-out transform rounded-xl lg:rounded-2xl ${
                        currentLayout === index 
                          ? "opacity-100 scale-100 rotate-0 z-10" 
                          : "opacity-0 scale-95 -rotate-3 lg:-rotate-6 z-0"
                      }`} 
                      style={{ transitionDelay: `${index * 150}ms` }}
                      aria-label={`${layout.name} - Exemple d'interface`}
                    >
                      {layout.content}
                    </div>
                  ))}

                  {/* Mockup UI Elements */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-1.5">
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full" style={{ backgroundColor: `${colorPalette.crimson}60` }} />
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full" style={{ backgroundColor: `${colorPalette.copper}60` }} />
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full" style={{ backgroundColor: `${colorPalette.darkTeal}60` }} />
                  </div>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 h-1.5 w-6 sm:h-2 sm:w-10 rounded-full" style={{ backgroundColor: `${colorPalette.slate}30` }} />
                </div>
              </Card>
              <figcaption className="sr-only">
                Collection interactive d'interfaces utilisateur montrant différentes vues : 
                tableau de bord, kanban, analytics et calendrier avec animations fluides
              </figcaption>
            </figure>

            {/* Floating Elements - Only on desktop */}
            <div className="hidden lg:block">
              <div 
                className="absolute -bottom-4 -left-4 h-16 w-16 rounded-xl border-2 animate-float"
                style={{ 
                  backgroundColor: `${colorPalette.copper}12`,
                  borderColor: `${colorPalette.copper}40`,
                  animationDelay: '0.3s',
                  boxShadow: `0 8px 20px ${colorPalette.copper}15`
                }}
              />
              <div 
                className="absolute -top-4 -right-4 h-14 w-14 rounded-full border animate-float"
                style={{ 
                  backgroundColor: `${colorPalette.crimson}12`,
                  borderColor: `${colorPalette.crimson}40`,
                  animationDelay: '0.7s',
                  boxShadow: `0 8px 20px ${colorPalette.crimson}15`
                }}
              />
            </div>

           
          </div>

        </div>
      </div>

      {/* Scroll Indicator - Only on desktop */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div 
          className="h-8 w-px animate-bounce"
          style={{
            background: `linear-gradient(to bottom, ${colorPalette.copper}, ${colorPalette.crimson}, transparent)`
          }}
        />
      </div>
    </header>
  )
}