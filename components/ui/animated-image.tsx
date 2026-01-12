"use client"

import React from "react"
import { AdvancedScrollAnimation, ContentTypeConfig } from "./advanced-scroll-animations"

interface AnimatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  effect?: "fade" | "zoom" | "blur" | "slide" | "scale" | "rotate"
  delay?: number
  duration?: number
  placeholder?: string
  lazy?: boolean
  className?: string
}

export function AnimatedImage({
  src,
  alt,
  effect = "fade",
  delay = 0,
  duration,
  placeholder,
  lazy = true,
  className = "",
  ...props
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const imgRef = React.useRef<HTMLImageElement>(null)

  // Configuration personnalisée pour les images
  const customConfig = {
    duration: duration || 800,
    delay: delay,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  }

  const contentType: keyof ContentTypeConfig = "image"

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  return (
    <AdvancedScrollAnimation
      contentType={contentType}
      customConfig={customConfig}
      className={`animated-image-container ${className}`}
      data-effect={effect}
      {...props}
    >
      <div className="image-wrapper" style={{ position: "relative", overflow: "hidden" }}>
        {!isLoaded && !hasError && placeholder && (
          <img
            src={placeholder}
            alt=""
            className="placeholder-image"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(10px)",
              transform: "scale(1.1)"
            }}
          />
        )}
        
        {hasError ? (
          <div className="image-error" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f4f6",
            color: "#6b7280",
            minHeight: "200px"
          }}>
            <span>Image non disponible</span>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            loading={lazy ? "lazy" : "eager"}
            className={`animated-image ${isLoaded ? "loaded" : "loading"} ${effect}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: `opacity ${customConfig.duration}ms ${customConfig.easing}, transform ${customConfig.duration}ms ${customConfig.easing}`,
              opacity: isLoaded ? 1 : 0
            }}
            data-effect={effect}
          />
        )}
      </div>
    </AdvancedScrollAnimation>
  )
}

// Composant pour les images avec effet de parallaxe
interface ParallaxImageProps extends AnimatedImageProps {
  speed?: number
}

export function ParallaxImage({
  speed = 0.5,
  ...props
}: ParallaxImageProps) {
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return
      
      const rect = (document.querySelector(`[data-parallax-id="${props.alt}"]`) as HTMLElement)?.getBoundingClientRect()
      if (!rect) return

      const scrolled = window.pageYOffset
      const rate = scrolled * speed
      setOffset(rate)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, props.alt])

  return (
    <div 
      className="parallax-image-container"
      data-parallax-id={props.alt}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform"
      }}
    >
      <AnimatedImage {...props} effect="fade" />
    </div>
  )
}

// Composant pour les galeries d'images avec effet cascade
interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    placeholder?: string
  }[]
  effect?: "fade" | "zoom" | "slide"
  staggerDelay?: number
  className?: string
  columns?: 1 | 2 | 3 | 4
}

export function ImageGallery({
  images,
  effect = "fade",
  staggerDelay = 100,
  className = "",
  columns = 3
}: ImageGalleryProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4"
  }[columns]

  return (
    <div className={`image-gallery grid gap-4 ${gridClass} ${className}`}>
      {images.map((image, index) => (
        <AnimatedImage
          key={index}
          src={image.src}
          alt={image.alt}
          placeholder={image.placeholder}
          effect={effect}
          delay={index * staggerDelay}
          className="gallery-item"
        />
      ))}
    </div>
  )
}

// Composant pour les images avec lazy loading avancé
interface LazyImageProps extends AnimatedImageProps {
  threshold?: number
  rootMargin?: string
}

export function LazyImage({
  threshold = 0.1,
  rootMargin = "50px",
  ...props
}: LazyImageProps) {
  const [isInView, setIsInView] = React.useState(false)
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={imgRef}>
      {isInView && (
        <AnimatedImage {...props} />
      )}
    </div>
  )
}

export default AnimatedImage