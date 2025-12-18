"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { 
  DEFAULT_ANIMATION_CONFIG, 
  ContentTypeConfig, 
  AnimationConfig, 
  getReducedMotionPreference,
  getUserAnimationPreference 
} from "./advanced-scroll-animations"

export interface AnimationPreferences {
  enabled: boolean
  reducedMotion: boolean
  globalDuration: number
  globalDelay: number
  respectSystemPreferences: boolean
  debug: boolean
}

export interface AnimationConfigContextType {
  config: ContentTypeConfig
  preferences: AnimationPreferences
  updateConfig: (contentType: keyof ContentTypeConfig, config: Partial<AnimationConfig>) => void
  updatePreferences: (preferences: Partial<AnimationPreferences>) => void
  resetToDefaults: () => void
  exportConfig: () => string
  importConfig: (configString: string) => boolean
}

const AnimationConfigContext = createContext<AnimationConfigContextType | undefined>(undefined)

const DEFAULT_PREFERENCES: AnimationPreferences = {
  enabled: true,
  reducedMotion: false,
  globalDuration: DEFAULT_ANIMATION_CONFIG.text.duration,
  globalDelay: 0,
  respectSystemPreferences: true,
  debug: false
}

// Provider principal pour la configuration des animations
export function AnimationConfigProvider({
  children,
  initialConfig,
  initialPreferences
}: {
  children: React.ReactNode
  initialConfig?: Partial<ContentTypeConfig>
  initialPreferences?: Partial<AnimationPreferences>
}) {
  const [config, setConfig] = useState<ContentTypeConfig>(() => ({
    ...DEFAULT_ANIMATION_CONFIG,
    ...initialConfig
  }))

  const [preferences, setPreferences] = useState<AnimationPreferences>(() => ({
    ...DEFAULT_PREFERENCES,
    ...initialPreferences,
    reducedMotion: initialPreferences?.respectSystemPreferences !== false 
      ? getReducedMotionPreference() || getUserAnimationPreference()
      : initialPreferences?.reducedMotion || false
  }))

  // Synchroniser avec les préférences système
  useEffect(() => {
    if (!preferences.respectSystemPreferences) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: mediaQuery.matches || getUserAnimationPreference()
      }))
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [preferences.respectSystemPreferences])

  // Sauvegarder les préférences dans localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    
    try {
      localStorage.setItem("animation-config", JSON.stringify(config))
      localStorage.setItem("animation-preferences", JSON.stringify(preferences))
      
      // Sauvegarder aussi une version simplifiée pour la compatibilité
      localStorage.setItem("animation-preference", preferences.reducedMotion ? "reduced" : "normal")
    } catch (error) {
      console.warn("Impossible de sauvegarder la configuration d'animation:", error)
    }
  }, [config, preferences])

  const updateConfig = (contentType: keyof ContentTypeConfig, newConfig: Partial<AnimationConfig>) => {
    setConfig(prev => ({
      ...prev,
      [contentType]: {
        ...prev[contentType],
        ...newConfig
      }
    }))
  }

  const updatePreferences = (newPreferences: Partial<AnimationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }))
  }

  const resetToDefaults = () => {
    setConfig(DEFAULT_ANIMATION_CONFIG)
    setPreferences({
      ...DEFAULT_PREFERENCES,
      reducedMotion: getReducedMotionPreference() || getUserAnimationPreference()
    })
  }

  const exportConfig = (): string => {
    return JSON.stringify({ config, preferences }, null, 2)
  }

  const importConfig = (configString: string): boolean => {
    try {
      const parsed = JSON.parse(configString)
      if (parsed.config && parsed.preferences) {
        setConfig({ ...DEFAULT_ANIMATION_CONFIG, ...parsed.config })
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed.preferences })
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const contextValue: AnimationConfigContextType = {
    config,
    preferences,
    updateConfig,
    updatePreferences,
    resetToDefaults,
    exportConfig,
    importConfig
  }

  return (
    <AnimationConfigContext.Provider value={contextValue}>
      {children}
      {preferences.debug && (
        <AnimationDebugPanel config={config} preferences={preferences} />
      )}
    </AnimationConfigContext.Provider>
  )
}

