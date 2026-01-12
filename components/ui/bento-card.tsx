"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  className?: string
  background?: React.ReactNode
  children?: React.ReactNode
  Icon?: React.ComponentType<{ className?: string }>
  description?: string
  href?: string
  cta?: string
}

export const BentoCard = ({
  name,
  className,
  background,
  children,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => {
  return (
    <div
      key={name}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-card/80 hover:shadow-xl hover:shadow-blue-500/10",
        className
      )}
      {...props}
    >
      <div>{background}</div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          {children}
        </div>
        
        {href && cta && (
          <a
            href={href}
            className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {cta}
          </a>
        )}
      </div>
    </div>
  )
}