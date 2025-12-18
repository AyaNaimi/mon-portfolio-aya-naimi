// Export du système d'animation Framer Motion
// Utilise le même style que le timeline

// Composants principaux
export { 
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
} from './framer-animations'

// Configuration d'animation
export const TIMELINE_ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

export const HOVER_CONFIG = {
  whileHover: { scale: 1.02, y: -5 },
  transition: { duration: 0.3 }
}

// Utilitaires pour appliquer le style timeline
export const applyTimelineStyle = (motionProps: any = {}) => {
  return {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: "easeOut" },
    ...motionProps
  }
}

export const applyHoverStyle = (motionProps: any = {}) => {
  return {
    whileHover: { scale: 1.02, y: -5 },
    transition: { duration: 0.3 },
    ...motionProps
  }
}

// Hook pour utiliser le style timeline dans des composants personnalisés
export const useTimelineAnimation = (customConfig: any = {}) => {
  const baseConfig = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: "easeOut" },
    ...customConfig
  }

  return baseConfig
}