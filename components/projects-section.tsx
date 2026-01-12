"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

// ✅ Type local unique (ignore le ProjectCarousel)
interface Project {
  id: number
  title: string
  description: string
  image: string
  demo_Url?: string
  github_Url?: string
}

// --- Données principales ---
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Restaurant Management App",
    description:
      "Une application complète pour gérer les commandes, les menus et les clients d’un restaurant.",
    image: "/projects/restaurant.jpg",
    demo_Url: "https://lemhamdi-walid-lalla-saida.vercel.app",
    github_Url: "https://github.com/username/restaurant-app",
  },
]

// --- Autres projets ---
const otherProjects: Project[] = [
  {
    id: 2,
    title: "Portfolio Personnel",
    description:
      "Un site web personnel moderne pour présenter des projets et compétences.",
    image: "/projects/portfolio.jpg",
    demo_Url: "https://portfolio.example.com",
    github_Url: "https://github.com/username/portfolio",
  },
  {
    id: 3,
    title: "Application E-commerce",
    description:
      "Une plateforme de vente en ligne avec panier, paiement et espace admin.",
    image: "/projects/ecommerce.jpg",
    demo_Url: "https://ecommerce.example.com",
    github_Url: "https://github.com/username/ecommerce",
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Mes Projets</h2>

        {/* --- Projets mis en avant --- */}
        <div className="grid gap-8">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden border-2 border-primary/20 hover:shadow-lg transition-shadow"
            >
              <CardHeader className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl font-semibold mb-3">
                  {project.title}
                </CardTitle>
                <p className="text-muted-foreground mb-6">
                  {project.description}
                </p>

                <div className="flex gap-3 z-50 relative">
                  <a
                    href={project.demo_Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-50"
                  >
                    <Button size="sm" variant="secondary" className="glass">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Voir Démo
                    </Button>
                  </a>

                  <a
                    href={project.github_Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-50"
                  >
                    <Button size="sm" variant="secondary" className="glass">
                      <Github className="h-4 w-4 mr-2" />
                      Code Source
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- Autres projets --- */}
        <h3 className="text-2xl font-bold mt-16 mb-8 text-center">
          Autres projets
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow border-2 border-primary/10"
            >
              <CardHeader className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-40 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-semibold mb-2">
                  {project.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex gap-2 z-50 relative">
                  <a
                    href={project.demo_Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-50"
                  >
                    <Button size="sm" variant="secondary" className="glass">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>

                  <a
                    href={project.github_Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-50"
                  >
                    <Button size="sm" variant="secondary" className="glass">
                      <Github className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
