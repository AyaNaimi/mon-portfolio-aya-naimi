"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AdvancedTimeline } from "@/components/animated-timeline"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

import { Calendar, MapPin, Code, Coffee, Download, ExternalLink, Heart, User, Award } from "lucide-react"

interface CVFile {
  id: string
  filename: string
  original_filename: string
  file_size: number
  file_type: string
  uploaded_at: string
  is_active: boolean
  storage_path?: string
  public_url?: string
}

interface AboutInfo {
  bio: string
  location: string
  experience_years: number
  projects_count: number
}

interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
  type?: string
}

interface AboutClientProps {
  aboutInfo: AboutInfo | null
  timeline: TimelineItem[]
}

export function AboutClient({ aboutInfo, timeline }: AboutClientProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCV, setActiveCV] = useState<CVFile | null>(null)
  const [isLoadingCV, setIsLoadingCV] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const displayInfo = aboutInfo || {
    bio: "Développeur full-stack passionné basé à Casablanca, avec une expertise approfondie en technologies web modernes. Je transforme les idées en applications web innovantes en combinant créativité technique et excellence en développement.",
    location: "Casablanca, Maroc",
    experience_years: 1,
    projects_count: 5,
  }

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
    loadActiveCV()
  }, [])

  const loadActiveCV = async () => {
    try {
      setIsLoadingCV(true)
      const { data, error } = await supabase
        .from('cv_files')
        .select('*')
        .eq('is_active', true)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading active CV:', error)
        return
      }

      setActiveCV(data || null)
    } catch (error) {
      console.error('Error loading active CV:', error)
    } finally {
      setIsLoadingCV(false)
    }
  }

  const handleDownloadCV = async () => {
    if (!activeCV) {
      toast({
        title: "CV non disponible",
        description: "Aucun CV n'a été téléchargé par l'administrateur.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/cv/${activeCV.id}`)
      if (!response.ok) {
        throw new Error('Failed to download CV')
      }
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = activeCV.original_filename
      a.click()
      URL.revokeObjectURL(url)
      
      toast({
        title: "Téléchargement commencé",
        description: `${activeCV.original_filename} est en cours de téléchargement.`,
      })
    } catch (error) {
      console.error('CV Download Error:', error)
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger le CV. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
       
       
       
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
          {/* Profile Section */}
          <div
            className={`transition-all duration-1000 delay-400 order-2 lg:order-1 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <Card className="relative overflow-hidden rounded-xl bg-card/90 backdrop-blur-md transition-all duration-500 hover:shadow-xl">

              {/* animated border */}
              <span className="pointer-events-none absolute inset-0 rounded-xl">
                {/* layer 1 : slow wave */}
                <span
                  className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-purple-600/60 via-violet-500/60 to-purple-400/60 animate-borderWave"
                />

                {/* layer 2 : soft glow */}
                <span
                  className="absolute inset-[-3px] rounded-xl bg-gradient-to-r from-violet-500/30 via-purple-600/30 to-purple-400/30 blur-md animate-borderPulse"
                />
              </span>
              
              <div className="relative z-10 m-[1px] rounded-xl bg-card/95 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                  Ma passion
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
                  {displayInfo.bio}
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <MapPin className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{displayInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Calendar className="h-5 w-5 text-violet-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{displayInfo.experience_years}+ années d'expérience</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Code className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{displayInfo.projects_count}+ projets réalisés</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Coffee className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Fan de café artisanal</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-600 border-purple-600/30 text-xs sm:text-sm">
                    React Expert
                  </Badge>
                  <Badge variant="secondary" className="bg-violet-500/20 text-violet-500 border-violet-500/30 text-xs sm:text-sm">
                    Node.js
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-400/20 text-purple-400 border-purple-400/30 text-xs sm:text-sm">
                    TypeScript
                  </Badge>
                  <Badge variant="secondary" className="bg-violet-600/20 text-violet-600 border-violet-600/30 text-xs sm:text-sm">
                    Next.js
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-violet-500 hover:shadow-lg transition-all duration-300"
                    onClick={handleDownloadCV}
                    disabled={isLoadingCV}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isLoadingCV ? "Chargement..." : activeCV ? "Mon CV" : "CV non disponible"}
                  </Button>
                  {/* <Button variant="outline" className="border-purple-600/30 hover:bg-purple-600/10">
                    <ExternalLink className="h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </Card>
          </div>

          {/* Timeline Section */}
          <div
            className={`transition-all duration-1000 delay-500 order-1 lg:order-2 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-12 text-foreground flex items-center gap-2 justify-center lg:justify-start">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
              Mon parcours
            </h3>

            <AdvancedTimeline
              timeline={
                timeline.length > 0
                  ? timeline
                  : [
                      {
                        year: "2026",
                        title: "Développeur Full-Stack",
                        company: "ISGI",
                        description:
                          "Développement d'applications modernes avec React, Node.js et architectures performantes.",
                      },
                      {
                        year: "2025",
                        title: "Formation Développement Digital",
                        company: "ISGI",
                        description:
                          "Maîtrise des bases du web moderne, JavaScript, UI/UX et bonnes pratiques.",
                      },
                      {
                        year: "2024",
                        title: "Baccalauréat Sciences Physiques",
                        company: "École Alwiaame",
                        description:
                          "Base scientifique solide favorisant la logique et la résolution de problèmes.",
                      },
                    ]
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}
