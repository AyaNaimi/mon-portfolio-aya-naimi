# Guide d'Animation Style Timeline

## Vue d'ensemble

Tous les éléments du site utilisent maintenant le même style d'animation que le timeline, garantissant une cohérence visuelle parfaite dans toute l'application.

## Style d'animation unifié

### Configuration de base
```javascript
{
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" }
}
```

### Effets de survol
```javascript
{
  whileHover: { scale: 1.02, y: -5 },
  transition: { duration: 0.3 }
}
```

## Utilisation des composants

### 1. Wrapper de base
```typescript
import { TimelineStyleWrapper } from "@/components/ui/timeline-style-wrapper"

// Appliquer le style timeline à n'importe quel élément
<TimelineStyleWrapper delay={0.2}>
  <div>Contenu animé</div>
</TimelineStyleWrapper>
```

### 2. Composants spécialisés

#### Titres
```typescript
import { TimelineTitle } from "@/components/ui/timeline-style-wrapper"

<TimelineTitle level={2} delay={0.1} gradient={true}>
  Mon Titre Animé
</TimelineTitle>
```

#### Paragraphes
```typescript
import { TimelineParagraph } from "@/components/ui/timeline-style-wrapper"

<TimelineParagraph delay={0.2}>
  Ce texte utilise le même style que le timeline.
</TimelineParagraph>
```

#### Cartes
```typescript
import { TimelineCard } from "@/components/ui/timeline-style-wrapper"

<TimelineCard delay={0.3} hover={true}>
  <div className="p-6">
    <h3>Titre de la carte</h3>
    <p>Contenu de la carte</p>
  </div>
</TimelineCard>
```

#### Images
```typescript
import { TimelineImage } from "@/components/ui/timeline-style-wrapper"

<TimelineImage
  src="/image.jpg"
  alt="Description"
  delay={0.2}
  effect="fade" // fade, zoom, blur
/>
```

#### Boutons
```typescript
import { TimelineButton } from "@/components/ui/timeline-style-wrapper"

<TimelineButton delay={0.4} variant="default" onClick={handleClick}>
  Cliquer ici
</TimelineButton>
```

#### Listes
```typescript
import { TimelineList } from "@/components/ui/timeline-style-wrapper"

<TimelineList staggerDelay={0.1}>
  <span>Élément 1</span>
  <span>Élément 2</span>
  <span>Élément 3</span>
</TimelineList>
```

#### Grilles
```typescript
import { TimelineGrid } from "@/components/ui/timeline-style-wrapper"

<TimelineGrid columns={3} staggerDelay={0.2}>
  <div>Élément 1</div>
  <div>Élément 2</div>
  <div>Élément 3</div>
  <div>Élément 4</div>
  <div>Élément 5</div>
  <div>Élément 6</div>
</TimelineGrid>
```

## Composants Framer Motion avancés

### Utilisation directe avec Framer Motion
```typescript
import { motion } from "framer-motion"
import { TIMELINE_ANIMATION_CONFIG } from "@/components/ui/framer-animations-index"

// Appliquer directement la configuration du timeline
<motion.div
  {...TIMELINE_ANIMATION_CONFIG}
  whileHover={{ scale: 1.02, y: -5 }}
>
  Contenu
</motion.div>
```

### Hook personnalisé
```typescript
import { useTimelineAnimation } from "@/components/ui/framer-animations-index"

function MyComponent() {
  const animationConfig = useTimelineAnimation({ delay: 0.3 })
  
  return (
    <motion.div {...animationConfig}>
      Contenu animé
    </motion.div>
  )
}
```

## Effets disponibles

### Directions d'animation
- `direction="up"` (défaut) - Depuis le bas
- `direction="down"` - Depuis le haut
- `direction="left"` - Depuis la droite
- `direction="right"` - Depuis la gauche

### Effets d'image
- `effect="fade"` (défaut) - Fondu simple
- `effect="zoom"` - Zoom depuis 110%
- `effect="blur"` - Déflouillage progressif

### Délais et durées
- `delay` - Délai avant l'animation (en secondes)
- `duration` - Durée de l'animation (0.6s par défaut)
- `staggerDelay` - Délai entre les éléments en groupe

## Exemple d'utilisation complète

```typescript
import { 
  TimelineSection,
  TimelineTitle, 
  TimelineParagraph,
  TimelineGrid,
  TimelineCard,
  TimelineButton 
} from "@/components/ui/timeline-style-wrapper"

export function MaSection() {
  return (
    <TimelineSection className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <TimelineTitle level={1} delay={0.1}>
          Ma Section Animée
        </TimelineTitle>
        
        <TimelineParagraph delay={0.2}>
          Tous les éléments utilisent le même style d'animation que le timeline.
        </TimelineParagraph>
        
        <TimelineGrid columns={3} staggerDelay={0.15}>
          {Array.from({ length: 6 }, (_, i) => (
            <TimelineCard key={i} delay={i * 0.1}>
              <h3>Carte {i + 1}</h3>
              <p>Contenu de la carte avec animation timeline</p>
              <TimelineButton delay={0.5}>
                Action
              </TimelineButton>
            </TimelineCard>
          ))}
        </TimelineGrid>
      </div>
    </TimelineSection>
  )
}
```

## Pages de démonstration

- **`/framer-animation-demo`** - Démonstration complète avec tous les composants
- **`/animation-demo`** - Démonstration du système Intersection Observer (version alternative)

## Avantages du style unifié

✅ **Cohérence visuelle** - Tous les éléments animent de la même façon  
✅ **Performance** - Configuration optimisée pour le scroll  
✅ **Accessibilité** - Respect des préférences utilisateur  
✅ **Facilité d'utilisation** - API simple et intuitive  
✅ **Flexibilité** - Paramètres personnalisables  
✅ **Maintenabilité** - Un seul point de configuration  

## Migration depuis l'ancien système

Si vous avez des éléments qui utilisent encore l'ancien système d'animation, remplacez-les par les nouveaux composants TimelineStyleWrapper :

```typescript
// Avant
<div className="fade-in-element" data-animation-type="text">
  Contenu
</div>

// Après
<TimelineStyleWrapper>
  <div>Contenu</div>
</TimelineStyleWrapper>
```

## Configuration avancée

Pour des besoins spécifiques, vous pouvez créer vos propres variantes :

```typescript
import { motion } from "framer-motion"
import { applyTimelineStyle } from "@/components/ui/framer-animations-index"

const customAnimation = applyTimelineStyle({
  custom: { opacity: 0, rotate: -5 },
  whileInView: { opacity: 1, rotate: 0 },
  transition: { duration: 0.8 }
})

<motion.div {...customAnimation}>
  Contenu avec animation personnalisée
</motion.div>
```

Le système garantit maintenant que tous les éléments de l'application utilisent exactement le même style d'animation que le timeline, pour une expérience utilisateur cohérente et professionnelle.