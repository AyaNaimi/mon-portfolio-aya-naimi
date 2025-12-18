"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
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
  Star
} from "lucide-react"

// Particle system for background
const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'linear-gradient(45deg, hsl(var(--primary) / 0.3), hsl(var(--secondary) / 0.3))'
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Advanced card with glass morphism and interactive effects
const TechShowcaseCard = ({ 
  title, 
  icon: Icon, 
  description, 
  skills, 
  color, 
  index, 
  isMain = false 
}: {
  title: string
  icon: any
  description: string
  skills: string[]
  color: string
  index: number
  isMain?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }, [controls, index])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={controls}
      className={cn(
        "relative group cursor-pointer",
        isMain ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      )}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateX: springX,
        rotateY: springY,
      }}
    >
      {/* Glass morphism background */}
      <div className={cn(
        "relative h-full overflow-hidden rounded-3xl border border-white/20 backdrop-blur-xl",
        "bg-gradient-to-br from-white/[0.08] to-white/[0.02]",
        "shadow-2xl shadow-black/20 transition-all duration-500",
        "hover:shadow-3xl hover:shadow-blue-500/25 hover:border-white/40"
      )}>
        
        {/* Animated background gradient */}
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity duration-500",
            color
          )}
          animate={{
            backgroundPosition: isHovered ? "200% 200%" : "0% 0%"
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 200%"
          }}
        />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Icon with glow effect */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className={cn(
                "p-3 rounded-2xl bg-gradient-to-br shadow-lg",
                color
              )}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
              <p className="text-white/70 text-sm">{description}</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="flex-1 flex flex-wrap gap-2 mt-auto">
            {skills.map((skill, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 text-white/90 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)"
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Hover overlay effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(45deg, ${color.includes('blue') ? '#3b82f6' : color.includes('purple') ? '#8b5cf6' : '#ec4899'}, transparent)`,
            filter: 'blur(20px)',
            opacity: 0.6,
            zIndex: -1,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

// Main showcase component
export function PremiumTechShowcase() {
  const techCategories = [
    {
      title: "Frontend Development",
      icon: Monitor,
      description: "Modern web interfaces",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      color: "from-blue-500 to-cyan-500",
      isMain: true
    },
    {
      title: "Backend & APIs",
      icon: Database,
      description: "Scalable server solutions",
      skills: ["Node.js", "Express", "GraphQL", "REST APIs"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      description: "Cross-platform apps",
      skills: ["Flutter", "React Native", "Dart", "iOS", "Android"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      description: "Infrastructure & deployment",
      skills: ["Docker", "AWS", "CI/CD", "Kubernetes"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      description: "User-centered design",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Tools & Workflow",
      icon: GitBranch,
      description: "Development efficiency",
      skills: ["Git", "VS Code", "Jira", "Testing", "Linting"],
      color: "from-indigo-500 to-blue-500"
    }
  ]

  return (
    <div className="relative w-full h-[700px] bg-showcase-premium rounded-3xl overflow-hidden border border-white/10">
      {/* Particle field background */}
      <ParticleField />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-white/10 rounded-full"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Expertise & Technologies
          </h2>
          <Star className="w-8 h-8 text-yellow-400" />
        </motion.div>
        <p className="text-white/70 text-lg">
          Un écosystème complet de compétences modernes
        </p>
      </div>

      {/* Tech showcase grid */}
      <div className="relative z-10 px-8 pb-8 h-full">
        <div className="grid grid-cols-4 grid-rows-3 gap-4 h-full max-w-6xl mx-auto">
          {techCategories.map((tech, idx) => (
            <TechShowcaseCard
              key={tech.title}
              {...tech}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)`
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--secondary) / 0.2) 0%, transparent 70%)`
        }}
      />
      
      {/* Decorative corners */}
      <div className="absolute top-4 left-4">
        <motion.div
          className="w-8 h-8 border-l-2 border-t-2 border-blue-400/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="absolute top-4 right-4">
        <motion.div
          className="w-8 h-8 border-r-2 border-t-2 border-purple-400/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>
      <div className="absolute bottom-4 left-4">
        <motion.div
          className="w-8 h-8 border-l-2 border-b-2 border-pink-400/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
      <div className="absolute bottom-4 right-4">
        <motion.div
          className="w-8 h-8 border-r-2 border-b-2 border-cyan-400/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>
    </div>
  )
}