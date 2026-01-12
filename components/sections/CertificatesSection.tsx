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
  const [mouseX, setMouseX] = useState(0) // Not required anymore for inclinaison, but kept if used elsewhere
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
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Touch swipe mobile
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) nextSlide()
    if (distance < -50) prevSlide()
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

  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % certificates.length)

  if (certificates.length === 0) return null

  const cardWidth = windowWidth < 640 ? 280 : windowWidth < 1024 ? 320 : 340
  const translateFactor = cardWidth + 24
  const maxVisibleOffset = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 2
  const isMobile = windowWidth < 768

  return (
    <section id="certificates" className="relative py-24 text-foreground overflow-visible">
      <div className="max-w-7xl mx-auto px-4">
        {/* ====== TITRE ====== */}
        <div className="relative text-center mb-24">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            {/* <div className="w-[280px] h-[30px]
        rounded-full
       bg-gradient-to-r
from-[#F5D2FF]

via-[#7D0ECE]
to-[#F5D2FF]
        blur-[110px]
        animate-aura-slow"/> */}
          </div>
          <h2  className="
         outline-animated
         font-orbitron
         text-5xl md:text-6xl lg:text-7xl
         uppercase
         tracking-widest
         text-center
       "
       data-text="MES CERTIFICATIONS"
  >
            Mes Certifications
            {/* <svg className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-[115%] h-6" viewBox="0 0 320 40" fill="none">
              <path d="M10 28 C45 20, 90 34, 135 26 C180 18, 230 32, 270 25 C290 22, 305 30, 315 27"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="scribble-draw"/>
            </svg> */}
          </h2>
          {/* <div className="mt-10 flex justify-center">
            <div className="relative h-px w-52 bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-scan-ultra"/>
            </div>
          </div> */}
          <p className="mt-8 text-[11px] md:text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
            Découvrez mes certifications et accomplissements qui témoignent de mon expertise et de ma passion pour l'innovation
          </p>
        </div>

        {/* ====== CAROUSEL ====== */}
        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full h-[400px] sm:h-[480px] flex items-center justify-center perspective-2000 touch-pan-y ${isMobile ? 'px-8' : 'px-12'}`}
        >
          {certificates.map((cert, index) => {
            let offset = index - currentIndex
            const half = Math.floor(certificates.length / 2)
            if (offset < -half) offset += certificates.length
            if (offset > half) offset -= certificates.length

            // Désactiver inclinaison: On met rotateX et rotateY à 0
            // (mouseX et windowWidth sont gardés si d'autres usages que l'inclinaison)
            const rotateY = 0
            const rotateX = 0
            const translateX = offset * translateFactor + (windowWidth >= 768 ? mouseX * 20 : 0)
            const translateZ = offset === 0 ? 0 : -Math.abs(offset) * 40
            const scale = offset === 0 ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.15)
            const opacity = Math.abs(offset) > maxVisibleOffset ? 0 : Math.max(0.3, 1 - Math.abs(offset) * 0.2)
            const zIndex = 100 - Math.abs(offset) * 10

            return (
              <div
                key={cert.id}
                className="absolute top-0 transition-all duration-500 ease-out cursor-pointer group"
                style={{
                  // Ne plus incliner les cartes
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  width: cardWidth,
                  height: "420px",
                  filter: `blur(${Math.abs(offset) * 1}px)`,
                }}
              >
                <Card className="h-full relative border border-transparent bg-card/59 backdrop-blur-xl shadow-lg shadow-[#BF1A1A]/40 overflow-hidden group-hover:shadow-m group-hover:shadow-[#BF1A1A]/60 hover:scale-[1.03] rounded-2xl transition-all duration-500">
                  
                  {/* IMAGE + OVERLAY GLITCH */}
                  <div className={`relative ${isMobile ? 'h-40' : 'h-48'} overflow-hidden`}>
                    <Image src={cert.image_url || "/placeholder.svg"} alt={cert.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent mix-blend-overlay animate-glitch"/>
                    <Badge className="absolute top-2 right-2 px-3 py-1 bg-gradient-to-b from-[#BF1A1A] via-[#CC561E] to-[#BF1A1A] text-white text-xs rounded-full shadow-lg  flex items-center">
                      <Award className="w-3 h-3 mr-1"/> Certifié
                    </Badge>
                  </div>

                  {/* HEADER */}
                  <CardHeader className={`${isMobile ? 'p-3 pb-1' : 'p-4 pb-2'}`}>
                    <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-foreground  transition-colors duration-300 line-clamp-2`}>
                      {cert.title}
                    </CardTitle>
                  </CardHeader>

                  {/* CONTENT */}
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
                            <Building className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#CC561E]"/>
                            <span className="font-medium">{cert.issuer}</span>
                          </div>
                        )}
                        {cert.issue_date && (
                          <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-sky-400"/>
                            <span>{new Date(cert.issue_date).toLocaleDateString('fr-FR', { year:'numeric', month:'long', day:'numeric' })}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {cert.certificate_url && (
                      <div className={`${isMobile ? 'mt-4' : 'mt-6'}`}>
                        <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer">
                          <div className="group relative w-full h-10 sm:h-12 bg-gradient-to-b from-[#BF1A1A]/5 via-[#CC561E]/5 to-[#BF1A1A]/5 border border-[#CC561E]/10 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-[#BF1A1A]/30 hover:bg-[#CC561E]/5 hover:shadow-lg hover:scale-[1.02]">
                            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5  transition-colors duration-300 z-10"/>
                            <span className={`ml-2 sm:ml-3 ${isMobile ? 'text-xs' : 'text-sm'} font-medium text-foreground  transition-colors duration-300 z-10`}>
                              Voir le certificat
                            </span>
                            {/* <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-b from-[#BF1A1A] via-[#CC561E] to-[#BF1A1A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/> */}
                          </div>
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}

          {/* ARROWS */}
          <button onClick={prevSlide} className={`absolute top-1/2 -translate-y-1/2 w-11 h-11 bg-card/80 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-foreground hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-lg transition-all duration-300 hover:scale-110 z-[120] ${isMobile ? '-left-6' : '-left-4'}`}>
            <ChevronLeft className="w-5 h-5 transition-transform"/>
          </button>
          <button onClick={nextSlide} className={`absolute top-1/2 -translate-y-1/2 w-11 h-11 bg-card/80 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-foreground hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:shadow-lg transition-all duration-300 hover:scale-110 z-[120] ${isMobile ? '-right-6' : '-right-4'}`}>
            <ChevronRight className="w-5 h-5 transition-transform"/>
          </button>

          {/* INDICATORS */}
          <div className={`absolute left-1/2 -translate-x-1/2 flex space-x-3 sm:space-x-2 z-[150] ${isMobile ? 'bottom-2' : 'bottom-4'}`}>
            {certificates.map((_, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-indigo-500 scale-125 shadow-lg' : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'}`} aria-label={`Aller au certificat ${index + 1}`}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
