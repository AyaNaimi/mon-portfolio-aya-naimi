"use client"

import { useEffect } from "react"

export function ScrollRevealProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Dynamic import to prevent SSR issues
    import("scrollreveal").then((ScrollRevealModule) => {
      const ScrollReveal = ScrollRevealModule.default
      
      const sr = ScrollReveal({
        distance: "48px",
        duration: 900,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        interval: 120,
        origin: "bottom",
        viewFactor: 0.1,
        reset: false,
        // Don't hide elements initially - only animate them
        opacity: 1,
      })

      // Only reveal elements that have the data-sr attribute
      sr.reveal("[data-sr]")
      sr.reveal("[data-sr-stagger]", { interval: 120 })

      return () => {
        if (sr.destroy) {
          sr.destroy()
        }
      }
    })
  }, [])

  return null
}

export default ScrollRevealProvider

