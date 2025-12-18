# Système d'Animation Avancé - Documentation Complète

## Vue d'ensemble

Le nouveau système d'animation implémente des animations CSS et JavaScript pour faire apparaître les éléments de manière fluide lors du scroll, optimisé avec l'Intersection Observer API selon les spécifications demandées.

## Caractéristiques principales

✅ **Animations CSS et JavaScript** - Combinaison optimisée pour de meilleures performances  
✅ **Intersection Observer API** - Remplace les event listeners pour une performance supérieure  
✅ **Durées variables selon le type de contenu** - Texte: 0.6s, Images: 0.8s, Éléments interactifs: 0.4s  
✅ **Délais d'apparition échelonnés** - Effets de cascade avec configuration flexible  
✅ **Compatibilité cross-browser** - Support pour tous les navigateurs modernes  
✅ **Options de configuration** - Personnalisation complète des durées et délais  
✅ **Accessibilité** - Support des préférences `prefers-reduced-motion`  
✅ **Optimisation des performances** - Évite les reflows inutiles  

## Installation et Configuration

### 1. Import du système

```typescript
// Import principal
import { AdvancedAnimationProvider } from "@/components/advanced-animation-provider"

// Import des composants
import { 
  AnimatedText, 
  AnimatedImage, 
  AnimatedButton,
  AnimatedCard,
  CascadeAnimation 
} from "@/components/ui/animations"
```

### 2. Configuration dans le layout

```typescript
// app/layout.tsx
import { AdvancedAnimationProvider } from "@/components/advanced-animation-provider"
import "@/components/ui/advanced-scroll-animations.css"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AdvancedAnimationProvider>
          {children}
        </AdvancedAnimationProvider>
      </body>
    </html>
  )
}
```

## Utilisation des Composants

### Animations de Texte

```typescript
import { AnimatedHeading, AnimatedParagraph, AnimatedText } from "@/components/ui/animations"

// Titre principal
<AnimatedHeading level={1} effect="fade" delay={100}>
  Mon Titre Animé
</AnimatedHeading>

// Paragraphe avec effet de glissement
<AnimatedParagraph effect="slide" delay={200}>
  Ce texte apparaît avec un effet de glissement fluide.
</AnimatedParagraph>

// Texte personnalisé
<AnimatedText type="span" effect="scale" delay={300}>
  Texte avec effet de mise à l'échelle
</AnimatedText>
```

### Animations d'Images

```typescript
import { AnimatedImage, ImageGallery } from "@/components/ui/animations"

// Image simple
<AnimatedImage
  src="/path/to/image.jpg"
  alt="Description"
  effect="blur"
  delay={100}
/>

// Galerie d'images avec cascade
<ImageGallery 
  images={[
    { src: "/img1.jpg", alt: "Image 1" },
    { src: "/img2.jpg", alt: "Image 2" },
    { src: "/img3.jpg", alt: "Image 3" }
  ]}
  effect="zoom"
  staggerDelay={150}
  columns={3}
/>
```

### Éléments Interactifs

```typescript
import { AnimatedButton, AnimatedLink, AnimatedCard } from "@/components/ui/animations"

// Bouton animé
<AnimatedButton effect="scale" delay={100}>
  Cliquer ici
</AnimatedButton>

// Lien avec effet de survol
<AnimatedLink effect="underline" delay={200}>
  En savoir plus
</AnimatedLink>

// Carte interactive
<AnimatedCard effect="lift" delay={300}>
  <div className="p-6">
    <h3>Titre de la carte</h3>
    <p>Contenu de la carte</p>
  </div>
</AnimatedCard>
```

### Effets de Cascade

```typescript
import { CascadeAnimation } from "@/components/ui/animations"

// Effet de cascade pour plusieurs éléments
<CascadeAnimation contentType="text" staggerDelay={100}>
  <div>Élément 1</div>
  <div>Élément 2</div>
  <div>Élément 3</div>
  <div>Élément 4</div>
  <div>Élément 5</div>
</CascadeAnimation>
```

## Configuration Avancée

### Personnalisation des Durées

