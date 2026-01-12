"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion"
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
  Atom,
  Orbit,
  Waves,
  Gauge,
  Box,
  Circle
} from "lucide-react"

// Système de connexion quantique
const QuantumConnections = ({ mouseX, mouseY, connections }: { 
  mouseX: number; 
  mouseY: number; 
  connections: Array<{x: number, y: number, id: number}>
}) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <linearGradient id="quantum-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {connections.map((point, index) => (
        <motion.line
          key={`${point.id}-${mouseX}`}
          x1={mouseX}
          y1={mouseY}
          x2={point.x}
          y2={point.y}
          stroke="url(#quantum-gradient)"
          strokeWidth="1"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          exit={{ pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        />
      ))}
    </svg>
  )
}

// Nœud technologique quantique
const QuantumNode = ({ 
  tech, 
  position, 
  index 
}: { 
  tech: any; 
  position: { x: number; y: number }; 
  index: number 
}) => {
  const [isActive, setIsActive] = useState(false)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([])

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setParticles(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 40 - 20,
          y: Math.random() * 40 - 20
        }].slice(-8))
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isActive])

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ 
        opacity: 0, 
        scale: 0,
        rotateY: 90 
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotateY: 0 
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.2,
        rotateY: 15
      }}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
    >
      {/* Nœud principal */}
      <motion.div
        className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center ${
          isActive 
            ? 'border-white shadow-lg shadow-blue-500/50' 
            : 'border-white/30'
        }`}
        style={{
          background: isActive 
            ? 'linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)' 
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
        animate={{
          boxShadow: isActive 
            ? [
                '0 0 20px rgba(59, 130, 246, 0.5)',
                '0 0 40px rgba(139, 92, 246, 0.3)',
                '0 0 20px rgba(236, 72, 153, 0.5)'
              ]
            : '0 0 0px rgba(0, 0, 0, 0)'
        }}
        transition={{
          duration: 1,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Icône centrale */}
        <motion.div
          animate={{
            rotate: isActive ? 360 : 0,
            scale: isActive ? [1, 1.1, 1] : 1
          }}
          transition={{
            rotate: { duration: 2, repeat: isActive ? Infinity : 0, ease: "linear" },
            scale: { duration: 1, repeat: isActive ? Infinity : 0, ease: "easeInOut" }
          }}
        >
          <tech.icon className="w-6 h-6 text-white drop-shadow-lg" />
        </motion.div>

        {/* Particules émises */}
        <AnimatePresence>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1,
                scale: 1
              }}
              animate={{ 
                x: particle.x, 
                y: particle.y, 
                opacity: 0,
                scale: 0
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut" 
              }}
            />
          ))}
        </AnimatePresence>

        {/* Aura quantique */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: isActive ? [1, 2, 1] : [1, 1.2, 1],
            opacity: isActive ? [0.5, 0.8, 0.5] : [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Anneaux orbitaux */}
      <AnimatePresence>
        {isActive && (
          <>
            {[1, 2, 3].map(ring => (
              <motion.div
                key={ring}
                className="absolute border border-white/20 rounded-full"
                style={{
                  width: (16 + ring * 16) * 2,
                  height: (16 + ring * 16) * 2,
                  left: -(16 + ring * 16),
                  top: -(16 + ring * 16),
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: [0, 0.5, 0],
                  rotate: 360
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: ring * 0.2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Nom de la technologie */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/80 font-medium whitespace-nowrap opacity-0 group-hover:opacity-100"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {tech.name}
      </motion.div>
    </motion.div>
  )
}

// Interface principale quantique
export function QuantumTechPortal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [activeNodes, setActiveNodes] = useState<number[]>([])

  const technologies = [
    { id: 1, name: "React", icon: Code2, x: 100, y: 80 },
    { id: 2, name: "Next.js", icon: Globe, x: 300, y: 60 },
    { id: 3, name: "TypeScript", icon: Layers, x: 500, y: 100 },
    { id: 4, name: "Node.js", icon: Database, x: 200, y: 200 },
    { id: 5, name: "Flutter", icon: Smartphone, x: 400, y: 220 },
    { id: 6, name: "Docker", icon: Box, x: 600, y: 180 },
    { id: 7, name: "AWS", icon: Cloud, x: 150, y: 320 },
    { id: 8, name: "GraphQL", icon: Atom, x: 350, y: 340 },
    { id: 9, name: "Kubernetes", icon: Circle, x: 550, y: 300 },
    { id: 10, name: "AI/ML", icon: Brain, x: 250, y: 420 },
    { id: 11, name: "DevOps", icon: Gauge, x: 450, y: 440 },
    { id: 12, name: "IoT", icon: Waves, x: 600, y: 420 },
  ]

  const connections = technologies.filter(tech => 
    activeNodes.includes(tech.id)
  ).map(tech => ({ x: tech.x + 32, y: tech.y + 32, id: tech.id }))

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div className="relative w-full h-[700px] bg-tech-portal rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl">
      {/* Arrière-plan quantique */}
      <div className="absolute inset-0">
        {/* Grille quantique */}
        <div className="absolute inset-0 opacity-20 bg-quantum-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
              style={{
                top: `${(i + 1) * 5}%`,
                left: '0%',
                right: '0%'
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scaleX: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
              style={{
                left: `${(i + 1) * 5}%`,
                top: '0%',
                bottom: '0%'
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scaleY: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>

        {/* Particules flottantes */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-blue-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Connexions quantiques */}
      <QuantumConnections 
        mouseX={mousePos.x} 
        mouseY={mousePos.y} 
        connections={connections}
      />

      {/* Nœuds technologiques */}
      <div 
        ref={containerRef}
        className="relative w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.id}
            onHoverStart={() => setActiveNodes(prev => [...prev, tech.id])}
            onHoverEnd={() => setActiveNodes(prev => prev.filter(id => id !== tech.id))}
          >
            <QuantumNode
              tech={tech}
              position={{ x: tech.x, y: tech.y }}
              index={index}
            />
          </motion.div>
        ))}
      </div>

      {/* Centre quantique pulsant */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="relative">
          {/* Pulsation centrale */}
          <motion.div
            className="w-24 h-24 rounded-full blur-2xl"
            style={{
              background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))'
            }}
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Anneaux de能量 */}
          {[40, 60, 80].map((size, index) => (
            <motion.div
              key={size}
              className="absolute border border-white/20 rounded-full"
              style={{
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                rotate: { duration: 10 + index * 2, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2, repeat: Infinity, delay: index * 0.3 }
              }}
            />
          ))}
          
          {/* Icône centrale */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-10 h-10 text-white drop-shadow-lg" />
          </motion.div>
        </div>
      </motion.div>

      {/* Effets lumineux */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--secondary) / 0.3) 0%, transparent 70%)`
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent) / 0.2) 0%, transparent 70%)`
        }}
      />
      
      {/* Titre et description */}
      <motion.div
        className="absolute bottom-6 left-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Quantum Tech Portal
        </h3>
        <p className="text-white/70 text-sm">
          Interface quantique pour l'écosystème technologique
        </p>
      </motion.div>

      {/* Indicateur d'interactivité */}
      <motion.div
        className="absolute top-6 right-6 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium"
          animate={{
            backgroundColor: isHovered 
              ? "rgba(59, 130, 246, 0.2)" 
              : "rgba(255, 255, 255, 0.1)"
          }}
        >
          {isHovered ? "Connexions actives" : "Survolez pour interagir"}
        </motion.div>
      </motion.div>
    </div>
  )
}