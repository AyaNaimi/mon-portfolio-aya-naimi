"use client"

import React from "react"
import { 
  StyledTitle, 
  TypewriterTitle, 
  FlipTitle, 
  WaveTitle, 
  GeometricTitle 
} from "@/components/ui/styled-titles"
import { TimelineSection } from "@/components/ui/timeline-style-wrapper"
import "@/components/ui/styled-titles.css"

export default function StyledTitlesDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-violet-50 dark:from-gray-900 dark:to-gray-800">
      {/* En-tête */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Démonstration Titres Stylés
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Différents styles pour les grands titres avec animations
              </p>
            </div>
            
            <div className="flex gap-2">
              <a
                href="/framer-animation-demo"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Animation Demo
              </a>
              <a
                href="/animation-demo"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Autre Demo
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Titre principal */}
        <TimelineSection className="text-center">
          <StyledTitle 
            level={1} 
            delay={0.1}
            effect="glow"
            gradient={true}
            shadow={true}
            glow={true}
            particles={true}
            className="title-massive"
          >
            Grands Titres Stylés
          </StyledTitle>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Collection de styles avancés pour vos titres avec animations fluides
          </p>
        </TimelineSection>

        {/* Section Titres Gradient */}
        <TimelineSection>
          <StyledTitle level={2} delay={0.1} gradient={true} shadow={true}>
            Titres avec Dégradés
          </StyledTitle>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-6">
              <StyledTitle level={3} delay={0.2} gradient={true}>
                Titre H3 Violet
              </StyledTitle>
              <StyledTitle level={4} delay={0.3} gradient={true}>
                Titre H4 Bleu
              </StyledTitle>
              <StyledTitle level={5} delay={0.4} gradient={true}>
                Titre H5 Cyan
              </StyledTitle>
            </div>
            
            <div className="space-y-6">
              <StyledTitle level={3} delay={0.2} gradient={false} className="text-gray-900 dark:text-white">
                Titre H3 Normal
              </StyledTitle>
              <StyledTitle level={4} delay={0.3} gradient={false} className="text-gray-900 dark:text-white">
                Titre H4 Normal
              </StyledTitle>
              <StyledTitle level={5} delay={0.4} gradient={false} className="text-gray-900 dark:text-white">
                Titre H5 Normal
              </StyledTitle>
            </div>
          </div>
        </TimelineSection>

        {/* Section Effets Spéciaux */}
        <TimelineSection>
          <StyledTitle level={2} delay={0.1} gradient={true}>
            Effets Spéciaux
          </StyledTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="text-center space-y-4">
              <StyledTitle 
                level={3} 
                delay={0.2} 
                effect="shimmer"
                gradient={true}
                shimmer={true}
              >
                Effet Shimmer
              </StyledTitle>
              <p className="text-sm text-muted-foreground">
                Animation de brillance qui traverse le titre
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <StyledTitle 
                level={3} 
                delay={0.3} 
                effect="glow"
                gradient={true}
                glow={true}
              >
                Effet Glow
              </StyledTitle>
              <p className="text-sm text-muted-foreground">
                Lueur animée avec effet de survol
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <StyledTitle 
                level={3} 
                delay={0.4} 
                effect="particles"
                gradient={true}
                particles={true}
              >
                Particules
              </StyledTitle>
              <p className="text-sm text-muted-foreground">
                Particules flottantes animées
              </p>
            </div>
          </div>
        </TimelineSection>

        {/* Section Typewriter */}
        <TimelineSection>
          <StyledTitle level={2} delay={0.1} gradient={true}>
            Effet Machine à Écrire
          </StyledTitle>
          
          <div className="space-y-8 mt-8">
            <TypewriterTitle 
              level={3} 
              delay={0.2}
              gradient={true}
            >
              Animation Typewriter Évoluée
            </TypewriterTitle>
            
            <TypewriterTitle 
              level={4} 
              delay={0.4}
              gradient={false}
              speed={80}
            >
              Titre Classique avec Cursor
            </TypewriterTitle>
          </div>
        </TimelineSection>

        {/* Section Rotation 3D */}
        <TimelineSection>
          <StyledTitle level={2} delay={0.1} gradient={true}>
            Rotation 3D
          </StyledTitle>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="text-center">
              <FlipTitle level={3} delay={0.2} gradient={true}>
                Rotation 3D
              </FlipTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Effet de rotation sur l'axe Y
              </p>
            </div>
            
            <div className="text-center">
              <FlipTitle level={3} delay={0.4} gradient={false}>
                Rotation Classique
              </FlipTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Rotation sans dégradé
              </p>
            </div>
          </div>
        </TimelineSection>

        {/* Section Effet Vague */}
        <TimelineSection>
          <StyledTitle level={2} delay={0.1} gradient={true}>
            Effet Vague (Wave)
          </StyledTitle>
          
          <div className="space-y-6 mt-8">
            <WaveTitle level={3} delay={0.2} gradient={true}>
              Chaque Lettre Apparaît Séquentiellement
            </WaveTitle>
            
            <WaveTitle level={4} delay={0.4} gradient={false}>
              Animation de Vague pour Textes Longs
            </WaveTitle>
          </div>
        </TimelineSection>

        {/* Section Formes Géométriques */}
        <TimelineSection>
          <StyledTitle level={2} delay={0.1} gradient={true}>
            Formes Géométriques
          </StyledTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <div className="text-center space-y-4">
              <GeometricTitle level={4} delay={0.2} shape="circle" gradient={true}>
                Cercle
              </GeometricTitle>
            </div>
            
            <div className="text-center space-y-4">
              <GeometricTitle level={4} delay={0.3} shape="triangle" gradient={true}>
                Triangle
              </GeometricTitle>
            </div>
            
            <div className="text-center space-y-4">
              <GeometricTitle level={4} delay={0.4} shape="hexagon" gradient={true}>
                Hexagone
              </GeometricTitle>
            </div>
            
            <div className="text-center space-y-4">
              <GeometricTitle level={4} delay={0.5} shape="diamond" gradient={true}>
                Losange
              </GeometricTitle>
            </div>
          </div>
        </TimelineSection>

        {/* Section Gros Titres */}
        <TimelineSection>
          <StyledTitle level={1} delay={0.1} gradient={true} className="title-large">
            Titre Extra Large
          </StyledTitle>
          
          <StyledTitle level={1} delay={0.3} gradient={true} className="title-massive">
            Titre Massive
          </StyledTitle>
          
          <p className="text-muted-foreground mt-4">
            Tailles responsives avec clamp() pour s'adapter à tous les écrans
          </p>
        </TimelineSection>

        {/* Section Exemples d'Utilisation */}
        <TimelineSection>
          <StyledTitle level={2} delay={0.1} gradient={true}>
            Exemples d'Utilisation
          </StyledTitle>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Héros de Section</h3>
              <StyledTitle 
                level={2} 
                delay={0.2}
                effect="glow"
                gradient={true}
                glow={true}
              >
                Bienvenue sur Notre Site
              </StyledTitle>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Titre de Page</h3>
              <StyledTitle 
                level={3} 
                delay={0.3}
                effect="shimmer"
                gradient={true}
                shimmer={true}
              >
                Portfolio Créatif
              </StyledTitle>
            </div>
          </div>
        </TimelineSection>

        {/* Configuration */}
        <TimelineSection>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
            <StyledTitle level={3} delay={0.1} gradient={true}>
              Configuration
            </StyledTitle>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">Props Disponibles</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li><code>level</code> - Niveau du titre (1-6)</li>
                  <li><code>delay</code> - Délai d'animation</li>
                  <li><code>effect</code> - Type d'effet</li>
                  <li><code>gradient</code> - Dégradé de couleur</li>
                  <li><code>shadow</code> - Ombre portée</li>
                  <li><code>shimmer</code> - Effet brillance</li>
                  <li><code>particles</code> - Particules</li>
                  <li><code>glow</code> - Lueur</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">Styles Automatiques</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Responsive avec clamp()</li>
                  <li>Animations fluides</li>
                  <li>Effets de survol</li>
                  <li>Accessibilité respectée</li>
                  <li>Performance optimisée</li>
                  <li>Cross-browser compatible</li>
                </ul>
              </div>
            </div>
          </div>
        </TimelineSection>

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <StyledTitle level={4} delay={0.1} gradient={true}>
              Système de Titres Stylés
            </StyledTitle>
            <p className="text-muted-foreground mt-2">
              Cohérence visuelle avec le style timeline pour tous les titres
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}