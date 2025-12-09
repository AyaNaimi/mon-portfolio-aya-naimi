"use client"

import { useEffect, useState, useRef } from "react"
import { Monitor, Smartphone, Globe, Code, Layout, MousePointer } from "lucide-react"

interface AnimationStep {
  id: number
  text: string
  cursorAction: {
    x: number
    y: number
    action: 'move' | 'click'
  }
  components: {
    type: 'header' | 'nav' | 'section' | 'button' | 'card' | 'footer'
    x: number
    y: number
    width: number
    height: number
  }[]
  duration: number
}

const animationSteps: AnimationStep[] = [
  {
    id: 1,
    text: "Initialisation de la structure...",
    cursorAction: { x: 15, y: 20, action: 'move' },
    components: [
      { type: 'header', x: 5, y: 5, width: 90, height: 15 },
      { type: 'nav', x: 5, y: 25, width: 90, height: 8 }
    ],
    duration: 1800
  },
  {
    id: 2,
    text: "Création du contenu principal...",
    cursorAction: { x: 50, y: 50, action: 'click' },
    components: [
      { type: 'section', x: 5, y: 38, width: 90, height: 35 },
      { type: 'card', x: 10, y: 45, width: 35, height: 25 },
      { type: 'card', x: 55, y: 45, width: 35, height: 25 }
    ],
    duration: 1800
  },
  {
    id: 3,
    text: "Finalisation du design...",
    cursorAction: { x: 85, y: 80, action: 'move' },
    components: [
      { type: 'footer', x: 5, y: 78, width: 90, height: 15 }
    ],
    duration: 1800
  }
]

