import React from "react"
import { Award, Star, Trophy, Crown, Ticket } from "lucide-react"
import "./ribbon-3d.css"

interface TicketRibbon3DProps {
  variant?: "certified" | "premium" | "achievement" | "exclusive" | "vip"
  className?: string
  size?: "sm" | "md" | "lg"
}

const ticketVariants = {
  certified: {
    gradient: "bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700",
    shadow: "shadow-lg shadow-purple-500/40",
    border: "border-purple-400/60",
    text: "text-white",
    icon: Award,
    label: "CERTIFIÉ",
    pattern: "dots"
  },
  premium: {
    gradient: "bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600",
    shadow: "shadow-lg shadow-orange-500/40",
    border: "border-orange-400/60",
    text: "text-white",
    icon: Crown,
    label: "PREMIUM",
    pattern: "stripes"
  },
  achievement: {
    gradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
    shadow: "shadow-lg shadow-emerald-500/40",
    border: "border-emerald-400/60",
    text: "text-white",
    icon: Trophy,
    label: "ACHIEVEMENT",
    pattern: "grid"
  },
  exclusive: {
    gradient: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600",
    shadow: "shadow-lg shadow-indigo-500/40",
    border: "border-indigo-400/60",
    text: "text-white",
    icon: Star,
    label: "EXCLUSIVE",
    pattern: "diagonal"
  },
  vip: {
    gradient: "bg-gradient-to-br from-gold-500 via-yellow-400 to-amber-500",
    shadow: "shadow-lg shadow-yellow-500/40",
    border: "border-yellow-400/60",
    text: "text-black",
    icon: Ticket,
    label: "VIP ACCESS",
    pattern: "classic"
  }
}

const sizeClasses = {
  sm: {
    padding: "px-3 py-1",
    text: "text-xs",
    icon: "w-3 h-3",
    font: "font-bold"
  },
  md: {
    padding: "px-4 py-2",
    text: "text-sm",
    icon: "w-4 h-4",
    font: "font-bold"
  },
  lg: {
    padding: "px-6 py-3",
    text: "text-base",
    icon: "w-5 h-5",
    font: "font-extrabold"
  }
}

export function TicketRibbon3D({ 
  variant = "certified", 
  className = "",
  size = "md"
}: TicketRibbon3DProps) {
  const config = ticketVariants[variant]
  const sizeConfig = sizeClasses[size]
  const IconComponent = config.icon

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main ticket container */}
      <div 
        className={`
          relative
          ${sizeConfig.padding}
          ${config.gradient}
          ${config.shadow}
          ${config.border}
          ${config.text}
          border-2
          rounded-lg
          transform hover:scale-105 hover:-rotate-1 
          transition-all duration-300 ease-out
          shadow-2xl
          group
          overflow-hidden
          ${sizeConfig.font}
        `}
        style={{
          transformOrigin: 'center',
          marginTop: '-8px',
          marginLeft: '16px',
          // Ticket-like perforation effect
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
          backgroundImage: getPatternCSS(config.pattern),
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0'
        }}
      >
        {/* 3D depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/15 rounded-lg" />
        
        {/* Ticket perforation holes */}
        <div className="absolute left-1 top-2 w-2 h-2 bg-background rounded-full shadow-inner" />
        <div className="absolute left-1 bottom-2 w-2 h-2 bg-background rounded-full shadow-inner" />
        <div className="absolute right-1 top-2 w-2 h-2 bg-background rounded-full shadow-inner" />
        <div className="absolute right-1 bottom-2 w-2 h-2 bg-background rounded-full shadow-inner" />
        
        {/* Ticket serial number effect */}
        <div className="absolute top-1 right-2 text-xs opacity-30 font-mono">
          #{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}
        </div>
        
        {/* Center content */}
        <div className="relative flex items-center gap-2 justify-center">
          <IconComponent className={`${sizeConfig.icon} drop-shadow-sm`} />
          <span className={`${sizeConfig.text} tracking-wide drop-shadow-sm`}>
            {config.label}
          </span>
        </div>
        
        {/* Ticket stub effect - left side */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/10 flex items-center justify-center">
          <div className="w-px h-8 bg-white/20" />
        </div>
        
        {/* Ticket stub effect - right side */}
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-black/10 flex items-center justify-center">
          <div className="w-px h-8 bg-white/20" />
        </div>
        
        {/* Vintage ticket border pattern */}
        <div className="absolute inset-0 rounded-lg border-2 border-dashed border-white/10" />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      </div>
      
      {/* 3D shadow effects */}
      <div 
        className="absolute inset-0 bg-black/30 blur-sm rounded-lg transform translate-y-2 translate-x-2 -z-10"
        style={{
          transform: 'translateY(8px) translateX(8px)',
          filter: 'blur(8px)',
          opacity: '0.4',
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)'
        }}
      />
      
      {/* Additional depth shadow */}
      <div 
        className="absolute inset-0 bg-black/20 blur-sm rounded-lg transform translate-y-3 translate-x-3 -z-20"
        style={{
          transform: 'translateY(12px) translateX(12px)',
          filter: 'blur(16px)',
          opacity: '0.2',
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)'
        }}
      />
    </div>
  )
}

// Helper function to get CSS pattern
function getPatternCSS(pattern: string): string {
  switch (pattern) {
    case "dots":
      return "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)"
    case "stripes":
      return "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 8px)"
    case "grid":
      return "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)"
    case "diagonal":
      return "repeating-linear-gradient(135deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 6px)"
    case "classic":
      return "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.1) 2px, transparent 2px)"
    default:
      return "none"
  }
}

// Quick access components
export function CertifiedTicketRibbon({ className, size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  return <TicketRibbon3D variant="certified" className={className} size={size} />
}

export function PremiumTicketRibbon({ className, size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  return <TicketRibbon3D variant="premium" className={className} size={size} />
}

export function AchievementTicketRibbon({ className, size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  return <TicketRibbon3D variant="achievement" className={className} size={size} />
}

export function VIPTicketRibbon({ className, size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  return <TicketRibbon3D variant="vip" className={className} size={size} />
}