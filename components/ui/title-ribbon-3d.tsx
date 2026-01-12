import React from "react"
import { Award, Star, Trophy, Crown } from "lucide-react"
import "./ribbon-3d.css"

interface TitleRibbon3DProps {
  variant?: "certified" | "premium" | "achievement" | "exclusive"
  className?: string
}

const ribbonVariants = {
  certified: {
    gradient: "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700",
    shadow: "shadow-lg shadow-purple-500/30",
    border: "border-purple-400/40",
    text: "text-white",
    icon: Award,
    label: "CERTIFIÉ"
  },
  premium: {
    gradient: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500",
    shadow: "shadow-lg shadow-orange-500/30",
    border: "border-orange-400/40",
    text: "text-white",
    icon: Crown,
    label: "PREMIUM"
  },
  achievement: {
    gradient: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
    shadow: "shadow-lg shadow-emerald-500/30",
    border: "border-emerald-400/40",
    text: "text-white",
    icon: Trophy,
    label: "ACHIEVEMENT"
  },
  exclusive: {
    gradient: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600",
    shadow: "shadow-lg shadow-indigo-500/30",
    border: "border-indigo-400/40",
    text: "text-white",
    icon: Star,
    label: "EXCLUSIVE"
  }
}

export function TitleRibbon3D({ 
  variant = "certified", 
  className = "" 
}: TitleRibbon3DProps) {
  const config = ribbonVariants[variant]
  const IconComponent = config.icon

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main tilted ribbon */}
      <div 
        className={`
          relative px-6 py-2 
          ${config.gradient}
          ${config.shadow}
          ${config.border}
          ${config.text}
          border backdrop-blur-sm
          rounded-md
          transform -rotate-3 hover:-rotate-1 hover:scale-105 
          transition-all duration-300 ease-out
          shadow-2xl
          group
          overflow-hidden
        `}
        style={{
          transformOrigin: 'left center',
          marginTop: '-10px',
          marginLeft: '20px',
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)'
        }}
      >
        {/* 3D depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 rounded-md" />
        
        {/* Left edge highlight for 3D effect */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-white/20 to-transparent" />
        
        {/* Right angled edge */}
        <div 
          className="absolute top-0 right-0 w-5 h-full bg-white/10 transform skew-x-12 origin-top-right"
          style={{
            clipPath: 'polygon(0 0, 100% 50%, 0 100%)'
          }}
        />
        
        {/* Content container */}
        <div className="relative flex items-center gap-2 transform rotate-3">
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
          <span className="font-bold text-xs sm:text-sm tracking-wide drop-shadow-sm">
            {config.label}
          </span>
        </div>
        
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      </div>
      
      {/* 3D shadow effect */}
      <div 
        className="absolute inset-0 bg-black/20 blur-sm rounded-md transform translate-y-1 translate-x-1 -z-10"
        style={{
          transform: 'translateY(4px) translateX(4px) rotate(-3deg)',
          filter: 'blur(6px)',
          opacity: '0.6'
        }}
      />
      
      {/* Additional depth shadow */}
      <div 
        className="absolute inset-0 bg-black/10 blur-sm rounded-md transform translate-y-2 translate-x-2 -z-20"
        style={{
          transform: 'translateY(8px) translateX(8px) rotate(-3deg)',
          filter: 'blur(12px)',
          opacity: '0.3'
        }}
      />
    </div>
  )
}

// Quick access components for different variants
export function CertifiedTitleRibbon({ className }: { className?: string }) {
  return <TitleRibbon3D variant="certified" className={className} />
}

export function PremiumTitleRibbon({ className }: { className?: string }) {
  return <TitleRibbon3D variant="premium" className={className} />
}

export function AchievementTitleRibbon({ className }: { className?: string }) {
  return <TitleRibbon3D variant="achievement" className={className} />
}

export function ExclusiveTitleRibbon({ className }: { className?: string }) {
  return <TitleRibbon3D variant="exclusive" className={className} />
}