// Hook pour utiliser la configuration d'animation
export function useAnimationConfig() {
  const context = useContext(AnimationConfigContext)
  if (context === undefined) {
    throw new Error("useAnimationConfig must be used within an AnimationConfigProvider")
  }
  return context
}

// Composant de debug pour visualiser la configuration
function AnimationDebugPanel({ 
  config, 
  preferences 
}: { 
  config: ContentTypeConfig
  preferences: AnimationPreferences 
}) {
  const [isOpen, setIsOpen] = useState(false)

  if (!preferences.debug) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-3 py-2 rounded text-sm mb-2"
      >
        Debug Animations
      </button>
      
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-4 max-w-md max-h-96 overflow-auto text-xs">
          <h3 className="font-bold mb-2">Configuration d'Animation</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify({ config, preferences }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

// Composant pour les paramètres utilisateur
export function AnimationSettings() {
  const { config, preferences, updateConfig, updatePreferences, resetToDefaults, exportConfig, importConfig } = useAnimationConfig()
  const [importText, setImportText] = useState("")
  const [showImport, setShowImport] = useState(false)

  const handleExport = () => {
    const configString = exportConfig()
    navigator.clipboard.writeText(configString).then(() => {
      alert("Configuration copiée dans le presse-papiers!")
    })
  }

  const handleImport = () => {
    if (importConfig(importText)) {
      alert("Configuration importée avec succès!")
      setImportText("")
      setShowImport(false)
    } else {
      alert("Erreur lors de l'importation de la configuration")
    }
  }

  return (
    <div className="animation-settings p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Paramètres d'Animation</h2>
      
      {/* Préférences générales */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Préférences Générales</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.enabled}
              onChange={(e) => updatePreferences({ enabled: e.target.checked })}
              className="mr-2"
            />
            Activer les animations
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.reducedMotion}
              onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
              className="mr-2"
            />
            Réduire les animations (accessibilité)
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.respectSystemPreferences}
              onChange={(e) => updatePreferences({ respectSystemPreferences: e.target.checked })}
              className="mr-2"
            />
            Respecter les préférences système
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.debug}
              onChange={(e) => updatePreferences({ debug: e.target.checked })}
              className="mr-2"
            />
            Mode debug
          </label>
        </div>
      </div>

      {/* Configuration par type de contenu */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Configuration par Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(config) as Array<keyof ContentTypeConfig>).map((type) => (
            <div key={type} className="border p-3 rounded">
              <h4 className="font-medium capitalize mb-2">{type}</h4>
              <div className="space-y-1 text-sm">
                <label>
                  Durée (ms):
                  <input
                    type="number"
                    value={config[type].duration}
                    onChange={(e) => updateConfig(type, { duration: parseInt(e.target.value) || 0 })}
                    className="ml-2 w-20 px-2 py-1 border rounded"
                  />
                </label>
                <br />
                <label>
                  Délai (ms):
                  <input
                    type="number"
                    value={config[type].delay}
                    onChange={(e) => updateConfig(type, { delay: parseInt(e.target.value) || 0 })}
                    className="ml-2 w-20 px-2 py-1 border rounded"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Réinitialiser
        </button>
        
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Exporter
        </button>
        
        <button
          onClick={() => setShowImport(!showImport)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Importer
        </button>
      </div>

      {/* Import */}
      {showImport && (
        <div className="mt-4">
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Collez votre configuration ici..."
            className="w-full h-32 p-2 border rounded"
          />
          <button
            onClick={handleImport}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Importer la Configuration
          </button>
        </div>
      )}
    </div>
  )
}

export default AnimationConfigProvider