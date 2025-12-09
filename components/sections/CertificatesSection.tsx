"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ChevronLeft, ChevronRight, Award, Calendar, Building } from "lucide-react"

interface Certificate {
  id: number
  title: string
  description?: string
  image_url: string
  issuer?: string
  issue_date?: string
  certificate_url?: string
}

export function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Charger les certificats
  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await fetch("/api/certificates")
        if (!res.ok) throw new Error("Erreur chargement certificats")
        const data: Certificate[] = await res.json()
        setCertificates(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCertificates()
  }, [])

  // Défilement automatique
  useEffect(() => {
    if (certificates.length === 0) return
    
    const interval = setInterval(() => {
      if (!isHovered && certificates.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % certificates.length)
      }
    }, 4000)
    
    return () => clearInterval(interval)
  }, [certificates.length, isHovered])

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Gestion du touch/swipe pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && certificates.length > 1) {
      nextSlide()
    }
    if (isRightSwipe && certificates.length > 1) {
      prevSlide()
    }
  }

  // Parallaxe souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!carouselRef.current || window.innerWidth < 768) return
      const rect = carouselRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      setMouseX(x)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Responsive
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth)
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % certificates.length)

  if (certificates.length === 0) return null

  const cardWidth = windowWidth < 640 ? 280 : windowWidth < 1024 ? 320 : 340
  const translateFactor = cardWidth + 24
  const maxVisibleOffset = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 2
  const isMobile = windowWidth < 768

  return (
    <section id="certificates" className="relative py-24 text-foreground overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-muted/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl mb-6">
            Mes Certifications & Réalisations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes certifications et accomplissements qui témoignent de mon expertise et de ma passion pour l'innovation
          </p>
        </div>

        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full h-[400px] sm:h-[480px] flex items-center justify-center perspective-2000 touch-pan-y ${
            isMobile ? 'px-8' : 'px-12'
          }`}
        >
        {certificates.map((cert, index) => {
          let offset = index - currentIndex
          const half = Math.floor(certificates.length / 2)
          if (offset < -half) offset += certificates.length
          if (offset > half) offset -= certificates.length

          const rotateY = offset * 15 + (windowWidth >= 768 ? mouseX * 8 : 0)
          const translateX = offset * translateFactor + (windowWidth >= 768 ? mouseX * 15 : 0)
          const scale = offset === 0 ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15)
          const opacity = Math.abs(offset) > maxVisibleOffset ? 0 : Math.max(0.3, 1 - Math.abs(offset) * 0.2)
          const zIndex = 100 - Math.abs(offset) * 10

          return (
            <div
              key={cert.id}
              className="absolute top-0 transition-all duration-500 ease-out cursor-pointer group"
              style={{
                transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                width: cardWidth,
                height: "420px",
                filter: `blur(${Math.abs(offset) * 1}px)`,
              }}
            >
              <Card className="h-full glass hover-lift border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:border-primary/20 transition-all duration-500">
                <div className={`relative ${isMobile ? 'h-40' : 'h-48'} overflow-hidden`}>
                  <Image
                    src={cert.image_url || "/placeholder.svg"}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-primary/90 text-primary-foreground border-0 shadow-lg text-xs sm:text-sm">
                    <Award className="w-3 h-3 mr-1" />
                    Certifié
                  </Badge>
                </div>
                
                <CardHeader className={`${isMobile ? 'p-3 pb-1' : 'p-4 pb-2'}`}>
                  <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2`}>
                    {cert.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className={`${isMobile ? 'p-3 pt-1' : 'p-4 pt-2'} flex-1 flex flex-col justify-between`}>
                  <div className={`${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                    {cert.description && (
                      <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground line-clamp-2`}>
                        {cert.description}
                      </CardDescription>
                    )}
                    
                    <div className="space-y-2">
                      {cert.issuer && (
                        <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                          <Building className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
                          <span className="font-medium">{cert.issuer}</span>
                        </div>
                      )}
                      
                      {cert.issue_date && (
                        <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-secondary" />
                          <span>{new Date(cert.issue_date).toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {cert.certificate_url && (
                    <div className={`${isMobile ? 'mt-4' : 'mt-6'}`}>
                      <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer">
                        <div className="group relative w-full h-10 sm:h-12 bg-muted/50 border border-border rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg hover:scale-[1.02]">
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary transition-colors duration-300 z-10" />
                          <span className={`ml-2 sm:ml-3 ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-foreground group-hover:text-primary transition-colors duration-300 z-10`}>
                            Voir le certificat
                          </span>
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </div>
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )
        })}

        {/* Navigation Arrows - Visible but not overlapping */}
        <button
          onClick={prevSlide}
          className={`absolute top-1/2 -translate-y-1/2 w-11 h-11 sm:w-11 sm:h-11 bg-card/80 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-110 z-[120] group ${
            isMobile ? '-left-6' : '-left-4'
          }`}
          aria-label="Certificat précédent"
        >
          <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className={`absolute top-1/2 -translate-y-1/2 w-11 h-11 sm:w-11 sm:h-11 bg-card/80 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-110 z-[120] group ${
            isMobile ? '-right-6' : '-right-4'
          }`}
          aria-label="Certificat suivant"
        >
          <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
        </button>

        {/* Indicateurs de position */}
        <div className={`absolute left-1/2 -translate-x-1/2 flex space-x-3 sm:space-x-2 z-[150] ${
          isMobile ? 'bottom-2' : 'bottom-4'
        }`}>
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-125 shadow-lg' 
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Aller au certificat ${index + 1}`}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
