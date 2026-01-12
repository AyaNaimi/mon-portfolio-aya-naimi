"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import './cloud-animations.css'

interface DynamicIconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
  size?: number
  interactive?: boolean
  autoRotate?: boolean
  density?: 'low' | 'medium' | 'high'
}

interface IconPosition {
  x: number
  y: number
  z: number
  id: number
  originalX: number
  originalY: number
  scale: number
  opacity: number
  angle: number
  targetAngle: number
}

export function DynamicIconCloud({ 
  icons, 
  images, 
  size = 400, 
  interactive = true, 
  autoRotate = true,
  density = 'medium'
}: DynamicIconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  
  const [iconPositions, setIconPositions] = useState<IconPosition[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  // Configuration based on density and screen size
  const getIconCount = useCallback(() => {
    const baseCount = density === 'low' ? 12 : density === 'high' ? 24 : 16
    return Math.min(baseCount, Math.floor(size / 30))
  }, [density, size])

  const getLayout = useCallback(() => {
    if (size < 300) return 'grid'
    if (size < 500) return 'circle'
    return 'spiral'
  }, [size])

  // Generate adaptive icon positions
  const generatePositions = useCallback(() => {
    const items = icons || images || []
    const count = Math.min(getIconCount(), items.length)
    const layout = getLayout()
    const positions: IconPosition[] = []
    const centerX = size / 2
    const centerY = size / 2
    const maxRadius = size * 0.35

    for (let i = 0; i < count; i++) {
      let x, y, z = 0

      switch (layout) {
        case 'grid':
          const gridSize = Math.ceil(Math.sqrt(count))
          const cellSize = (maxRadius * 2) / gridSize
          const gridX = i % gridSize
          const gridY = Math.floor(i / gridSize)
          x = centerX - maxRadius + gridX * cellSize + cellSize / 2
          y = centerY - maxRadius + gridY * cellSize + cellSize / 2
          break

        case 'circle':
          const angle = (i / count) * Math.PI * 2
          const radius = maxRadius * 0.7
          x = centerX + Math.cos(angle) * radius
          y = centerY + Math.sin(angle) * radius
          z = Math.sin(angle * 2) * 20
          break

        case 'spiral':
          const spiralAngle = i * 0.5
          const spiralRadius = (i / count) * maxRadius
          x = centerX + Math.cos(spiralAngle) * spiralRadius
          y = centerY + Math.sin(spiralAngle) * spiralRadius
          z = Math.sin(spiralAngle * 3) * 30
          break
      }

      positions.push({
        x,
        y,
        z,
        id: i,
        originalX: x,
        originalY: y,
        scale: 1,
        opacity: 1,
        angle: 0,
        targetAngle: 0
      })
    }

    return positions
  }, [icons, images, getIconCount, getLayout, size])

  // Mouse interaction handlers
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePos({ x, y })

    if (interactive && isHovered) {
      setIconPositions(prev => prev.map(icon => {
        const dx = x - icon.x
        const dy = y - icon.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influenceRadius = size * 0.15
        
        if (distance < influenceRadius) {
          const force = (influenceRadius - distance) / influenceRadius
          const pushX = (dx / distance) * force * 20
          const pushY = (dy / distance) * force * 20
          
          return {
            ...icon,
            x: icon.originalX + pushX,
            y: icon.originalY + pushY,
            scale: 1 + force * 0.3,
            opacity: 1 - force * 0.3
          }
        }
        
        return {
          ...icon,
          x: icon.originalX,
          y: icon.originalY,
          scale: 1,
          opacity: 1
        }
      }))
    }
  }, [interactive, isHovered, size])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setHoveredIcon(null)
    setIconPositions(prev => prev.map(icon => ({
      ...icon,
      x: icon.originalX,
      y: icon.originalY,
      scale: 1,
      opacity: 1
    })))
  }, [])

  // Initialize positions
  useEffect(() => {
    const positions = generatePositions()
    setIconPositions(positions)
  }, [generatePositions])

  // Enhanced animation loop with performance optimization
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let lastTime = 0
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      if (deltaTime < 16) { // Limit to 60fps
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      ctx.clearRect(0, 0, size, size)

      // Smooth auto-rotation with easing
      if (autoRotate && !isDragging) {
        setRotation(prev => {
          const targetRotation = prev + 0.003
          return targetRotation + (targetRotation - prev) * 0.05
        })
      }

      // Update icon positions with spring physics
      setIconPositions(prev => prev.map(icon => ({
        ...icon,
        x: icon.x + (icon.originalX - icon.x) * 0.15,
        y: icon.y + (icon.originalY - icon.y) * 0.15,
        scale: icon.scale + (1 - icon.scale) * 0.2,
        opacity: icon.opacity + (1 - icon.opacity) * 0.1
      })))

      // Render enhanced background effects
      const centerX = size / 2
      const centerY = size / 2
      
      // Draw rotating gradient rings
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation * 0.3)
      
      for (let i = 0; i < 3; i++) {
        const radius = size * 0.2 + i * size * 0.1
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - i * 0.02})`
        ctx.lineWidth = 2
        ctx.setLineDash([10, 10])
        ctx.lineDashOffset = -rotation * 10 * (i + 1)
        ctx.stroke()
      }
      ctx.setLineDash([])
      ctx.restore()

      // Render icons with enhanced effects
      iconPositions.forEach((icon, index) => {
        const iconSize = 28 * icon.scale
        
        // Enhanced glow effect for hovered icon
        if (hoveredIcon === icon.id) {
          const glowRadius = iconSize * (1.5 + Math.sin(currentTime * 0.01) * 0.2)
          const gradient = ctx.createRadialGradient(
            icon.x, icon.y, iconSize * 0.5,
            icon.x, icon.y, glowRadius
          )
          gradient.addColorStop(0, `rgba(59, 130, 246, ${icon.opacity * 0.4})`)
          gradient.addColorStop(1, `rgba(59, 130, 246, 0)`)
          
          ctx.beginPath()
          ctx.arc(icon.x, icon.y, glowRadius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Draw pulsating background
        const pulseScale = 1 + Math.sin(currentTime * 0.005 + index) * 0.05
        ctx.beginPath()
        ctx.arc(icon.x, icon.y, iconSize * pulseScale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${icon.opacity * 0.15})`
        ctx.fill()

        // Draw main circle with enhanced styling
        ctx.beginPath()
        ctx.arc(icon.x, icon.y, iconSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${icon.opacity * 0.25})`
        ctx.fill()
        
        // Enhanced border with gradient
        const borderGradient = ctx.createLinearGradient(
          icon.x - iconSize, icon.y - iconSize,
          icon.x + iconSize, icon.y + iconSize
        )
        borderGradient.addColorStop(0, `rgba(59, 130, 246, ${icon.opacity * 0.6})`)
        borderGradient.addColorStop(0.5, `rgba(147, 51, 234, ${icon.opacity * 0.6})`)
        borderGradient.addColorStop(1, `rgba(236, 72, 153, ${icon.opacity * 0.6})`)
        
        ctx.strokeStyle = borderGradient
        ctx.lineWidth = hoveredIcon === icon.id ? 2 : 1
        ctx.stroke()

        // Add dynamic shadow based on rotation
        ctx.shadowColor = `rgba(0, 0, 0, ${icon.opacity * 0.2})`
        ctx.shadowBlur = hoveredIcon === icon.id ? 15 : 8
        ctx.shadowOffsetX = Math.sin(rotation + index) * 3
        ctx.shadowOffsetY = Math.cos(rotation + index) * 3
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [iconPositions, rotation, hoveredIcon, autoRotate, isDragging, size])

  const items = icons || images || []
  const layout = getLayout()

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center cursor-pointer select-none cloud-container cloud-interactive will-change-transform"
      style={{ 
        width: size, 
        height: size,
        transform: `scale(${scale})`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="absolute inset-0"
      />
      
      {/* Center glow effect */}
      <div 
        className="absolute rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse"
        style={{
          width: size * 0.4,
          height: size * 0.4,
          transform: `scale(${1 + Math.sin(Date.now() * 0.003) * 0.1})`,
        }}
      />

      {/* Enhanced interactive icons overlay */}
      <div className="relative z-10">
        <div 
          className="relative flex items-center justify-center"
          style={{ 
            width: size * 0.8, 
            height: size * 0.8,
            transform: `rotate(${rotation * 30}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {items.slice(0, getIconCount()).map((item, index) => {
            const icon = iconPositions[index]
            const isHovered = hoveredIcon === index
            const angleFromCenter = Math.atan2(
              (icon?.y || 0) - size / 2, 
              (icon?.x || 0) - size / 2
            )
            
            return (
              <div
                key={index}
                className={`
                  absolute w-10 h-10 bg-card/90 backdrop-blur-enhanced border border-border/50 rounded-xl 
                  flex items-center justify-center 
                  transition-all duration-500 ease-out will-change-transform
                  hover:scale-150 hover:shadow-2xl hover:shadow-blue-500/30 icon-glow-effect
                  ${isHovered ? 'ring-2 ring-blue-400/60 z-20 pulse-glow' : 'z-10'}
                  ${icon ? `opacity-${Math.floor(icon.opacity * 100)}` : 'opacity-100'}
                `}
                style={{
                  transform: `
                    translate(${icon?.x ? icon.x - size * 0.4 : 0}px, ${icon?.y ? icon.y - size * 0.4 : 0}px)
                    scale(${icon?.scale || 1})
                    rotate(${isHovered ? 360 : 0}deg)
                  `,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center',
                  filter: isHovered ? 'brightness(1.2) contrast(1.1)' : 'brightness(1)',
                }}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                {/* Enhanced glow effect */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-sm animate-pulse"
                    style={{
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />
                )}
                
                <div className="relative z-10">
                  {images ? (
                    <img 
                      src={item as string} 
                      alt={`Tech icon ${index + 1}`}
                      className={`
                        w-6 h-6 object-contain transition-all duration-300
                        ${isHovered ? 'scale-110 filter brightness-110' : ''}
                      `}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.innerHTML = '⚡'
                      }}
                    />
                  ) : (
                    <div className={`text-base ${isHovered ? 'scale-110' : ''} transition-transform duration-300`}>
                      {item}
                    </div>
                  )}
                </div>

                {/* Tooltip effect */}
                {isHovered && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap shadow-lg">
                    {images ? `Technology ${index + 1}` : 'Icon'}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background/95 border-l border-t border-border/50 rotate-45" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Enhanced center particle effect */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none pulse-glow"
        style={{
          transform: `scale(${1 + Math.sin(Date.now() * 0.004) * 0.05})`,
        }}
      >
        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping" />
        <div className="absolute w-6 h-6 border border-blue-400/30 rounded-full animate-pulse slow-rotation" />
        <div className="absolute w-8 h-8 border border-purple-400/20 rounded-full animate-pulse reverse-rotation" />
      </div>

      {/* Layout indicator (debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-0 right-0 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          {layout} • {getIconCount()} icons
        </div>
      )}
    </div>
  )
}