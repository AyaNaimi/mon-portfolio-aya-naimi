"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

export interface AnimationConfig {
  duration: number
  delay: number
  easing: string
  threshold?: number
  rootMargin?: string
}

export interface ContentTypeConfig {
  text: AnimationConfig
  image: AnimationConfig
  interactive: AnimationConfig
  card: AnimationConfig
  button: AnimationConfig
}

export interface CascadeConfig {
  enabled: boolean
  delayIncrement: number
  maxDelay: number
}

export interface AdvancedScrollAnimationProps {
  children: React.ReactNode
  contentType?: keyof ContentTypeConfig
  cascade?: CascadeConfig
  customConfig?: Partial<AnimationConfig>
  className?: string
  once?: boolean
  skipAnimation?: boolean
}

export const DEFAULT_ANIMATION_CONFIG: ContentTypeConfig = {
  text: {
    duration: 600,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  },
  image: {
    duration: 800,
    delay: 0,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px"
  },
  interactive: {
    duration: 400,
    delay: 0,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    threshold: 0.15,
    rootMargin: "0px 0px -20px 0px"
  },
  card: {
    duration: 500,
    delay: 0,
    easing: "cubic-bezier(0.5, 0, 0, 1)",
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  },
  button: {
    duration: 300,
    delay: 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    threshold: 0.2,
    rootMargin: "0px 0px -10px 0px"
  }
}

export const CASCADE_CONFIG: CascadeConfig = {
  enabled: true,
  delayIncrement: 100,
  maxDelay: 2000
}

// Utilitaires pour l'accessibilité et les préférences utilisateur
export const getReducedMotionPreference = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export const getUserAnimationPreference = (): boolean => {
  if (typeof window === "undefined") return false
  try {
    const preference = localStorage.getItem("animation-preference")
    return preference === "reduced"
  } catch {
    return false
  }
}

export const shouldSkipAnimation = (): boolean => {
  return getReducedMotionPreference() || getUserAnimationPreference()
}

// Hook principal pour les animations de scroll
export const useAdvancedScrollAnimation = (
  contentType: keyof ContentTypeConfig = "text",
  cascade?: CascadeConfig,
  customConfig?: Partial<AnimationConfig>,
  once: boolean = true
) => {
  const [isVisible, setIsVisible] = useState(false)
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Configuration finale fusionnée
  const finalConfig = {
    ...DEFAULT_ANIMATION_CONFIG[contentType],
    ...customConfig
  }

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      
      if (entry.isIntersecting) {
        setIsVisible(true)
        if (once && observerRef.current) {
          observerRef.current.disconnect()
        }
      } else if (!once) {
        setIsVisible(false)
      }
    },
    [once]
  )

  useEffect(() => {
    if (!elementRef || shouldSkipAnimation()) {
      setIsVisible(true) // Afficher immédiatement si les animations sont désactivées
      return
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: finalConfig.threshold,
      rootMargin: finalConfig.rootMargin
    })

    observerRef.current.observe(elementRef)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [elementRef, handleIntersection, finalConfig.threshold, finalConfig.rootMargin])

  return {
    ref: setElementRef,
    isVisible,
    config: finalConfig
  }
}

// Composant principal
export function AdvancedScrollAnimation({
  children,
  contentType = "text",
  cascade,
  customConfig,
  className = "",
  once = true,
  skipAnimation
}: AdvancedScrollAnimationProps) {
  const { ref, isVisible, config } = useAdvancedScrollAnimation(
    contentType,
    cascade,
    customConfig,
    once
  )

  const skipAnimations = skipAnimation || shouldSkipAnimation()

  // Si les animations sont désactivées, rendre directement
  if (skipAnimations) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  // Styles CSS pour l'animation
  const animationStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0px)" : "translateY(20px)",
    transition: `opacity ${config.duration}ms ${config.easing}, transform ${config.duration}ms ${config.easing}`,
    willChange: "opacity, transform"
  }

  return (
    <div 
      ref={ref}
      style={animationStyles}
      className={`fade-in-element ${isVisible ? 'is-visible' : 'is-hidden'} ${className}`}
      data-animation-type={contentType}
      data-duration={config.duration}
      data-delay={config.delay}
    >
      {children}
    </div>
  )
}

// Composant pour les effets de cascade
interface CascadeAnimationProps {
  children: React.ReactNode[]
  contentType?: keyof ContentTypeConfig
  className?: string
  staggerDelay?: number
}

export function CascadeAnimation({
  children,
  contentType = "text",
  className = "",
  staggerDelay = CASCADE_CONFIG.delayIncrement
}: CascadeAnimationProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  return (
    <div className={`cascade-container ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            key: index,
            style: {
              ...(typeof (child as any).props?.style === 'object' ? (child as any).props.style : {}),
              animationDelay: `${index * staggerDelay}ms`
            },
            className: `${typeof (child as any).props?.className === 'string' ? (child as any).props.className : ''} cascade-item`
          })
        }
        return child
      })}
    </div>
  )
}

// Hook pour gérer les préférences d'animation
export const useAnimationPreferences = () => {
  const [preferences, setPreferences] = useState({
    reducedMotion: shouldSkipAnimation(),
    customDuration: DEFAULT_ANIMATION_CONFIG.text.duration,
    customDelay: DEFAULT_ANIMATION_CONFIG.text.delay
  })

  const updatePreferences = useCallback((newPreferences: Partial<typeof preferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }))
    
    // Sauvegarder dans localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("animation-preferences", JSON.stringify({ ...preferences, ...newPreferences }))
      } catch (error) {
        console.warn("Impossible de sauvegarder les préférences d'animation:", error)
      }
    }
  }, [preferences])

  const toggleReducedMotion = useCallback(() => {
    const newValue = !preferences.reducedMotion
    updatePreferences({ reducedMotion: newValue })
    
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("animation-preference", newValue ? "reduced" : "normal")
      } catch (error) {
        console.warn("Impossible de sauvegarder la préférence d'animation:", error)
      }
    }
  }, [preferences.reducedMotion, updatePreferences])

  return {
    preferences,
    updatePreferences,
    toggleReducedMotion
  }
}

export default AdvancedScrollAnimation