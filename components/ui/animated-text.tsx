"use client"

import React from "react"
import { AdvancedScrollAnimation, ContentTypeConfig } from "./advanced-scroll-animations"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  type?: "heading" | "paragraph" | "span" | "div"
  effect?: "fade" | "typewriter" | "slide" | "scale"
  delay?: number
  duration?: number
  cascade?: boolean
  cascadeIndex?: number
  className?: string
}

export function AnimatedText({
  children,
  type = "div",
  effect = "fade",
  delay = 0,
  duration,
  cascade = false,
  cascadeIndex = 0,
  className = "",
  ...props
}: AnimatedTextProps) {
  // Configuration personnalisée pour le texte
  const customConfig = {
    duration: duration || 600,
    delay: cascade ? cascadeIndex * 100 : delay,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  }

  const contentType: keyof ContentTypeConfig = "text"

  const renderContent = () => {
    switch (type) {
      case "heading":
        return <h2>{children}</h2>
      case "paragraph":
        return <p>{children}</p>
      case "span":
        return <span>{children}</span>
      case "div":
      default:
        return <div>{children}</div>
    }
  }

  return (
    <AdvancedScrollAnimation
      contentType={contentType}
      customConfig={customConfig}
      className={`animated-text ${className}`}
      data-effect={effect}
      data-type={type}
      {...props}
    >
      {renderContent()}
    </AdvancedScrollAnimation>
  )
}

// Composants spécialisés pour différents types de texte
interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  effect?: "fade" | "typewriter" | "slide" | "scale"
  delay?: number
  cascade?: boolean
  cascadeIndex?: number
}

export function AnimatedHeading({
  level = 2,
  children,
  effect = "fade",
  delay,
  cascade,
  cascadeIndex,
  className = "",
  ...props
}: AnimatedHeadingProps) {
  const customConfig = {
    duration: level === 1 ? 800 : level === 2 ? 700 : 600,
    delay: cascade ? (cascadeIndex || 0) * 100 : delay || 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  }

  const renderHeading = () => {
    const headingProps = {
      className: `h${level}`,
      ...props
    }

    switch (level) {
      case 1:
        return <h1 {...headingProps}>{children}</h1>
      case 2:
        return <h2 {...headingProps}>{children}</h2>
      case 3:
        return <h3 {...headingProps}>{children}</h3>
      case 4:
        return <h4 {...headingProps}>{children}</h4>
      case 5:
        return <h5 {...headingProps}>{children}</h5>
      case 6:
        return <h6 {...headingProps}>{children}</h6>
      default:
        return <h2 {...headingProps}>{children}</h2>
    }
  }

  return (
    <AdvancedScrollAnimation
      contentType="text"
      customConfig={customConfig}
      className={`animated-heading ${className}`}
      data-effect={effect}
      data-heading-level={level}
      {...props}
    >
      {renderHeading()}
    </AdvancedScrollAnimation>
  )
}

interface AnimatedParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  effect?: "fade" | "typewriter" | "slide"
  delay?: number
  cascade?: boolean
  cascadeIndex?: number
}

export function AnimatedParagraph({
  children,
  effect = "fade",
  delay,
  cascade,
  cascadeIndex,
  className = "",
  ...props
}: AnimatedParagraphProps) {
  const customConfig = {
    duration: 600,
    delay: cascade ? (cascadeIndex || 0) * 150 : delay || 0,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  }

  return (
    <AdvancedScrollAnimation
      contentType="text"
      customConfig={customConfig}
      className={`animated-paragraph ${className}`}
      data-effect={effect}
      {...props}
    >
      <p>{children}</p>
    </AdvancedScrollAnimation>
  )
}

interface AnimatedListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode[]
  type?: "ul" | "ol"
  staggerDelay?: number
}

export function AnimatedList({
  children,
  type = "ul",
  staggerDelay = 100,
  className = "",
  ...props
}: AnimatedListProps) {
  return (
    <AdvancedScrollAnimation
      contentType="text"
      className={`animated-list ${className}`}
      {...props}
    >
      {React.createElement(type, {},
        React.Children.map(children, (child, index) => (
          <AnimatedText
            key={index}
            type="span"
            delay={index * staggerDelay}
            cascade={false}
          >
            {child}
          </AnimatedText>
        ))
      )}
    </AdvancedScrollAnimation>
  )
}

// Composant pour les textes avec effet machine à écrire
interface TypewriterTextProps extends React.HTMLAttributes<HTMLElement> {
  children: string
  speed?: number
  delay?: number
  cursor?: boolean
  cursorChar?: string
}

export function TypewriterText({
  children,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = "|",
  className = "",
  ...props
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isStarted, setIsStarted] = React.useState(false)

  React.useEffect(() => {
    if (!isStarted) return

    if (currentIndex < children.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + children[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, children, speed, isStarted])

  React.useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(startDelay)
  }, [delay])

  return (
    <AdvancedScrollAnimation
      contentType="text"
      customConfig={{ duration: Math.max(children.length * speed + delay, 1000) }}
      className={`typewriter-text ${className}`}
      data-effect="typewriter"
      skipAnimation={isStarted}
      {...props}
    >
      <span>
        {displayText}
        {cursor && <span className="typewriter-cursor">{cursorChar}</span>}
      </span>
    </AdvancedScrollAnimation>
  )
}

export default AnimatedText