"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  pauseOnHover?: boolean
  reverse?: boolean
  children: React.ReactNode
}

export const Marquee = ({ 
  children, 
  className, 
  pauseOnHover = false,
  reverse = false,
  ...props 
}: MarqueeProps) => {
  return (
    <div 
      className={cn(
        "group flex overflow-hidden p-2",
        className
      )}
      {...props}
    >
      <div 
        className={cn(
          "flex shrink-0 justify-around",
          "group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {children}
      </div>
      <div 
        className={cn(
          "flex shrink-0 justify-around",
          "group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {children}
      </div>
    </div>
  )
}