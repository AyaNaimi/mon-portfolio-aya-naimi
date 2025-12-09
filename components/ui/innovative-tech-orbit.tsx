"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { 
  Code2, 
  Database, 
  Smartphone, 
  Globe, 
  Layers, 
  Zap,
  Palette,
  Cpu,
  GitBranch,
  Cloud,
  Monitor,
  Shield,
  Rocket,
  Brain,
  Sparkles,
  Star,
  Triangle,
  Square,
  Circle,
  Hexagon
} from "lucide-react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  delay: number
}

// Système de particules 3D
const ParticleSystem = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    life: number
  }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length < 50) {
        setParticles(prev => [...prev, {
          id: Date.now(),
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1
        }])
      }
    }, 100)

    return () => clearInterval(interval)
  }, [mouseX, mouseY, particles.length])

  useEffect(() => {
    const animation = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        life: p.life - 0.02,
        vx: p.vx * 0.98,
        vy: p.vy * 0.98
      })).filter(p => p.life > 0))
    }, 16)

    return () => clearInterval(animation)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life
          }}
          animate={{
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

// Élément géométrique flottant
const GeometricElement = ({ 
  element, 
  index 
}: { 
  element: FloatingElement
  index: number 
}) => {
  return (
    <motion.div
      className={`absolute ${element.size > 60 ? 'w-16 h-16' : element.size > 40 ? 'w-12 h-12' : 'w-8 h-8'} flex items-center justify-center cursor-pointer group`}
      style={{
        left: element.x,
        top: element.y,
        color: element.color,
      }}
      initial={{ 
        opacity: 0, 
        scale: 0, 
        rotate: 0,
        y: 100 
      }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: element.rotation,
        y: [0, -20, 0]
      }}
      transition={{
        duration: 0.8,
        delay: element.delay,
        y: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 10 + Math.random() * 5,
          repeat: Infinity,
          ease: "linear"
        }
      }}
      whileHover={{ 
        scale: 1.3, 
        rotate: 180,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div
        className="relative"
        animate={{
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <element.icon className="w-full h-full filter drop-shadow-lg group-hover:brightness-125" />
        
        {/* Effet de glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${element.color}20 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Interface principale
export function InnovativeTechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [0, 400], [15, -15]), {
    stiffness: 50,
    damping: 20
  })
  
  const rotateY = useSpring(useTransform(mouseX, [0, 400], [-15, 15]), {
    stiffness: 50,
    damping: 20
  })

  const floatingElements: FloatingElement[] = [
    { id: 1, x: 120, y: 80, size: 80, rotation: 0, speed: 1, icon: Code2, color: "#3B82F6", delay: 0 },
    { id: 2, x: 320, y: 120, size: 50, rotation: 45, speed: 0.8, icon: Database, color: "#10B981", delay: 0.5 },
    { id: 3, x: 520, y: 100, size: 60, rotation: 90, speed: 1.2, icon: Smartphone, color: "#8B5CF6", delay: 1 },
    { id: 4, x: 220, y: 280, size: 45, rotation: 135, speed: 0.9, icon: Globe, color: "#F59E0B", delay: 1.5 },
    { id: 5, x: 420, y: 320, size: 70, rotation: 180, speed: 1.1, icon: Layers, color: "#EF4444", delay: 2 },
    { id: 6, x: 580, y: 240, size: 55, rotation: 225, speed: 0.7, icon: Zap, color: "#06B6D4", delay: 2.5 },
    { id: 7, x: 180, y: 450, size: 40, rotation: 270, speed: 1.3, icon: Palette, color: "#EC4899", delay: 3 },
    { id: 8, x: 380, y: 480, size: 65, rotation: 315, speed: 0.6, icon: Cpu, color: "#84CC16", delay: 3.5 },
    { id: 9, x: 520, y: 420, size: 50, rotation: 360, speed: 1.4, icon: GitBranch, color: "#6366F1", delay: 4 },
    { id: 10, x: 350, y: 180, size: 35, rotation: 405, speed: 0.5, icon: Cloud, color: "#14B8A6", delay: 4.5 },
    { id: 11, x: 450, y: 60, size: 75, rotation: 450, speed: 1.6, icon: Monitor, color: "#F97316", delay: 5 },
    { id: 12, x: 650, y: 180, size: 42, rotation: 495, speed: 0.4, icon: Shield, color: "#A855F7", delay: 5.5 },
  ]

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePos({ x, y })
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/30 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl">
      {/* Système de particules */}
      <ParticleSystem mouseX={mousePos.x} mouseY={mousePos.y} />
      
      {/* Arrière-plan animé */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Conteneur principal avec perspective 3D */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center perspective-1000"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Orbite centrale */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Anneaux orbitaux */}
          {[200, 280, 360].map((radius, idx) => (
            <motion.div
              key={radius}
              className="absolute border border-dashed border-white/10 rounded-full"
              style={{
                width: radius * 2,
                height: radius * 2,
                marginLeft: -radius,
                marginTop: -radius,
              }}
              animate={{
                rotate: isHovered ? (idx % 2 === 0 ? 360 : -360) : 0,
              }}
              transition={{
                duration: 15 + idx * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        {/* Éléments flottants */}
        <div className="relative w-full h-full">
          {floatingElements.map((element, index) => (
            <GeometricElement
              key={element.id}
              element={element}
              index={index}
            />
          ))}
        </div>

        {/* Centre pulsant */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Effets de lumière */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl" />
      
      {/* Titre intégré */}
      <motion.div
        className="absolute bottom-6 left-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Orbit Technologies
        </h3>
        <p className="text-white/70 text-sm">
          Un écosystème technologique en mouvement
        </p>
      </motion.div>
    </div>
  )
}