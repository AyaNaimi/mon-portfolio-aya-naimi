# Guide des Titres Stylés

## Vue d'ensemble

Le système de titres stylés offre une collection complète de composants pour créer des titres visuellement attrayants avec des animations fluides, en cohérence avec le style timeline.

## Composants disponibles

### 1. StyledTitle - Titre de base avec effets

```typescript
import { StyledTitle } from "@/components/ui/styled-titles"

<StyledTitle 
  level={1} 
  delay={0.1}
  effect="fade"
  gradient={true}
  shadow={true}
  shimmer={false}
  particles={false}
  glow={false}
>
  Mon Titre Stylé
</StyledTitle>
```

#### Props disponibles :
- `level` - Niveau du titre (1-6)
- `delay` - Délai d'animation en secondes
- `effect` - Type d'effet ("fade", "shimmer", "particles", "glow", "scale")
- `gradient` - Activer le dégradé de couleur
- `shadow` - Activer l'ombre portée
- `shimmer` - Effet de brillance animée
- `particles` - Particules flottantes
- `glow` - Effet de lueur avec survol
- `onClick` - Gestionnaire de clic

### 2. TypewriterTitle - Effet machine à écrire

```typescript
import { TypewriterTitle } from "@/components/ui/styled-titles"

<TypewriterTitle 
  level={2} 
  delay={0.2}
  speed={50}
  gradient={true}
>
  Titre avec Effet Typewriter
</TypewriterTitle>
```

#### Props :
- `speed` - Vitesse de frappe (ms par caractère)
- Animation automatique avec curseur clignotant

### 3. FlipTitle - Rotation 3D

```typescript
import { FlipTitle } from "@/components/ui/styled-titles"

<FlipTitle level={3} delay={0.3} gradient={true}>
  Titre avec Rotation 3D
</FlipTitle>
```

#### Effet :
- Rotation sur l'axe Y avec perspective 3D
- Durée : 0.8s

### 4. WaveTitle - Effet de vague

```typescript
import { WaveTitle } from "@/components/ui/styled-titles"

<WaveTitle level={2} delay={0.2} gradient={true}>
  Chaque Lettre Apparaît Séquentiellement
</WaveTitle>
```

#### Effet :
- Chaque caractère apparaît avec un délai échelonné
- Animation de bas en haut

### 5. GeometricTitle - Formes géométriques

```typescript
import { GeometricTitle } from "@/components/ui/styled-titles"

<GeometricTitle 
  level={3} 
  delay={0.2}
  shape="circle"
  gradient={true}
>
  Titre avec Forme
</GeometricTitle>
```

#### Formes disponibles :
- `circle` - Cercle
- `triangle` - Triangle
- `hexagon` - Hexagone
- `diamond` - Losange

## Styles prédéfinis

### Effets de base

```typescript
import { TITLE_EFFECTS } from "@/components/ui/styled-titles-index"

// Effet basique
const basicEffect = TITLE_EFFECTS.basic

// Effet shimmer
const shimmerEffect = TITLE_EFFECTS.shimmer

// Effet glow
const glowEffect = TITLE_EFFECTS.glow

// Effet particules
const particlesEffect = TITLE_EFFECTS.particles

// Effet massif (tous les effets)
const massiveEffect = TITLE_EFFECTS.massive
```

### Styles par niveau

```typescript
import { TITLE_STYLES_CONFIG } from "@/components/ui/styled-titles-index"

const h1Styles = TITLE_STYLES_CONFIG.h1
const h2Styles = TITLE_STYLES_CONFIG.h2
// etc.
```

## Utilisation avancée

### Créer un titre rapidement

```typescript
import { createTitle } from "@/components/ui/styled-titles-index"

const titleConfig = createTitle("Mon Titre", 2, "glow")
// Retourne : { children: "Mon Titre", level: 2, gradient: true, shadow: true, glow: true }
```

### Obtenir les styles d'un niveau

```typescript
import { useTitleStyles } from "@/components/ui/styled-titles-index"

const h1Styles = useTitleStyles(1)
// Retourne la configuration CSS pour h1
```

## Tailles responsives

### Classes CSS disponibles

```typescript
import { RESPONSIVE_SIZES } from "@/components/ui/styled-titles-index"

// Utilisation dans les classes
className={`${RESPONSIVE_SIZES.lg} font-bold`}
```

### Tailles disponibles :
- `sm` - text-2xl md:text-3xl
- `md` - text-3xl md:text-4xl lg:text-5xl
- `lg` - text-4xl md:text-5xl lg:text-6xl
- `xl` - text-5xl md:text-6xl lg:text-7xl
- `2xl` - text-6xl md:text-7xl lg:text-8xl

