import React from "react"
import { Award, Star, Trophy } from "lucide-react"
import "./ribbon-3d.css"

interface Ribbon3DProps {
  children: React.ReactNode
  icon?: any
  variant?: "default" | "premium" | "achievement" | "certified"
  className?: string
  animated?: boolean
}

const variantStyles = {
  default: {
    container: "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600",
    shadow: "shadow-lg shadow-blue-500/25",
    border: "border-blue-400/30",
    text: "text-white",
    glowClass: ""
  },
  premium: {
    container: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
    shadow: "shadow-lg shadow-orange-500/25",
    border: "border-orange-400/30",
    text: "text-white",
    glowClass: "ribbon-shimmer"
  },
  achievement: {
    container: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600",
    shadow: "shadow-lg shadow-emerald-500/25",
    border: "border-emerald-400/30",
    text: "text-white",
    glowClass: "ribbon-3d-container"
  },
  certified: {
    container: "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500",
    shadow: "shadow-lg shadow-purple-500/25",
    border: "border-purple-400/30",
    text: "text-white",
    glowClass: "ribbon-3d-main"
  }
}

export function Ribbon3D({ 
  children, 
  icon: Icon, 
  variant = "default", 
  className = "",
  animated = true
}: Ribbon3DProps) {
  const styles = variantStyles[variant]
  
  return (
    <div className={`relative inline-block ${animated ? 'animate-bounce' : ''} ${className}`}>
      {/* 3D Shadow Effect */}
      <div className={`
        absolute -bottom-2 left-1 right-1 h-2 
        bg-black/20 blur-sm rounded-full
        transform scale-95 -z-10
        ${animated ? 'ribbon-3d-shadow' : ''}
      `} />
      
      {/* Main Ribbon with 3D effects */}
      <div className={`
        relative px-4 py-2 
        ${styles.container}
        ${styles.shadow}
        ${styles.border}
        ${styles.text}
        border backdrop-blur-sm
        rounded-lg
        ${animated ? 'hover:scale-105 hover:-translate-y-0.5' : ''}
        transition-all duration-300 ease-out
        shadow-2xl
        ${styles.glowClass}
        ${animated ? 'ribbon-3d-main' : ''}
        overflow-hidden
      `}>
        {/* 3D Depth Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-lg" />
        
        {/* Left Edge Highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30 rounded-l-lg" />
        
        {/* Shimmer effect for premium variant */}
        {variant === "premium" && (
          <div className="absolute inset-0 ribbon-shimmer rounded-lg" />
        )}
        
        {/* Sparkle effects for achievement variant */}
        {variant === "achievement" && (
          <>
            <div className="sparkle" />
            <div className="sparkle" />
            <div className="sparkle" />
            <div className="sparkle" />
          </>
        )}
        
        {/* Content */}
        <div className="relative flex items-center gap-2 z-10">
          {Icon && (
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
          )}
          <span className="font-bold text-sm sm:text-base drop-shadow-sm">
            {children}
          </span>
        </div>
        
        {/* Right Edge Glow */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/20" />
      </div>
      
      {/* Bottom Border Shadow for Extra 3D Effect */}
      <div className="absolute -bottom-1 left-0 right-0 h-px bg-black/30 blur-sm" />
    </div>
  )
}

// Specialized ribbon variants for certificates
export function CertifiedRibbon({ className }: { className?: string }) {
  return (
    <Ribbon3D 
      variant="certified" 
      icon={Award}
      className={className}
      animated={true}
    >
      🏆 CERTIFIÉ
    </Ribbon3D>
  )
}

export function PremiumRibbon({ className }: { className?: string }) {
  return (
    <Ribbon3D 
      variant="premium" 
      icon={Star}
      className={className}
      animated={true}
    >
      ⭐ PREMIUM
    </Ribbon3D>
  )
}

export function AchievementRibbon({ className }: { className?: string }) {
  return (
    <Ribbon3D 
      variant="achievement" 
      icon={Trophy}
      className={className}
      animated={true}
    >
      🎖️ ACHIEVEMENT
    </Ribbon3D>
  )
}

// Additional specialized ribbon for section titles
export function SectionTitleRibbon({ className }: { className?: string }) {
  return (
    <Ribbon3D 
      variant="default" 
      icon={Award}
      className={`mt-4 ${className}`}
      animated={true}
    >
      ✨ MES CERTIFICATIONS
    </Ribbon3D>
  )
}