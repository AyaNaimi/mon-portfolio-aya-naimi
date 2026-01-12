"use client"

import React from "react"
import { motion } from "framer-motion"

// Wrapper pour appliquer le style d'animation du timeline à n'importe quel élément
interface TimelineStyleWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  hover?: boolean
  customHover?: any
  onClick?: () => void
}

// Composant wrapper principal
export function TimelineStyleWrapper({
  children,
  className = "",
  delay = 0,
  direction = "up",
  hover = false,
  customHover,
  onClick
}: TimelineStyleWrapperProps) {
  const getDirectionAnimation = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -50, y: 0 }
      case "right":
        return { opacity: 0, x: 50, y: 0 }
      case "down":
        return { opacity: 0, y: -50 }
      case "up":
      default:
        return { opacity: 0, y: 50 }
    }
  }

  const getHoverAnimation = () => {
    if (customHover) return customHover
    if (hover) {
      return {
        whileHover: { scale: 1.02, y: -5 },
        transition: { duration: 0.3 }
      }
    }
    return {}
  }

  return (
    <motion.div
      className={className}
      initial={getDirectionAnimation()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      {...getHoverAnimation()}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Composants spécialisés pour différents types d'éléments

// Wrapper pour les sections
export function TimelineSection({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <TimelineStyleWrapper
      className={`timeline-section ${className}`}
      delay={delay}
    >
      {children}
    </TimelineStyleWrapper>
  )
}

// Wrapper pour les cartes
export function TimelineCard({
  children,
  className = "",
  delay = 0,
  hover = true
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}) {
  return (
    <TimelineStyleWrapper
      className={`timeline-card bg-card/90 backdrop-blur-md border border-purple-500/30 rounded-lg ${className}`}
      delay={delay}
      hover={hover}
    >
      {children}
    </TimelineStyleWrapper>
  )
}

// Wrapper pour les titres
export function TimelineTitle({
  children,
  level = 2,
  className = "",
  delay = 0,
  gradient = true
}: {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  delay?: number
  gradient?: boolean
}) {
  const getElement = () => {
    switch (level) {
      case 1: return "h1"
      case 2: return "h2"
      case 3: return "h3"
      case 4: return "h4"
      case 5: return "h5"
      case 6: return "h6"
      default: return "h2"
    }
  }

  const Element = getElement()

  return (
    <TimelineStyleWrapper delay={delay}>
      <Element className={`${gradient ? "bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent" : ""} ${className}`}>
        {children}
      </Element>
    </TimelineStyleWrapper>
  )
}

// Wrapper pour les paragraphes
export function TimelineParagraph({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <TimelineStyleWrapper delay={delay}>
      <p className={`text-muted-foreground leading-relaxed ${className}`}>
        {children}
      </p>
    </TimelineStyleWrapper>
  )
}

// Wrapper pour les images
export function TimelineImage({
  src,
  alt,
  className = "",
  delay = 0,
  effect = "fade"
}: {
  src: string
  alt: string
  className?: string
  delay?: number
  effect?: "fade" | "zoom" | "blur"
}) {
  const getImageAnimation = () => {
    switch (effect) {
      case "zoom":
        return {
          initial: { opacity: 0, scale: 1.1 },
          whileInView: { opacity: 1, scale: 1 }
        }
      case "blur":
        return {
          initial: { opacity: 0, filter: "blur(10px)" },
          whileInView: { opacity: 1, filter: "blur(0px)" }
        }
      case "fade":
      default:
        return {
          initial: { opacity: 0, y: 50 },
          whileInView: { opacity: 1, y: 0 }
        }
    }
  }

  const animation = getImageAnimation()

  return (
    <TimelineStyleWrapper delay={delay} customHover={undefined}>
      <motion.img
        src={src}
        alt={alt}
        initial={animation.initial}
        whileInView={animation.whileInView}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        className={`w-full h-full object-cover rounded-lg ${className}`}
      />
    </TimelineStyleWrapper>
  )
}

// Wrapper pour les boutons
export function TimelineButton({
  children,
  variant = "default",
  className = "",
  delay = 0,
  onClick
}: {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline" | "ghost"
  className?: string
  delay?: number
  onClick?: () => void
}) {
  return (
    <TimelineStyleWrapper
      delay={delay}
      hover={true}
      customHover={{
        whileHover: { scale: 1.02, y: -2 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
    >
      <button className={`btn-${variant} px-6 py-3 rounded-lg font-medium transition-all duration-300 ${className}`}>
        {children}
      </button>
    </TimelineStyleWrapper>
  )
}

// Wrapper pour les listes
export function TimelineList({
  children,
  className = "",
  staggerDelay = 0.1
}: {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
}) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={`timeline-list space-y-3 ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <motion.li
          key={index}
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.5, ease: "easeOut" }
            }
          }}
        >
          {child}
        </motion.li>
      ))}
    </motion.ul>
  )
}

// Wrapper pour les grilles
export function TimelineGrid({
  children,
  className = "",
  columns = 3,
  staggerDelay = 0.1
}: {
  children: React.ReactNode[]
  className?: string
  columns?: 1 | 2 | 3 | 4
  staggerDelay?: number
}) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4"
  }[columns]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={`timeline-grid grid ${gridClass} gap-6 ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default {
  TimelineStyleWrapper,
  TimelineSection,
  TimelineCard,
  TimelineTitle,
  TimelineParagraph,
  TimelineImage,
  TimelineButton,
  TimelineList,
  TimelineGrid
}