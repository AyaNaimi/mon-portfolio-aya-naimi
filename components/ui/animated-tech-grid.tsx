"use client"

import React, { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
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
  Cloud
} from "lucide-react"

// Technology data
const technologies = [
  {
    name: "Frontend",
    icon: Globe,
    description: "React, Next.js, TypeScript",
    color: "from-blue-500 to-cyan-500",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    name: "Backend", 
    icon: Database,
    description: "Node.js, Express, APIs",
    color: "from-green-500 to-emerald-500",
    items: ["Node.js", "Express", "REST APIs", "GraphQL"]
  },
  {
    name: "Mobile",
    icon: Smartphone,
    description: "Flutter, React Native",
    color: "from-purple-500 to-pink-500", 
    items: ["Flutter", "React Native", "Dart", "Mobile UI"]
  },
  {
    name: "DevOps",
    icon: Cloud,
    description: "Docker, CI/CD, AWS",
    color: "from-orange-500 to-red-500",
    items: ["Docker", "AWS", "CI/CD", "Kubernetes"]
  }
]

const floatingIcons = [
  { icon: Code2, delay: 0 },
  { icon: Layers, delay: 0.2 },
  { icon: Zap, delay: 0.4 },
  { icon: Palette, delay: 0.6 },
  { icon: Cpu, delay: 0.8 },
  { icon: GitBranch, delay: 1.0 }
]

const AnimatedBeam = ({ className }: { className?: string }) => {
  const controls = useAnimation()
  
  useEffect(() => {
    controls.start({
      opacity: [0, 1, 0],
      pathLength: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }, [controls])

  return (
    <svg
      className={cn("absolute inset-0 w-full h-full", className)}
      viewBox="0 0 400 300"
    >
      <motion.path
        d="M50,150 Q200,50 350,150"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={controls}
      />
      <motion.path
        d="M50,150 Q200,250 350,150"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={controls}
        transition={{ delay: 0.5 }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const FloatingIcon = ({ icon: Icon, delay }: { icon: any; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        rotate: [0, 360],
        y: [0, -20, 0]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-8 h-8 text-blue-400/30"
    >
      <Icon className="w-full h-full" />
    </motion.div>
  )
}

const TechCard = ({ tech, index }: { tech: any; index: number }) => {
  const controls = useAnimation()
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    })
  }, [controls, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm p-6",
        "hover:bg-card/80 transition-all duration-300 cursor-pointer group",
        "hover:shadow-2xl hover:shadow-blue-500/10"
      )}
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-20",
        tech.color
      )} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            "p-2 rounded-lg bg-gradient-to-br",
            tech.color
          )}>
            <tech.icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-lg">{tech.name}</h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">
          {tech.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tech.items.map((item: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hover effect */}
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30",
          tech.color
        )}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

const AnimatedMarquee = () => {
  const icons = [Code2, Layers, Zap, Palette, Cpu, GitBranch, Database, Globe, Smartphone]
  
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -100 * icons.length]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...icons, ...icons].map((Icon, idx) => (
          <div key={idx} className="flex items-center gap-2 text-muted-foreground/50">
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{Icon.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function AnimatedTechGrid() {
  return (
    <div className="relative w-full h-[600px] bg-background/50 rounded-3xl overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      
      {/* Floating icons background */}
      <div className="absolute inset-0">
        {floatingIcons.map(({ icon, delay }, idx) => (
          <FloatingIcon
            key={idx}
            icon={icon}
            delay={delay}
          />
        ))}
      </div>

      {/* Animated beams */}
      <AnimatedBeam className="opacity-30" />
      
      {/* Main content */}
      <div className="relative z-10 p-8 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Technologies & Compétences
          </h2>
          <p className="text-muted-foreground">
            Une expertise complète du développement moderne
          </p>
        </div>

        {/* Tech grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {technologies.map((tech, idx) => (
            <TechCard key={tech.name} tech={tech} index={idx} />
          ))}
        </div>

        {/* Animated marquee at bottom */}
        <div className="mt-8 border-t border-border/50 pt-6">
          <AnimatedMarquee />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-500/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-500/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-pink-500/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-500/30" />
    </div>
  )
}