"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Filter } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  demo_url: string
  github_url: string
  featured: boolean
}

const categories = ["Tous", "Full-Stack", "Frontend", "Backend"]

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Project[] = await response.json()
        setProjects(data)
        setFilteredProjects(data) // Initialize filtered projects with all projects
        console.log("Fetched projects:", data) // Temporary log
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        // Set empty array if fetch fails - section will still render
        setProjects([])
        setFilteredProjects([])
      }
    }

    fetchProjects()

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
    if (selectedCategory === "Tous") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory))
    }
  }, [selectedCategory, projects])

  return (
    <section ref={sectionRef} id="projects" className="py-20 relative" data-sr>
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
            Mes projets

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
  Découvrez une sélection de mes réalisations, des applications web modernes aux APIs robustes.
  </p>
</div>


        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-500/50 to-purple-500/50 text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-16" data-sr>
        <h3 className="relative inline-block text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Projets phares
            <span className="absolute -bottom-2 left-0 h-[2px] w-1/3 bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
          </h3>
          <br /><br /><br />
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects
              .filter((project) => project.featured)
              .map((project, index) => (
                <div
                  key={project.id}
                  className={`relative transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <Card className="border border-border bg-card/60 backdrop-blur-xl overflow-hidden hover:bg-card/100 group transition-all duration-500 hover-lift shadow-lg rounded-2xl animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="secondary"                             className="bg-gradient-to-r from-indigo-400/30 via-purple-400/20 to-transparent border-2 border-indigo-400/60 hover:border-primary ring-2 ring-indigo-200/30 shadow-md transition-all duration-300 backdrop-blur-md hover:bg-primary/10 hover:text-primary"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="secondary"       className="bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-transparent border-2 border-indigo-400/60 hover:border-primary ring-2 ring-indigo-200/30 shadow-md transition-all duration-300 backdrop-blur-md hover:bg-primary/10 hover:text-primary">
                            <Github className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                    <div className="p-8">
                      <h4 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h4>
                      <p className="text-muted-foreground mb-6 leading-relaxed text-base">{project.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-muted text-muted-foreground border border-border hover:bg-primary/20 hover:text-primary transition-colors duration-200">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                  
                  {/* Floating accent element */}
                  <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border border-accent/30 bg-accent/10 backdrop-blur-sm transition-all duration-1000 animate-float transform" style={{ animationDelay: `${0.5 + index * 0.2}s` }} />
                </div>
              ))}
          </div>
        </div>

        {/* Other Projects */}
        <div data-sr>
        <h3 className="relative inline-block text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Autres réalisations
            <span className="absolute -bottom-2 left-0 h-[2px] w-1/4 bg-gradient-to-r from-sky-500 to-transparent rounded-full" />
          </h3>
   <br /><br /><br />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <div
                  key={project.id}
                  className={`relative transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <Card className="border border-border bg-card/60 backdrop-blur-xl overflow-hidden hover:bg-card/95 group transition-all duration-500 hover-lift shadow-lg rounded-2xl animate-float" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="secondary" className="bg-card/80 border border-border hover:border-primary/50">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="secondary" className="bg-card/80 border border-border hover:border-primary/50">
                            <Github className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{project.title}</h4>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-muted text-muted-foreground border border-border hover:bg-primary/20 hover:text-primary transition-colors duration-200 text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground border border-border text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                  
                  {/* Floating accent element for smaller cards */}
                  <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border border-secondary/20 bg-secondary/10 backdrop-blur-sm transition-all duration-1000 animate-float transform" style={{ animationDelay: `${0.5 + index * 0.15}s` }} />
                </div>
              ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          data-sr
        >
        
        </div>
      </div>
    </section>
  )
}
