"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Palette, Check } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Développement Web",
    description: "Applications web modernes et performantes avec les dernières technologies",
    features: [
      "Applications React/Next.js",
      "APIs REST et GraphQL",
      "Bases de données optimisées",
      "Déploiement cloud",
      "Tests automatisés",
    ],
  },
  {
    icon: Smartphone,
    title: "Applications Mobile",
    description: "Applications mobiles natives et cross-platform pour iOS et Android",
    features: ["React Native", "Flutter", "Applications hybrides", "Intégrations natives", "Publication sur stores"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interfaces utilisateur intuitives et expériences utilisateur optimales",
    features: [
      "Design systems",
      "Prototypage interactif",
      "Tests utilisateurs",
      "Responsive design",
      "Accessibilité web",
    ],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-6 relative">
      {/* Vibrant gradient background - Orange to Red */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/15 to-pink-500/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-15">
        <div className="pattern-subtle"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Mes Services
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Je propose des solutions complètes pour vos projets digitaux, du concept à la mise en production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-border bg-card/70 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <p className="text-muted-foreground">{service.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-foreground">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
