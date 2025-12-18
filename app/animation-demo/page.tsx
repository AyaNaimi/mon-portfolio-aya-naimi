"use client"

import { AdvancedAnimationProvider } from "@/components/advanced-animation-provider"
import { AnimationDemo } from "@/components/ui/animation-demo"
import { AnimationSettings } from "@/components/ui/animation-config-provider"
import { useState } from "react"

export default function AnimationDemoPage() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <AdvancedAnimationProvider debug={true}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* En-tête avec contrôles */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Démonstration du Système d'Animation
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Testez les animations fade-in progressif avec Intersection Observer
                </p>
              </div>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showSettings ? "Masquer" : "Afficher"} les Paramètres
              </button>
            </div>
          </div>
        </header>

        {/* Paramètres d'animation */}
        {showSettings && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AnimationSettings />
          </div>
        )}

        {/* Démonstration */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimationDemo />
        </main>

        {/* Instructions */}
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2>Instructions d'utilisation</h2>
              
              <h3>Composants disponibles :</h3>
              <ul>
                <li><code>AnimatedText</code> - Texte avec animations personnalisées</li>
                <li><code>AnimatedHeading</code> - Titres avec effets variables</li>
                <li><code>AnimatedParagraph</code> - Paragraphes avec animations fluides</li>
                <li><code>AnimatedImage</code> - Images avec chargement progressif</li>
                <li><code>AnimatedButton</code> - Boutons avec micro-interactions</li>
                <li><code>AnimatedLink</code> - Liens avec effets de survol</li>
                <li><code>AnimatedCard</code> - Cartes avec animations au survol</li>
                <li><code>CascadeAnimation</code> - Effets de cascade avec délais</li>
              </ul>
              
              <h3>Caractéristiques techniques :</h3>
              <ul>
                <li>✅ Intersection Observer API pour les performances</li>
                <li>✅ Durées variables selon le type de contenu</li>
                <li>✅ Effets de cascade avec délais échelonnés</li>
                <li>✅ Support des préférences d'accessibilité</li>
                <li>✅ Optimisations de performance intégrées</li>
                <li>✅ Compatibilité cross-browser</li>
                <li>✅ Configuration flexible via provider</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </AdvancedAnimationProvider>
  )
}