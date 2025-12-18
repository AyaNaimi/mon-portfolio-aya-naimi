"use client"

import React from "react"
import { AnimationConfigProvider } from "./ui/animation-config-provider"

// Provider principal pour le système d'animation avancé
// Remplace l'ancien ScrollRevealProvider avec des fonctionnalités plus complètes

export function AdvancedAnimationProvider({ 
  children,
  debug = false 
}: { 
  children: React.ReactNode
  debug?: boolean 
}) {
  return (
    <AnimationConfigProvider
      initialPreferences={{
        debug,
        respectSystemPreferences: true,
        enabled: true
      }}
    >
      {children}
    </AnimationConfigProvider>
  )
}

export default AdvancedAnimationProvider