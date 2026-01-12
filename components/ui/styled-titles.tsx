"use client"

import React from "react"
import { motion } from "framer-motion"
import { TimelineStyleWrapper } from "./timeline-style-wrapper"

// Styles avancés pour les grands titres
const TITLE_STYLES = {
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

// Effets de brillance animés
const ShimmerEffect = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    {children}
    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer" />
  </div>
)

// Effet de particules flottantes
const FloatingParticles = ({ count = 5 }: { count?: number }) => (
  <div className="absolute inset-0 pointer-events-none">
    {Array.from({ length: count }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
        initial={{
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          scale: 0
        }}
        animate={{
          y: [null, "-20px", "20px"],
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut"
        }}
        style={{
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%"
        }}
      />
    ))}
  </div>
)

// Composant de titre principal avec effets avancés
interface StyledTitleProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  delay?: number
  effect?: "fade" | "shimmer" | "particles" | "glow" | "scale"
  gradient?: boolean
  shadow?: boolean
  shimmer?: boolean
  particles?: boolean
  glow?: boolean
  onClick?: () => void
}

export function StyledTitle({
  children,
  level = 2,
  className = "",
  delay = 0,
  effect = "fade",
  gradient = true,
  shadow = true,
  shimmer = false,
  particles = false,
  glow = false,
  onClick
}: StyledTitleProps) {
  const styles = TITLE_STYLES[`h${level}` as keyof typeof TITLE_STYLES]
  
  const getTitleContent = () => {
    let content = (
      <span className={`
        ${styles.base}
        ${gradient ? styles.gradient : "text-foreground"}
        ${shadow ? styles.shadow : ""}
        ${className}
      `}>
        {children}
      </span>
    )

    if (shimmer) {
      content = <ShimmerEffect>{content}</ShimmerEffect>
    }

    if (glow) {
      content = (
        <div className="relative">
          {content}
          <div className={`
            absolute inset-0 ${styles.gradient}
            blur-xl opacity-30 scale-110 -z-10
          `} />
        </div>
      )
    }

    if (particles) {
      content = (
        <div className="relative">
          {content}
          <FloatingParticles />
        </div>
      )
    }

    return content
  }

  return (
    <TimelineStyleWrapper
      delay={delay}
      hover={glow}
      customHover={glow ? {
        whileHover: { 
          scale: 1.02, 
          y: -5,
          transition: { duration: 0.3 }
        }
      } : undefined}
      onClick={onClick}
      className={`
        ${effect === "scale" ? "cursor-pointer" : ""}
        ${glow ? "group" : ""}
      `}
    >
      {getTitleContent()}
    </TimelineStyleWrapper>
  )
}

// Titre avec animation de typing
interface TypewriterTitleProps {
  children: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  delay?: number
  speed?: number
  gradient?: boolean
}

export function TypewriterTitle({
  children,
  level = 2,
  className = "",
  delay = 0,
  speed = 50,
  gradient = true
}: TypewriterTitleProps) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (currentIndex < children.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + children[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, children, speed])

  const styles = TITLE_STYLES[`h${level}` as keyof typeof TITLE_STYLES]

  return (
    <TimelineStyleWrapper delay={delay}>
      <h2 className={`
        ${styles.base}
        ${gradient ? styles.gradient : "text-foreground"}
        ${styles.shadow}
        overflow-hidden whitespace-nowrap border-r-2 border-current
        ${currentIndex >= children.length ? "border-r-0" : "animate-pulse"}
        ${className}
      `}>
        {displayText}
        {currentIndex < children.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        )}
      </h2>
    </TimelineStyleWrapper>
  )
}

// Titre avec effet de rotation 3D
interface FlipTitleProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  delay?: number
  gradient?: boolean
}

export function FlipTitle({
  children,
  level = 2,
  className = "",
  delay = 0,
  gradient = true
}: FlipTitleProps) {
  const styles = TITLE_STYLES[`h${level}` as keyof typeof TITLE_STYLES]

  return (
    <TimelineStyleWrapper delay={delay}>
      <div className="relative w-full h-full">
        <motion.div
          className={`
            ${styles.base}
            ${gradient ? styles.gradient : "text-foreground"}
            ${styles.shadow}
            preserve-3d backface-hidden
          `}
          initial={{ rotateY: -90, opacity: 0 }}
          whileInView={{ rotateY: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay }}
        >
          {children}
        </motion.div>
      </div>
    </TimelineStyleWrapper>
  )
}

// Titre avec effet de vague
interface WaveTitleProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  delay?: number
  gradient?: boolean
}

export function WaveTitle({
  children,
  level = 2,
  className = "",
  delay = 0,
  gradient = true
}: WaveTitleProps) {
  const styles = TITLE_STYLES[`h${level}` as keyof typeof TITLE_STYLES]

  return (
    <TimelineStyleWrapper delay={delay}>
      <div className="overflow-hidden">
        {React.Children.map(children, (child, index) => (
          <motion.span
            key={index}
            className={`
              inline-block
              ${styles.base}
              ${gradient ? styles.gradient : "text-foreground"}
              ${styles.shadow}
            `}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut", 
              delay: delay + index * 0.1 
            }}
          >
            {child}
            {index < React.Children.count(children) - 1 ? " " : ""}
          </motion.span>
        ))}
      </div>
    </TimelineStyleWrapper>
  )
}

// Titre avec背景 de forme géométrique
interface GeometricTitleProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  delay?: number
  shape?: "circle" | "triangle" | "hexagon" | "diamond"
  gradient?: boolean
}

export function GeometricTitle({
  children,
  level = 2,
  className = "",
  delay = 0,
  shape = "circle",
  gradient = true
}: GeometricTitleProps) {
  const styles = TITLE_STYLES[`h${level}` as keyof typeof TITLE_STYLES]

  const getShapeClass = () => {
    switch (shape) {
      case "triangle":
        return "clip-triangle"
      case "hexagon":
        return "clip-hexagon"
      case "diamond":
        return "clip-diamond"
      case "circle":
      default:
        return "clip-circle"
    }
  }

  return (
    <TimelineStyleWrapper delay={delay}>
      <div className="relative inline-block">
        {/* Forme de fond */}
        <motion.div
          className={`
            absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-pink-500/20
            ${getShapeClass()} -z-10
          `}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.2 }}
        />
        
        {/* Titre */}
        <h2 className={`
          ${styles.base}
          ${gradient ? styles.gradient : "text-foreground"}
          ${styles.shadow}
          relative z-10
        `}>
          {children}
        </h2>
      </div>
    </TimelineStyleWrapper>
  )
}

export default {
  StyledTitle,
  TypewriterTitle,
  FlipTitle,
  WaveTitle,
  GeometricTitle
}