```typescript
import { useAnimationConfig } from "@/components/ui/animations"

function MyComponent() {
  const { updateConfig } = useAnimationConfig()
  
  // Personnaliser la durée pour les textes
  updateConfig("text", { duration: 800 })
  
  // Personnaliser la durée pour les images
  updateConfig("image", { duration: 1200 })
}
```

### Préférences d'Accessibilité

```typescript
import { useAnimationPreferences } from "@/components/ui/animations"

function MyComponent() {
  const { toggleReducedMotion } = useAnimationPreferences()
  
  return (
    <button onClick={toggleReducedMotion}>
      Désactiver les animations
    </button>
  )
}
```

## Configuration des Effets

### Types d'effets disponibles

- **fade** - Apparition en fondu
- **slide** - Glissement depuis le bas
- **scale** - Mise à l'échelle (0.9 → 1)
- **blur** - Déflouillage progressif
- **zoom** - Zoom depuis 110% vers 100%
- **rotate** - Rotation légère
- **bounce** - Effet de rebond
- **pulse** - Pulsation

### Directions d'animation

- `data-direction="up"` - Depuis le bas
- `data-direction="down"` - Depuis le haut
- `data-direction="left"` - Depuis la droite
- `data-direction="right"` - Depuis la gauche
- `data-direction="scale"` - Mise à l'échelle

## Durées par Défaut

| Type de Contenu | Durée | Délai | Easing |
|----------------|-------|-------|---------|
| Texte | 600ms | 0ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Image | 800ms | 0ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Interactif | 400ms | 0ms | cubic-bezier(0.34, 1.56, 0.64, 1) |
| Carte | 500ms | 0ms | cubic-bezier(0.5, 0, 0, 1) |
| Bouton | 300ms | 0ms | cubic-bezier(0.4, 0, 0.2, 1) |

## Performance et Optimisations

### Utilisation de `will-change`

Tous les éléments animés utilisent `will-change: "opacity, transform"` pour optimiser les performances GPU.

### Intersection Observer

Le système utilise l'Intersection Observer API au lieu des event listeners de scroll, réduisant considérablement la charge CPU.

### Lazy Loading des Images

Les images supportent le lazy loading natif et les placeholders floutés.

### Prévention des Reflows

Les animations utilisent `transform` et `opacity` uniquement pour éviter les reflows du layout.

## Compatibilité Cross-Browser

### Navigateurs supportés

- ✅ Chrome 58+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 79+
- ✅ iOS Safari 12.1+
- ✅ Android Chrome 58+

### Fallbacks

- Support des navigateurs plus anciens avec `@supports`
- Graceful degradation pour les appareils à faible puissance
- Support des préférences `prefers-reduced-motion`

## Accessibilité

### Préférences utilisateur

Le système respecte automatiquement :
- `prefers-reduced-motion: reduce`
- Préférences stockées dans localStorage
- Option pour ignorer les animations

### Implementation WCAG

- Animations respectueuses des utilisateurs sensibles au mouvement
- Alternative sans animation disponible
- Focus management durante les animations

## Démonstration

Pour voir le système en action, consultez `/animation-demo` qui展示了 toutes les fonctionnalités disponibles.

## Migration depuis l'ancien système

L'ancien `ScrollRevealProvider` a été remplacé par `AdvancedAnimationProvider`. La migration est transparente et les composants existants continuent de fonctionner.

## API Reference

### AdvancedScrollAnimation

Props principales :
- `contentType` - Type de contenu ("text", "image", "interactive", "card", "button")
- `customConfig` - Configuration personnalisée
- `cascade` - Configuration de l'effet cascade
- `skipAnimation` - Ignorer l'animation (pour les tests)

### AnimationConfig

Configuration des animations :
- `duration` - Durée en millisecondes
- `delay` - Délai en millisecondes
- `easing` - Fonction d'accélération CSS
- `threshold` - Seuil d'intersection (0.0 - 1.0)
- `rootMargin` - Marge racine pour l'observer

## Conclusion

Ce système d'animation offre une solution complète et performante pour les animations de scroll, respectant toutes les spécifications demandées tout en maintenant une excellente compatibilité et accessibilité.