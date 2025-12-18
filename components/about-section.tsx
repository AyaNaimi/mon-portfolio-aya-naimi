"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Figma",
  "Tailwind CSS",
  "GraphQL",
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance font-orbitron">
            À Propos De Moi
          </h2>
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-600 to-violet-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="text-center lg:text-left mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">À propos de moi</h3>
            </div>
            <Card className="bg-card/50 border-purple-500/20 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  Développeur full-stack passionné avec plus de 5 ans d'expérience dans la création d'applications web
                  modernes et performantes. Je combine expertise technique et sensibilité design pour créer des
                  solutions innovantes.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Spécialisé dans l'écosystème React/Next.js et les architectures cloud, j'accompagne les entreprises
                  dans leur transformation digitale en créant des expériences utilisateur exceptionnelles.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-foreground text-center lg:text-left">Compétences principales</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-gradient-to-r from-purple-600/20 to-violet-500/20 border-purple-500/30 text-purple-300 hover:from-purple-600/30 hover:to-violet-500/30 transition-all duration-300 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
