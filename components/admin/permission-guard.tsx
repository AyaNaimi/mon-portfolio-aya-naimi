"use client"

import type React from "react"
import { useAuth } from "@/hooks/use-auth"
import { canAccess, hasPermission } from "@/lib/permissions"

interface PermissionGuardProps {
  resource: string
  action?: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({ resource, action = "view", children, fallback }: PermissionGuardProps) {
  const { user } = useAuth()

  if (!user) {
    return fallback || null
  }

  const hasAccess =
    action === "view" ? canAccess(user.role as any, resource) : hasPermission(user.role as any, action, resource)

  return <>{hasAccess ? children : fallback}</>
}
