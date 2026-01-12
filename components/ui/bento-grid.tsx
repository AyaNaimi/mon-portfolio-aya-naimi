"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const BentoGrid = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

BentoGrid.displayName = "BentoGrid"