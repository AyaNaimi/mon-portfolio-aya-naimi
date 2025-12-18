// Export principal du système d'animation avancé
// Ce fichier centralise toutes les exports pour faciliter l'utilisation

// Composants principaux
export { default as AdvancedScrollAnimation } from './advanced-scroll-animations'
export { 
  CascadeAnimation, 
  useAdvancedScrollAnimation, 
  useAnimationPreferences,
  DEFAULT_ANIMATION_CONFIG,
  CASCADE_CONFIG,
  shouldSkipAnimation
} from './advanced-scroll-animations'

// Composants de texte
export { 
  AnimatedText,
  AnimatedHeading,
  AnimatedParagraph,
  AnimatedList,
  TypewriterText
} from './animated-text'

// Composants d'images
export { 
  AnimatedImage,
  ParallaxImage,
  ImageGallery,
  LazyImage
} from './animated-image'

// Composants interactifs
export {
  AnimatedButton,
  AnimatedLink,
  AnimatedCard,
  InteractiveGroup,
  HoverEffect,
  MicroInteraction
} from './animated-interactive'

// Configuration et provider
export {
  AnimationConfigProvider,
  useAnimationConfig,
  AnimationSettings
} from './animation-config-provider'

// Démonstration
export { AnimationDemo } from './animation-demo'

// Types
export type {
  AnimationConfig,
  ContentTypeConfig,
  CascadeConfig,
  AdvancedScrollAnimationProps
} from './advanced-scroll-animations'

// Utilitaires
export {
  getReducedMotionPreference,
  getUserAnimationPreference
} from './advanced-scroll-animations'

// CSS
import './advanced-scroll-animations.css'