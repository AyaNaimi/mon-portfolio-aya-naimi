// Export du système de titres stylés

export { 
  StyledTitle,
  TypewriterTitle,
  FlipTitle,
  WaveTitle,
  GeometricTitle
} from './styled-titles'

// Configuration des styles par niveau
export const TITLE_STYLES_CONFIG = {
  h1: {
    base: "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
    gradient: "bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400 bg-clip-text text-transparent",
    shadow: "drop-shadow-[0_10px_40px_rgba(147,51,234,0.3)]"
  },
  h2: {
    base: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    gradient: "bg-gradient-to-r from-violet-600 via-purple-500 to-pink-400 bg-clip-text text-transparent",
    shadow: "drop-shadow-[0_8px_30px_rgba(147,51,234,0.2)]"
  },
  h3: {
    base: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
    gradient: "bg-gradient-to-r from-blue-600 via-purple-500 to-violet-400 bg-clip-text text-transparent",
    shadow: "drop-shadow-[0_6px_20px_rgba(59,130,246,0.2)]"
  },
  h4: {
    base: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
    gradient: "bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-400 bg-clip-text text-transparent",
    shadow: "drop-shadow-[0_4px_15px_rgba(79,70,229,0.2)]"
  },
  h5: {
    base: "text-xl md:text-2xl lg:text-3xl font-bold tracking-tight",
    gradient: "bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent",
    shadow: "drop-shadow-[0_3px_10px_rgba(6,182,212,0.2)]"
  },
  h6: {
    base: "text-lg md:text-xl lg:text-2xl font-bold tracking-tight",
    gradient: "bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent",
    shadow: "drop-shadow-[0_2px_8px_rgba(13,148,136,0.2)]"
  }
}

// Effets prédéfinis
export const TITLE_EFFECTS = {
  basic: {
    gradient: true,
    shadow: true,
    shimmer: false,
    particles: false,
    glow: false
  },
  shimmer: {
    gradient: true,
    shadow: true,
    shimmer: true,
    particles: false,
    glow: false
  },
  glow: {
    gradient: true,
    shadow: true,
    shimmer: false,
    particles: false,
    glow: true
  },
  particles: {
    gradient: true,
    shadow: true,
    shimmer: false,
    particles: true,
    glow: false
  },
  massive: {
    gradient: true,
    shadow: true,
    shimmer: true,
    particles: true,
    glow: true
  }
}

// Utilitaires pour créer rapidement des titres
export const createTitle = (text: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 2, effect: keyof typeof TITLE_EFFECTS = 'basic') => {
  const effectConfig = TITLE_EFFECTS[effect]
  
  return {
    children: text,
    level,
    ...effectConfig
  }
}

// Hook pour obtenir les styles d'un titre
export const useTitleStyles = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  return TITLE_STYLES_CONFIG[`h${level}` as keyof typeof TITLE_STYLES_CONFIG]
}

// Configuration responsive
export const RESPONSIVE_SIZES = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl lg:text-5xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
  xl: "text-5xl md:text-6xl lg:text-7xl",
  "2xl": "text-6xl md:text-7xl lg:text-8xl"
}