interface LoaderProps {
  onComplete?: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [progress, setProgress] = useState(0)
  const [showCursor, setShowCursor] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [activeComponents, setActiveComponents] = useState<any[]>([])
  const [isAnimating, setIsAnimating] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isAnimating) return

    const runAnimation = async () => {
      for (let i = 0; i < animationSteps.length; i++) {
        const step = animationSteps[i]
        setCurrentStep(i)
        
        // Clear text before new step
        setDisplayText("")
        
        // Typewriter effect for new text
        const text = step.text
        for (let j = 0; j <= text.length; j++) {
          setDisplayText(text.substring(0, j))
          await new Promise(resolve => setTimeout(resolve, 40))
        }
        
        // Show cursor with fade in
        setShowCursor(true)
        
        // Calculate cursor position
        const canvas = canvasRef.current
        if (canvas) {
          const targetX = (step.cursorAction.x / 100) * canvas.offsetWidth
          const targetY = (step.cursorAction.y / 100) * canvas.offsetHeight
          
          // Smooth cursor animation
          const steps = 20
          for (let stepNum = 0; stepNum <= steps; stepNum++) {
            const progress = stepNum / steps
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            
            setCursorPosition({
              x: targetX * easeProgress,
              y: targetY * easeProgress
            })
            await new Promise(resolve => setTimeout(resolve, 20))
          }
          
          // Click animation effect
          if (step.cursorAction.action === 'click') {
            const clickEffect = document.createElement('div')
            clickEffect.className = 'absolute w-6 h-6 sm:w-8 sm:h-8 border-2 border-primary/50 rounded-full animate-ping pointer-events-none'
            clickEffect.style.left = `${targetX - (isMobile ? 12 : 16)}px`
            clickEffect.style.top = `${targetY - (isMobile ? 12 : 16)}px`
            canvas.appendChild(clickEffect)
            setTimeout(() => clickEffect.remove(), 600)
          }
        }
        
        // Add components with staggered animation
        const newComponents = step.components.map((comp, index) => ({
          ...comp,
          id: Date.now() + Math.random(),
          opacity: 0,
          scale: 0.9
        }))
        
        setActiveComponents(prev => [...prev, ...newComponents])
        
        // Animate components appearing with delay
        newComponents.forEach((comp, index) => {
          setTimeout(() => {
            setActiveComponents(prev => prev.map(c => 
              c.id === comp.id 
                ? { ...c, opacity: 1, scale: 1 }
                : c
            ))
          }, index * 200)
        })
        
        // Update progress
        const targetProgress = ((i + 1) / animationSteps.length) * 100
        setProgress(targetProgress)
        
        // Wait for step duration
        await new Promise(resolve => setTimeout(resolve, step.duration))
        
        // Clear text between steps (except last step)
        if (i < animationSteps.length - 1) {
          const currentText = step.text
          for (let k = currentText.length; k >= 0; k--) {
            setDisplayText(currentText.substring(0, k))
            await new Promise(resolve => setTimeout(resolve, 20))
          }
        }
      }
      
      // Final step
      setDisplayText("Site prêt !")
      setProgress(100)
      
      // Completion
      setTimeout(() => {
        setIsAnimating(false)
        onComplete?.()
      }, 1500)
    }

    runAnimation()

    return () => {
      setIsAnimating(false)
    }
  }, [onComplete, isAnimating, isMobile])

  const getComponentIcon = (type: string) => {
    const iconClass = "w-3 h-3 sm:w-4 sm:h-4"
    
    switch (type) {
      case 'header': return <Layout className={iconClass} />
      case 'nav': return <Globe className={iconClass} />
      case 'section': return <Monitor className={iconClass} />
      case 'button': return <Code className={iconClass} />
      case 'card': return <Smartphone className={iconClass} />
      case 'footer': return <Layout className={iconClass} />
      default: return <div className="w-3 h-3 bg-primary rounded-sm" />
    }
  }

  const getComponentColor = (type: string) => {
    switch (type) {
      case 'header': return 'bg-blue-500/15 border-blue-500/30'
      case 'nav': return 'bg-purple-500/15 border-purple-500/30'
      case 'section': return 'bg-emerald-500/15 border-emerald-500/30'
      case 'button': return 'bg-amber-500/15 border-amber-500/30'
      case 'card': return 'bg-rose-500/15 border-rose-500/30'
      case 'footer': return 'bg-indigo-500/15 border-indigo-500/30'
      default: return 'bg-primary/15 border-primary/30'
    }
  }

  const getComponentLabel = (type: string) => {
    switch (type) {
      case 'header': return 'Header'
      case 'nav': return 'Nav'
      case 'section': return 'Section'
      case 'button': return 'Button'
      case 'card': return 'Card'
      case 'footer': return 'Footer'
      default: return type
    }
  }

  return (
    <div className="fixed inset-0 bg-background/99 flex items-center justify-center z-50 p-4">
      <div className="text-center space-y-4 sm:space-y-6 max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Création du site
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Construction en cours...
          </p>
        </div>

        {/* Website Canvas */}
        <div className="relative bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] w-full mx-auto shadow-lg overflow-hidden">
          {/* Browser window */}
          <div className="absolute top-0 left-0 right-0 h-5 sm:h-6 bg-muted/80 rounded-t-lg sm:rounded-t-xl border-b border-border/50 flex items-center px-2 sm:px-3">
            <div className="flex space-x-1 sm:space-x-1.5">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 text-center">
              <div className="bg-background/80 rounded px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-muted-foreground mx-2 sm:mx-4 truncate">
                mon-site.com
              </div>
            </div>
          </div>
          
          {/* Content area */}
          <div 
            ref={canvasRef}
            className="pt-6 sm:pt-8 h-full relative min-h-[160px] sm:min-h-[200px] md:min-h-[250px]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)`,
              backgroundSize: isMobile ? '20% 20%' : '10% 10%',
            }}
          >
            {/* Components */}
            {activeComponents.map((comp) => (
              <div
                key={comp.id}
                className={`absolute border rounded-md sm:rounded-lg transition-all duration-500 ease-out flex flex-col items-center justify-center gap-1 p-1 sm:p-2 ${getComponentColor(comp.type)}`}
                style={{
                  left: `${comp.x}%`,
                  top: `${comp.y}%`,
                  width: `${comp.width}%`,
                  height: `${comp.height}%`,
                  opacity: comp.opacity,
                  transform: `scale(${comp.scale})`,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  zIndex: comp.type === 'section' ? 1 : 2,
                }}
              >
                {getComponentIcon(comp.type)}
                <span className="text-[8px] sm:text-[10px] font-medium text-foreground/70 text-center leading-tight">
                  {getComponentLabel(comp.type)}
                </span>
              </div>
            ))}
            
            {/* Animated Cursor */}
            {showCursor && (
              <div
                className="absolute pointer-events-none z-30 transition-all duration-100 ease-linear"
                style={{
                  left: `${cursorPosition.x}px`,
                  top: `${cursorPosition.y}px`,
                  transform: 'translate(-4px, -4px)'
                }}
              >
                <MousePointer className="w-4 h-4 sm:w-5 sm:h-5 text-primary drop-shadow-md" />
                <div className="absolute -top-1 -left-1 w-6 h-6 sm:w-7 sm:h-7 bg-primary/10 rounded-full animate-ping"></div>
              </div>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-1.5">
              <span>Progression</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="bg-muted/50 rounded-full h-1 sm:h-1.5 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Loading Info */}
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-card/50 border border-border rounded-lg p-3 sm:p-4">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-full text-center">
                <div className="text-base sm:text-lg font-medium text-foreground min-h-[20px] sm:min-h-[24px]">
                  {displayText}
                  <span className="inline-block w-1 h-4 sm:h-5 bg-primary ml-1 animate-pulse"></span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Étape {currentStep + 1} sur {animationSteps.length}
                </p>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Complété</div>
                </div>
                
                {/* Spinner */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              </div>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex justify-center items-center gap-3 sm:gap-4">
            {animationSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  index < currentStep 
                    ? 'bg-primary' 
                    : index === currentStep 
                    ? 'bg-primary/60 animate-pulse' 
                    : 'bg-muted'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            setIsAnimating(false)
            onComplete?.()
          }}
          className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 hover:bg-muted/50 rounded-lg transition-all duration-200"
        >
          Passer l'animation
        </button>
      </div>
    </div>
  )
}

export default Loader