## Exemples d'utilisation

### 1. Titre de section principal

```typescript
<StyledTitle 
  level={1} 
  delay={0.1}
  effect="glow"
  gradient={true}
  glow={true}
  particles={true}
  className="title-massive"
>
  Bienvenue sur Notre Site
</StyledTitle>
```

### 2. Titre de sous-section

```typescript
<StyledTitle 
  level={2} 
  delay={0.2}
  effect="shimmer"
  gradient={true}
  shimmer={true}
>
  Nos Services
</StyledTitle>
```

### 3. Titre avec animation typewriter

```typescript
<TypewriterTitle 
  level={3} 
  delay={0.3}
  speed={80}
  gradient={true}
>
  Création d'Expériences Digitales
</TypewriterTitle>
```

### 4. Titre avec effet de vague

```typescript
<WaveTitle level={2} delay={0.2} gradient={false}>
  Innovation • Design • Performance
</WaveTitle>
```

### 5. Titre avec forme géométrique

```typescript
<div className="text-center">
  <GeometricTitle 
    level={4} 
    delay={0.4}
    shape="hexagon"
    gradient={true}
  >
    Portfolio
  </GeometricTitle>
</div>
```

## Styles CSS personnalisés

### Classes d'animation disponibles

```css
/* Animation de brillance */
.animate-shimmer

/* Effet de pulsation glow */
.glow-title

/* Animation de particules */
.particle-float

/* Effet typewriter */
.typewriter-text

/* Rotation 3D */
.preserve-3d
.backface-hidden

/* Effet de vague */
.wave-char

/* Gradient animé */
.animated-gradient

/* Effet néon */
.neon-title

/* Bounce */
.bounce-title

/* Glass morphisme */
.glass-title

/* Relief (emboss) */
.emboss-title

/* Contour (outline) */
.outline-title
```

### Formes géométriques

```css
/* Cercle */
.clip-circle

/* Triangle */
.clip-triangle

/* Hexagone */
.clip-hexagon

/* Losange */
.clip-diamond
```

## Intégration avec TimelineStyleWrapper

Tous les composants de titres utilisent automatiquement le style d'animation du timeline :

```typescript
import { TimelineTitle } from "@/components/ui/timeline-style-wrapper"

// Wrapper simplifié pour les titres
<TimelineTitle level={2} gradient={true}>
  Titre avec Style Timeline
</TimelineTitle>
```

## Pages de démonstration

- **`/styled-titles-demo`** - Démonstration complète de tous les styles
- **`/framer-animation-demo`** - Démonstration des animations générales
- **`/animation-demo`** - Démonstration du système Intersection Observer

## Performance et accessibilité

### Optimisations :
- Animations GPU-accélérées
- Lazy loading des effets complexes
- Respect des préférences `prefers-reduced-motion`
- Fallbacks pour navigateurs plus anciens

### Accessibilité :
- Support des lecteurs d'écran
- Respect du contraste des couleurs
- Animations désactivables
- Focus management

## Bonnes pratiques

### 1. Choisir le bon niveau
```typescript
// Page principale
<StyledTitle level={1}>Titre Principal</StyledTitle>

// Section
<StyledTitle level={2}>Titre de Section</StyledTitle>

// Sous-section
<StyledTitle level={3}>Titre de Sous-section</StyledTitle>
```

### 2. Respecter la hiérarchie
```typescript
// ✅ Bon
<StyledTitle level={1}>Titre Principal</StyledTitle>
<StyledTitle level={2}>Sous-titre</StyledTitle>

// ❌ Mauvais
<StyledTitle level={3}>Titre Principal</StyledTitle>
<StyledTitle level={1}>Sous-titre</StyledTitle>
```

### 3. Optimiser les performances
```typescript
// Pour les gros textes, éviter les effets lourds
<StyledTitle level={1} gradient={true} shimmer={false}>
  Titre Simple
</StyledTitle>

// Pour les effets complexes, utiliser avec parcimonie
<StyledTitle level={2} glow={true} particles={true}>
  Titre avec Effets
</StyledTitle>
```

## Configuration globale

Les styles sont automatiquement intégrés dans le layout via :
```css
@import "@/components/ui/styled-titles.css";
```

Aucun setup supplémentaire requis !

Le système garantit que tous vos titres utilisent des animations cohérentes et professionnelles, en parfaite harmonie avec le style timeline de l'application.