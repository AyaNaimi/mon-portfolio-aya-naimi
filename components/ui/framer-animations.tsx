"use client"

import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// Configuration d'animation similaire au timeline
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

const HOVER_CONFIG = {
  whileHover: { scale: 1.02, y: -5 },
  transition: { duration: 0.3 }
}

// Composant d'animation de base
interface BaseAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "left" | "right" | "up" | "down"
  duration?: number
  hover?: boolean
}

export function BaseAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  hover = false
}: BaseAnimationProps) {
  const getInitialAnimation = () => {
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

  const getWhileInViewAnimation = () => {
    switch (direction) {
      case "left":
      case "right":
        return { opacity: 1, x: 0, y: 0 }
      case "down":
      case "up":
      default:
        return { opacity: 1, y: 0, x: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialAnimation()}
      whileInView={getWhileInViewAnimation()}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration, 
        ease: "easeOut",
        delay 
      }}
      {...(hover && HOVER_CONFIG)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animations de texte
interface TextAnimationProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  delay?: number
  effect?: "fade" | "slide" | "typewriter"
}

export function TextAnimation({
  children,
  level = 2,
  className = "",
  delay = 0,
  effect = "fade"
}: TextAnimationProps) {
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

  if (effect === "typewriter") {
    return (
      <BaseAnimation delay={delay} className={className}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut", delay }}
          className="overflow-hidden whitespace-nowrap"
        >
          <Element className="inline-block">{children}</Element>
        </motion.div>
      </BaseAnimation>
    )
  }

  return (
    <BaseAnimation delay={delay} className={className}>
      <Element>{children}</Element>
    </BaseAnimation>
  )
}

// Animation de paragraphe
export function ParagraphAnimation({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <BaseAnimation delay={delay} className={className}>
      <p>{children}</p>
    </BaseAnimation>
  )
}

// Animation de liste
export function ListAnimation({
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
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.li
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4, ease: "easeOut" }
            }
          }}
        >
          {child}
        </motion.li>
      ))}
    </motion.ul>
  )
}

// Animation d'image
interface ImageAnimationProps {
  src: string
  alt: string
  className?: string
  delay?: number
  effect?: "fade" | "zoom" | "blur"
}

export function ImageAnimation({
  src,
  alt,
  className = "",
  delay = 0,
  effect = "fade"
}: ImageAnimationProps) {
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
    <BaseAnimation delay={delay} className={className}>
      <motion.img
        src={src}
        alt={alt}
        initial={animation.initial}
        whileInView={animation.whileInView}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        className="w-full h-full object-cover"
      />
    </BaseAnimation>
  )
}

// Animation de bouton
interface ButtonAnimationProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  delay?: number
  effect?: "scale" | "bounce" | "pulse"
  onClick?: () => void
}

export function ButtonAnimation({
  children,
  variant = "default",
  size = "default",
  className = "",
  delay = 0,
  effect = "scale",
  onClick
}: ButtonAnimationProps) {
  const getButtonAnimation = () => {
    switch (effect) {
      case "bounce":
        return {
          whileHover: { scale: 1.05, y: -2 },
          whileTap: { scale: 0.95 }
        }
      case "pulse":
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 }
        }
      case "scale":
      default:
        return {
          whileHover: { scale: 1.02, y: -2 },
          whileTap: { scale: 0.98 }
        }
    }
  }

  const buttonAnimation = getButtonAnimation()

  return (
    <BaseAnimation delay={delay} className={className} hover={false}>
      <motion.button
        className={`btn-${variant} btn-${size}`}
        onClick={onClick}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
        {...buttonAnimation}
      >
        {children}
      </motion.button>
    </BaseAnimation>
  )
}

// Animation de carte
interface CardAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  effect?: "lift" | "glow" | "shimmer"
}

export function CardAnimation({
  children,
  className = "",
  delay = 0,
  effect = "lift"
}: CardAnimationProps) {
  const getCardAnimation = () => {
    switch (effect) {
      case "glow":
        return {
          whileHover: { 
            scale: 1.02, 
            y: -5,
            boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
          }
        }
      case "shimmer":
        return {
          whileHover: { 
            scale: 1.01, 
            y: -3,
            transition: { duration: 0.3 }
          }
        }
      case "lift":
      default:
        return {
          whileHover: { 
            scale: 1.02, 
            y: -5,
            transition: { duration: 0.3 }
          }
        }
    }
  }

  const cardAnimation = getCardAnimation()

  return (
    <BaseAnimation delay={delay} className={className} hover={false}>
      <motion.div
        className={`card ${effect === "glow" ? "shadow-lg" : ""}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay }}
        {...cardAnimation}
      >
        {children}
      </motion.div>
    </BaseAnimation>
  )
}

// Animation de lien
interface LinkAnimationProps {
  children: React.ReactNode
  href: string
  className?: string
  delay?: number
  effect?: "underline" | "glow" | "scale"
}

export function LinkAnimation({
  children,
  href,
  className = "",
  delay = 0,
  effect = "underline"
}: LinkAnimationProps) {
  const getLinkAnimation = () => {
    switch (effect) {
      case "glow":
        return {
          whileHover: { 
            scale: 1.05,
            textShadow: "0 0 10px rgba(147, 51, 234, 0.5)"
          }
        }
      case "scale":
        return {
          whileHover: { scale: 1.05 }
        }
      case "underline":
      default:
        return {
          whileHover: { scale: 1.02 }
        }
    }
  }

  const linkAnimation = getLinkAnimation()

  return (
    <BaseAnimation delay={delay} className={className} hover={false}>
      <motion.a
        href={href}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
        {...linkAnimation}
      >
        {children}
      </motion.a>
    </BaseAnimation>
  )
}

// Animation de groupe avec cascade
interface GroupAnimationProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  direction?: "left" | "right" | "up" | "down"
}

export function GroupAnimation({
  children,
  className = "",
  staggerDelay = 0.1,
  direction = "up"
}: GroupAnimationProps) {
  const getDirectionAnimation = () => {
    switch (direction) {
      case "left":
        return { x: -50, opacity: 0 }
      case "right":
        return { x: 50, opacity: 0 }
      case "down":
        return { y: -50, opacity: 0 }
      case "up":
      default:
        return { y: 50, opacity: 0 }
    }
  }

  const initialAnimation = getDirectionAnimation()

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
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: initialAnimation,
            visible: { 
              x: 0, 
              y: 0, 
              opacity: 1,
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

// Effet de parallaxe
export function ParallaxAnimation({
  children,
  speed = 0.5,
  className = ""
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * speed])

  return (
    <motion.div
      className={className}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ y }}
    >
      {children}
    </motion.div>
  )
}

export default {
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
}