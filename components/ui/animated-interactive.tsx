"use client"

import React from "react"
import { AdvancedScrollAnimation, ContentTypeConfig } from "./advanced-scroll-animations"
import { Button } from "./button"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  effect?: "fade" | "scale" | "bounce" | "slide" | "pulse"
  delay?: number
  duration?: number
  className?: string
}

export function AnimatedButton({
  children,
  variant = "default",
  size = "default",
  effect = "scale",
  delay = 0,
  duration,
  className = "",
  ...props
}: AnimatedButtonProps) {
  // Configuration personnalisée pour les boutons
  const customConfig = {
    duration: duration || 300,
    delay: delay,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  }

  const contentType: keyof ContentTypeConfig = "button"

  return (
    <AdvancedScrollAnimation
      contentType={contentType}
      customConfig={customConfig}
      className={`animated-interactive ${className}`}
      data-effect={effect}
      {...props}
    >
      <Button
        variant={variant}
        size={size}
        className={`animated-button ${effect}`}
        data-effect={effect}
      >
        {children}
      </Button>
    </AdvancedScrollAnimation>
  )
}

// Composant pour les liens animés
interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  effect?: "fade" | "underline" | "slide" | "scale" | "glow"
  delay?: number
  duration?: number
  className?: string
  underlineColor?: string
}

export function AnimatedLink({
  children,
  effect = "underline",
  delay = 0,
  duration,
  className = "",
  underlineColor = "currentColor",
  ...props
}: AnimatedLinkProps) {
  // Configuration personnalisée pour les liens
  const customConfig = {
    duration: duration || 400,
    delay: delay,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  }

  const contentType: keyof ContentTypeConfig = "interactive"

  return (
    <AdvancedScrollAnimation
      contentType={contentType}
      customConfig={customConfig}
      className={`animated-link-container ${className}`}
      data-effect={effect}
      {...props}
    >
      <a
        className={`animated-link ${effect}`}
        data-effect={effect}
        style={{
          "--underline-color": underlineColor
        } as React.CSSProperties}
      >
        {children}
      </a>
    </AdvancedScrollAnimation>
  )
}

// Composant pour les cartes interactives
interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  effect?: "fade" | "lift" | "flip" | "scale" | "glow"
  delay?: number
  duration?: number
  hoverEffect?: boolean
  className?: string
}

export function AnimatedCard({
  children,
  effect = "lift",
  delay = 0,
  duration,
  hoverEffect = true,
  className = "",
  ...props
}: AnimatedCardProps) {
  // Configuration personnalisée pour les cartes
  const customConfig = {
    duration: duration || 500,
    delay: delay,
    easing: "cubic-bezier(0.5, 0, 0, 1)"
  }

  const contentType: keyof ContentTypeConfig = "card"

  return (
    <AdvancedScrollAnimation
      contentType={contentType}
      customConfig={customConfig}
      className={`animated-card-container ${className}`}
      data-effect={effect}
      {...props}
    >
      <div
        className={`animated-card ${effect} ${hoverEffect ? "with-hover" : ""}`}
        data-effect={effect}
      >
        {children}
      </div>
    </AdvancedScrollAnimation>
  )
}

// Composant pour les groupes d'éléments interactifs
interface InteractiveGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[]
  type?: "buttons" | "links" | "cards" | "mixed"
  staggerDelay?: number
  effect?: "fade" | "slide" | "scale" | "cascade"
  className?: string
}

export function InteractiveGroup({
  children,
  type = "mixed",
  staggerDelay = 100,
  effect = "cascade",
  className = "",
  ...props
}: InteractiveGroupProps) {
  const getContentType = (index: number): keyof ContentTypeConfig => {
    if (type === "buttons") return "button"
    if (type === "cards") return "card"
    if (type === "links") return "interactive"
    return index % 3 === 0 ? "button" : index % 3 === 1 ? "card" : "interactive"
  }

  return (
    <div className={`interactive-group ${className}`} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const contentType = getContentType(index)
          const delay = effect === "cascade" ? index * staggerDelay : 0

          return React.cloneElement(child as React.ReactElement<any>, {
            key: index,
            ...(effect === "cascade" && {
              delay,
              cascade: true,
              cascadeIndex: index
            })
          })
        }
        return child
      })}
    </div>
  )
}

// Composant pour les éléments avec effet de survol avancé
interface HoverEffectProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  effect?: "glow" | "lift" | "tilt" | "focus" | "ripple"
  intensity?: "light" | "medium" | "strong"
  color?: string
  className?: string
}

export function HoverEffect({
  children,
  effect = "glow",
  intensity = "medium",
  color,
  className = "",
  ...props
}: HoverEffectProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const getIntensityValue = () => {
    switch (intensity) {
      case "light": return 0.5
      case "medium": return 1
      case "strong": return 1.5
      default: return 1
    }
  }

  return (
    <div
      className={`hover-effect-container ${effect} ${intensity} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        "--intensity": getIntensityValue(),
        "--hover-color": color || "currentColor"
      } as React.CSSProperties}
      {...props}
    >
      <div className="hover-effect-content" data-hovered={isHovered}>
        {children}
      </div>
      {effect === "ripple" && isHovered && (
        <div className="ripple-effect" />
      )}
    </div>
  )
}

// Composant pour les éléments avec micro-interactions
interface MicroInteractionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  type?: "click" | "hover" | "focus" | "scroll"
  effect?: "pulse" | "bounce" | "shake" | "spin" | "pulse-glow"
  duration?: number
  className?: string
}

export function MicroInteraction({
  children,
  type = "click",
  effect = "pulse",
  duration = 600,
  className = "",
  ...props
}: MicroInteractionProps) {
  const [isActive, setIsActive] = React.useState(false)

  const handleInteraction = () => {
    setIsActive(true)
    setTimeout(() => setIsActive(false), duration)
  }

  const getEventHandler = () => {
    switch (type) {
      case "click":
        return { onClick: handleInteraction }
      case "hover":
        return { onMouseEnter: handleInteraction }
      case "focus":
        return { onFocus: handleInteraction }
      case "scroll":
        return { onScroll: handleInteraction }
      default:
        return { onClick: handleInteraction }
    }
  }

  return (
    <div
      className={`micro-interaction ${type} ${effect} ${isActive ? "active" : ""} ${className}`}
      data-effect={effect}
      data-type={type}
      data-active={isActive}
      {...getEventHandler()}
      {...props}
    >
      {children}
    </div>
  )
}

export default {
  AnimatedButton,
  AnimatedLink,
  AnimatedCard,
  InteractiveGroup,
  HoverEffect,
  MicroInteraction
}