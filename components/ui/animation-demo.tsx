"use client"

import React from "react"
import { 
  AnimatedText, 
  AnimatedHeading, 
  AnimatedParagraph,
  AnimatedList 
} from "./animated-text"
import { 
  AnimatedImage,
  ImageGallery 
} from "./animated-image"
import { 
  AnimatedButton,
  AnimatedLink,
  AnimatedCard,
  InteractiveGroup,
  HoverEffect,
  MicroInteraction
} from "./animated-interactive"
import { AdvancedScrollAnimation, CascadeAnimation } from "./advanced-scroll-animations"

// Composant de démonstration du système d'animation
export function AnimationDemo() {
  const demoImages = [
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", alt: "Demo 1" },
    { src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop", alt: "Demo 2" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", alt: "Demo 3" },
    { src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop", alt: "Demo 4" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop", alt: "Demo 5" },
    { src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop", alt: "Demo 6" }
  ]

  return (
    <div className="animation-demo space-y-16 p-8">
      {/* Section d'en-tête */}
      <section className="text-center">
        <AnimatedHeading 
          level={1} 
          effect="fade"
          className="text-4xl font-bold mb-4"
        >
          Système d'Animation Avancé
        </AnimatedHeading>
        
        <AnimatedParagraph 
          effect="slide"
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Découvrez notre nouveau système d'animation avec fade-in progressif, 
          effets de cascade, et optimisations de performance.
        </AnimatedParagraph>
      </section>

      {/* Section avec effets de texte */}
      <section>
        <AnimatedHeading level={2} className="text-2xl font-semibold mb-8">
          Effets de Texte Animés
        </AnimatedHeading>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <AnimatedText type="heading" effect="fade" delay={100}>
              Animation Fade
            </AnimatedText>
            <AnimatedText type="paragraph" effect="slide" delay={200}>
              Les textes apparaissent avec un effet de glissement fluide.
            </AnimatedText>
            <AnimatedText type="paragraph" effect="scale" delay={300}>
              Effet de mise à l'échelle pour attirer l'attention.
            </AnimatedText>
          </div>
          
          <div className="space-y-4">
            <AnimatedList>
              <span>Point 1 - Animation cascade</span>
              <span>Point 2 - Délai échelonné</span>
              <span>Point 3 - Performance optimisée</span>
              <span>Point 4 - Accessibilité respectée</span>
            </AnimatedList>
          </div>
        </div>
      </section>

      {/* Section avec images */}
      <section>
        <AnimatedHeading level={2} className="text-2xl font-semibold mb-8">
          Galerie d'Images Animées
        </AnimatedHeading>
        
        <ImageGallery 
          images={demoImages}
          effect="zoom"
          staggerDelay={150}
          columns={3}
          className="mb-8"
        />
        
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedImage
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop"
            alt="Image démonstrative"
            effect="blur"
            className="rounded-lg"
          />
          
          <div className="space-y-4">
            <AnimatedParagraph effect="fade">
              Les images se chargent de manière progressive avec des effets visuels 
              optimisés pour l'expérience utilisateur.
            </AnimatedParagraph>
            <AnimatedParagraph effect="slide">
              Chaque type de contenu a sa propre durée d'animation optimisée.
            </AnimatedParagraph>
          </div>
        </div>
      </section>

      {/* Section avec éléments interactifs */}
      <section>
        <AnimatedHeading level={2} className="text-2xl font-semibold mb-8">
          Éléments Interactifs
        </AnimatedHeading>
        
        <div className="space-y-8">
          {/* Groupe de boutons */}
          <div>
            <AnimatedParagraph effect="fade" className="mb-4">
              Boutons avec différents effets d'animation :
            </AnimatedParagraph>
            
            <InteractiveGroup type="buttons" effect="cascade" className="flex flex-wrap gap-4">
              <AnimatedButton effect="scale">
                Bouton Scale
              </AnimatedButton>
              <AnimatedButton effect="bounce" variant="secondary">
                Bouton Bounce
              </AnimatedButton>
              <AnimatedButton effect="pulse" variant="outline">
                Bouton Pulse
              </AnimatedButton>
            </InteractiveGroup>
          </div>

          {/* Liens animés */}
          <div>
            <AnimatedParagraph effect="fade" className="mb-4">
              Liens avec effets de survol :
            </AnimatedParagraph>
            
            <div className="flex flex-wrap gap-6">
              <AnimatedLink effect="underline">
                Lien avec soulignement
              </AnimatedLink>
              <AnimatedLink effect="glow">
                Lien avec lueur
              </AnimatedLink>
              <AnimatedLink effect="slide">
                Lien avec glissement
              </AnimatedLink>
            </div>
          </div>

          {/* Cartes interactives */}
          <div>
            <AnimatedParagraph effect="fade" className="mb-4">
              Cartes avec effets de survol :
            </AnimatedParagraph>
            
            <div className="grid md:grid-cols-3 gap-6">
              <AnimatedCard effect="lift">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Carte Lift</h3>
                  <p className="text-gray-600">Effet de soulèvement au survol.</p>
                </div>
              </AnimatedCard>
              
              <AnimatedCard effect="glow">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Carte Glow</h3>
                  <p className="text-gray-600">Effet de lueur lumineuse.</p>
                </div>
              </AnimatedCard>
              
              <AnimatedCard effect="scale">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Carte Scale</h3>
                  <p className="text-gray-600">Animation de mise à l'échelle.</p>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Section avec micro-interactions */}
      <section>
        <AnimatedHeading level={2} className="text-2xl font-semibold mb-8">
          Micro-interactions
        </AnimatedHeading>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <HoverEffect effect="glow" intensity="medium">
              <div className="p-4 bg-blue-100 rounded">
                <p>Élément avec effet de lueur</p>
              </div>
            </HoverEffect>
            
            <HoverEffect effect="tilt" intensity="light">
              <div className="p-4 bg-green-100 rounded">
                <p>Élément avec effet d'inclinaison</p>
              </div>
            </HoverEffect>
          </div>
          
          <div className="space-y-6">
            <MicroInteraction type="click" effect="pulse">
              <button className="px-6 py-3 bg-purple-500 text-white rounded">
                Cliquer pour pulse
              </button>
            </MicroInteraction>
            
            <MicroInteraction type="hover" effect="bounce">
              <div className="p-4 bg-orange-100 rounded cursor-pointer">
                Survoler pour bounce
              </div>
            </MicroInteraction>
          </div>
        </div>
      </section>

      {/* Section avec effets de cascade */}
      <section>
        <AnimatedHeading level={2} className="text-2xl font-semibold mb-8">
          Effets de Cascade
        </AnimatedHeading>
        
        <CascadeAnimation contentType="text" className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">Élément 1</div>
          <div className="p-4 bg-gray-100 rounded">Élément 2</div>
          <div className="p-4 bg-gray-100 rounded">Élément 3</div>
          <div className="p-4 bg-gray-100 rounded">Élément 4</div>
          <div className="p-4 bg-gray-100 rounded">Élément 5</div>
        </CascadeAnimation>
      </section>

      {/* Section de configuration */}
      <section>
        <AnimatedHeading level={2} className="text-2xl font-semibold mb-8">
          Personnalisation
        </AnimatedHeading>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <AnimatedParagraph effect="fade" className="mb-4">
            Ce système d'animation offre de nombreuses options de personnalisation :
          </AnimatedParagraph>
          
          <AnimatedList>
            <span>Durées variables selon le type de contenu</span>
            <span>Effets de cascade avec délais échelonnés</span>
            <span>Support des préférences d'accessibilité</span>
            <span>Optimisations de performance intégrées</span>
            <span>Configuration flexible via le provider</span>
            <span>Compatibilité cross-browser garantie</span>
          </AnimatedList>
        </div>
      </section>
    </div>
  )
}

export default AnimationDemo