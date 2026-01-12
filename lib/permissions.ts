export type UserRole = "admin" | "editor" | "viewer"

export interface Permission {
  action: string
  resource: string
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    { action: "view", resource: "dashboard" },
    { action: "manage", resource: "projects" },
    { action: "manage", resource: "messages" },
    { action: "manage", resource: "settings" },
    { action: "manage", resource: "users" },
  ],
  editor: [
    { action: "view", resource: "dashboard" },
    { action: "manage", resource: "projects" },
    { action: "view", resource: "messages" },
  ],
  viewer: [
    { action: "view", resource: "dashboard" },
    { action: "view", resource: "projects" },
  ],
}

export function hasPermission(role: UserRole, action: string, resource: string): boolean {
  const permissions = rolePermissions[role] || []
  return permissions.some((p) => p.action === action && p.resource === resource)
}

export function canAccess(role: UserRole, resource: string): boolean {
  return hasPermission(role, "view", resource) || hasPermission(role, "manage", resource)
}
