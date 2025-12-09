"use client"

import React, { useEffect, useRef, useState } from "react"

interface SimpleIconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
  size?: number
}

export function SimpleIconCloud({ icons, images, size = 400 }: SimpleIconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Array<{x: number, y: number, id: number}>>([])
  const [rotation, setRotation] = useState(0)
  const animationFrameRef = useRef<number>(0)

  // Simplified icon positioning
  useEffect(() => {
    const items = icons || images || []
    const numIcons = items.length || 16 // Reduced number for better spacing
    
    const positions = []
    const radius = size * 0.3 // Use 30% of total size for better spacing
    
    for (let i = 0; i < numIcons; i++) {
      const angle = (i / numIcons) * 2 * Math.PI
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      positions.push({ x, y, id: i })
    }
    
    setIconPositions(positions)
  }, [icons, images, size])

  // Simple rotation animation
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, size, size)
      
      const centerX = size / 2
      const centerY = size / 2
      
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)
      ctx.translate(-centerX, -centerY)
      
      iconPositions.forEach((icon) => {
        const x = centerX + icon.x
        const y = centerY + icon.y
        
        // Draw simple circular background for each icon
        ctx.beginPath()
        ctx.arc(x, y, 25, 0, 2 * Math.PI) // Fixed size for consistency
        ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
        ctx.fill()
        ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
        ctx.lineWidth = 1
        ctx.stroke()
        
        // Add subtle glow effect
        ctx.beginPath()
        ctx.arc(x, y, 25, 0, 2 * Math.PI)
        ctx.shadowColor = "rgba(59, 130, 246, 0.5)"
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.shadowBlur = 0
      })
      
      ctx.restore()
      
      setRotation(prev => prev + 0.005)
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [iconPositions, rotation, size])

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="absolute inset-0"
      />
      
      {/* Center glow effect */}
      <div 
        className="absolute rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          animation: "pulse 3s ease-in-out infinite"
        }}
      />
      
      {/* Icons overlay */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-4" style={{ width: size * 0.6, height: size * 0.6 }}>
          {(icons || images || []).slice(0, 8).map((item, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              {images ? (
                <img 
                  src={item as string} 
                  alt={`Tech icon ${index + 1}`}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.innerHTML = '🔧'
                  }}
                />
              ) : (
                <div className="text-2xl">{item}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}