declare module "scrollreveal" {
  export type ScrollRevealOrigin = "top" | "bottom" | "left" | "right"

  export interface ScrollRevealOptions {
    delay?: number
    distance?: string
    duration?: number
    easing?: string
    interval?: number
    opacity?: number
    origin?: ScrollRevealOrigin
    reset?: boolean
    rotate?: { x?: number; y?: number; z?: number }
    scale?: number
    cleanup?: boolean
    viewOffset?: { top?: number; right?: number; bottom?: number; left?: number }
    viewFactor?: number
  }

  export interface ScrollRevealInstance {
    reveal(target: string | Element | Element[], options?: ScrollRevealOptions): ScrollRevealInstance
    clean(target?: string | Element | Element[]): ScrollRevealInstance
    destroy(): ScrollRevealInstance
  }

  export default function ScrollReveal(options?: ScrollRevealOptions): ScrollRevealInstance
}

