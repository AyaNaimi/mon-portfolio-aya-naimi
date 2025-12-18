"use client"

import { FramerAnimationDemo } from "@/components/ui/framer-animation-demo"

export default function FramerAnimationDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* En-tête avec contrôles */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Démonstration Animation Framer Motion
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Même style d'animation que le timeline pour tous les éléments
              </p>
            </div>
            
            <a
              href="/animation-demo"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voir l'autre démo
            </a>
          </div>
        </div>
      </header>

      {/* Démonstration */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FramerAnimationDemo />
      </main>

      {/* Instructions */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Style d'animation统一 avec le timeline</h2>
            
            <h3>Configuration utilisée :</h3>
            <ul>
              <li><strong>Animation de base :</strong> <code>opacity: 0, y: 50 → opacity: 1, y: 0</code></li>
              <li><strong>Viewport :</strong> <code>once: true, margin: "-80px"</code></li>
              <li><strong>Transition :</strong> <code>duration: 0.6, ease: "easeOut"</code></li>
              <li><strong>Effets de survol :</strong> <code>scale: 1.02, y: -5</code></li>
              <li><strong>Délais échelonnés :</strong> Stagger avec délais progressifs</li>
            </ul>
            
            <h3>Composants disponibles :</h3>
            <ul>
              <li><code>TextAnimation</code> - Textes avec animations uniformes</li>
              <li><code>ParagraphAnimation</code> - Paragraphes avec délai</li>
              <li><code>ImageAnimation</code> - Images avec effets fade/zoom/blur</li>
              <li><code>ButtonAnimation</code> - Boutons avec micro-interactions</li>
              <li><code>CardAnimation</code> - Cartes avec effets de survol</li>
              <li><code>GroupAnimation</code> - Groupes avec cascade</li>
              <li><code>ParallaxAnimation</code> - Effets de parallaxe</li>
            </ul>
            
            <p>
              Tous les composants utilisent la même configuration d'animation que le timeline 
              pour une cohérence parfaite dans toute l'application.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}