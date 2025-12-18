"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  BaseAnimation,
  TextAnimation,
  ParagraphAnimation,
  ListAnimation,
  ImageAnimation,
  ButtonAnimation,
  CardAnimation,
  LinkAnimation,
  GroupAnimation,
  ParallaxAnimation
} from "./framer-animations"

// Composant de démonstration utilisant le même style que le timeline
export function FramerAnimationDemo() {
  const demoImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=300&fit=crop"
  ]

  return (
    <div className="framer-animation-demo space-y-16 p-8">
      {/* Section d'en-tête - Même style que timeline */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
          Système d'Animation Framer Motion
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Démonstration utilisant le même style d'animation que le timeline avec Framer Motion
        </p>
      </motion.div>

      {/* Section avec animations de texte - Style timeline */}
      <section>
        <TextAnimation level={2} delay={0.1} className="text-3xl font-semibold mb-8 text-center">
          Animations de Texte
        </TextAnimation>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <TextAnimation level={3} delay={0.2} className="text-purple-600">
              Animation Fade
            </TextAnimation>
            <ParagraphAnimation delay={0.3}>
              Les textes apparaissent avec le même effet que le timeline : 
              <strong> opacity: 0, y: 50 → opacity: 1, y: 0</strong>
            </ParagraphAnimation>
            <TextAnimation level={4} delay={0.4} effect="slide">
              Animation avec effet de glissement
            </TextAnimation>
            <TextAnimation level={4} delay={0.5} effect="typewriter">
              Effet machine à écrire
            </TextAnimation>
          </div>
          
          <div className="space-y-6">
            <ListAnimation staggerDelay={0.15}>
              <span>Point 1 - Même animation que timeline</span>
              <span>Point 2 - Durée: 0.6s easeOut</span>
              <span>Point 3 - Effets de cascade</span>
              <span>Point 4 - Viewport margin: -80px</span>
            </ListAnimation>
          </div>
        </div>
      </section>

      {/* Section avec images - Style timeline */}
      <section>
        <TextAnimation level={2} delay={0.1} className="text-3xl font-semibold mb-8 text-center">
          Images Animées
        </TextAnimation>
        
        {/* Galerie d'images avec même style */}
        <GroupAnimation staggerDelay={0.2} className="grid grid-cols-3 gap-4 mb-8">
          {demoImages.slice(0, 3).map((src, index) => (
            <ImageAnimation
              key={index}
              src={src}
              alt={`Demo ${index + 1}`}
              delay={index * 0.1}
              effect="fade"
              className="rounded-lg overflow-hidden"
            />
          ))}
        </GroupAnimation>
        
        <div className="grid md:grid-cols-2 gap-8">
          <ImageAnimation
            src={demoImages[3]}
            alt="Image principale"
            delay={0.2}
            effect="zoom"
            className="rounded-lg"
          />
          
          <div className="space-y-4">
            <ParagraphAnimation delay={0.3}>
              Les images utilisent la même configuration d'animation que le timeline :
            </ParagraphAnimation>
            <ListAnimation staggerDelay={0.1}>
              <span>Viewport: once: true, margin: -80px</span>
              <span>Transition: duration 0.6-0.8s, easeOut</span>
              <span>Effets: fade, zoom, blur disponibles</span>
            </ListAnimation>
          </div>
        </div>
      </section>

      {/* Section avec éléments interactifs - Style timeline */}
      <section>
        <TextAnimation level={2} delay={0.1} className="text-3xl font-semibold mb-8 text-center">
          Éléments Interactifs
        </TextAnimation>
        
        {/* Groupe de boutons avec même style */}
        <GroupAnimation staggerDelay={0.15} className="flex flex-wrap gap-4 mb-8 justify-center">
          <ButtonAnimation delay={0.2} effect="scale">
            Bouton Scale
          </ButtonAnimation>
          <ButtonAnimation delay={0.3} effect="bounce" variant="secondary">
            Bouton Bounce
          </ButtonAnimation>
          <ButtonAnimation delay={0.4} effect="pulse" variant="outline">
            Bouton Pulse
          </ButtonAnimation>
        </GroupAnimation>

        {/* Cartes avec même style */}
        <GroupAnimation staggerDelay={0.2} className="grid md:grid-cols-3 gap-6">
          <CardAnimation delay={0.2} effect="lift">
            <div className="p-6 bg-card/90 backdrop-blur-md border border-purple-500/30 rounded-lg">
              <h4 className="text-lg font-bold mb-2">Carte Lift</h4>
              <p className="text-muted-foreground">
                Même animation que timeline avec whileHover scale: 1.02, y: -5
              </p>
            </div>
          </CardAnimation>
          
          <CardAnimation delay={0.3} effect="glow">
            <div className="p-6 bg-card/90 backdrop-blur-md border border-purple-500/30 rounded-lg">
              <h4 className="text-lg font-bold mb-2">Carte Glow</h4>
              <p className="text-muted-foreground">
                Effet de lueur avec boxShadow au survol
              </p>
            </div>
          </CardAnimation>
          
          <CardAnimation delay={0.4} effect="shimmer">
            <div className="p-6 bg-card/90 backdrop-blur-md border border-purple-500/30 rounded-lg">
              <h4 className="text-lg font-bold mb-2">Carte Shimmer</h4>
              <p className="text-muted-foreground">
                Animation subtle avec scale et translateY
              </p>
            </div>
          </CardAnimation>
        </GroupAnimation>

        {/* Liens avec même style */}
        <div className="mt-8">
          <ParagraphAnimation delay={0.2} className="mb-4">
            Liens avec effets de survol (même configuration que timeline) :
          </ParagraphAnimation>
          
          <GroupAnimation staggerDelay={0.1} className="flex flex-wrap gap-6">
            <LinkAnimation delay={0.3} href="#" effect="underline">
              Lien avec soulignement
            </LinkAnimation>
            <LinkAnimation delay={0.4} href="#" effect="glow">
              Lien avec lueur
            </LinkAnimation>
            <LinkAnimation delay={0.5} href="#" effect="scale">
              Lien avec scale
            </LinkAnimation>
          </GroupAnimation>
        </div>
      </section>

      {/* Section avec effets de cascade - Style timeline */}
      <section>
        <TextAnimation level={2} delay={0.1} className="text-3xl font-semibold mb-8 text-center">
          Effets de Cascade
        </TextAnimation>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-muted/20 p-8 rounded-lg"
        >
          <GroupAnimation staggerDelay={0.15} className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-card/50 rounded-lg border border-purple-500/20"
              >
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold">Élément de cascade {i + 1}</h4>
                  <p className="text-sm text-muted-foreground">
                    Animation séquentielle avec délai échelonné
                  </p>
                </div>
              </motion.div>
            ))}
          </GroupAnimation>
        </motion.div>
      </section>

      {/* Section avec parallaxe - Style timeline */}
      <section>
        <TextAnimation level={2} delay={0.1} className="text-3xl font-semibold mb-8 text-center">
          Effet Parallaxe
        </TextAnimation>
        
        <ParallaxAnimation speed={0.3} className="text-center py-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-violet-500/20 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Élément avec Parallaxe</h3>
            <p className="text-muted-foreground">
              L'élément se déplace à une vitesse différente lors du scroll
            </p>
          </div>
        </ParallaxAnimation>
      </section>

      {/* Section de configuration - Style timeline */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg"
        >
          <TextAnimation level={3} delay={0.2} className="mb-6">
            Configuration Utilisée
          </TextAnimation>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-purple-600">Animation de Base</h4>
              <code className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded block">
                initial: {'{ opacity: 0, y: 50 }'}<br/>
                whileInView: {'{ opacity: 1, y: 0 }'}<br/>
                viewport: {'{ once: true, margin: "-80px" }'}<br/>
                transition: {'{ duration: 0.6, ease: "easeOut" }'}
              </code>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-purple-600">Effets de Survol</h4>
              <code className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded block">
                whileHover: {'{ scale: 1.02, y: -5 }'}<br/>
                transition: {'{ duration: 0.3 }'}<br/>
                whileTap: {'{ scale: 0.98 }'}
              </code>
            </div>
          </div>
          
          <ParagraphAnimation delay={0.5} className="mt-6">
            Tous les éléments utilisent la même configuration que le timeline pour une cohérence visuelle parfaite.
          </ParagraphAnimation>
        </motion.div>
      </section>
    </div>
  )
}

export default FramerAnimationDemo