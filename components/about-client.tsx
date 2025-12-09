"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

interface AboutImage {
  id: string
  filename: string
  original_filename: string
  file_size: number
  file_type: string
  storage_path?: string
  public_url?: string
  is_active: boolean
  uploaded_at: string
}

interface AboutClientProps {
  aboutInfo: AboutInfo | null
  timeline: TimelineItem[]
  profileImage: AboutImage | null
}

export function AboutClient({ aboutInfo, timeline, profileImage }: AboutClientProps) {
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
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            À propos de{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              moi
            </span>
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            Créateur d'expériences web innovantes qui marient technologie de pointe et design élégant
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Section */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 bg-card/80 backdrop-blur-sm border-border/50">
              {/* Profile Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                {profileImage?.public_url ? (
                  <div className="relative w-full h-full">
                    <img
                      src={profileImage.public_url}
                      alt="Photo de profil"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-2xl">
                    <User className="h-12 w-12" />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  Ma passion
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {displayInfo.bio}
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{displayInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Calendar className="h-5 w-5 text-secondary" />
                    <span>{displayInfo.experience_years}+ années d'expérience</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Code className="h-5 w-5 text-accent" />
                    <span>{displayInfo.projects_count}+ projets réalisés</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <Coffee className="h-5 w-5 text-yellow-500" />
                    <span>Fan de café artisanal</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    React Expert
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                    Node.js
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    TypeScript
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-600 border-purple-500/30">
                    Next.js
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
                    onClick={handleDownloadCV}
                    disabled={isLoadingCV}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isLoadingCV ? "Chargement..." : activeCV ? "Mon CV" : "CV non disponible"}
                  </Button>
                  <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Timeline Section */}
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Mon parcours
            </h3>
            <div className="space-y-6">
              {(timeline.length > 0
                ? timeline
                : [
                    {
                      year: "2025-2026",
                      title: "Développeur Full-Stack",
                      company: "ISGI",
                      description: "Développement d'applications React/Node.js, architecture de solutions modernes et optimisées.",
                      type: "education"
                    },
                    {
                      year: "2024-2025",
                      title: "Formation en Développement Digital",
                      company: "ISGI",
                      description: "Apprentissage des fondamentaux de la programmation et des technologies web modernes.",
                      type: "education"
                    },
                    {
                      year: "2024",
                      title: "Baccalauréat en Sciences Physiques",
                      company: "École Alwiaame",
                      description: "Formation scientifique rigoureuse qui développe la logique et la résolution de problèmes.",
                      type: "education"
                    }
                  ]
              ).map((item, index) => (
                <div
                  key={index}
                  className={`relative pl-8 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${600 + index * 150}ms` }}
                >
                  {/* Timeline line */}
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-primary to-secondary" />
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-4 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary transform -translate-x-1/2 shadow-lg" />
                  
                  <Card className="group hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge 
                              variant="outline" 
                              className="text-primary border-primary/50 bg-primary/10"
                            >
                              {item.year}
                            </Badge>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              (item as any).type === 'education' 
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {(item as any).type === 'education' ? 'Formation' : 'Expérience'}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-secondary font-medium mb-2">{item.company}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
