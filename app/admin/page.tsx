"use client"

import { LoginForm } from "@/components/admin/login-form"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Pendant le chargement de la session
  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-background">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  //     </div>
  //   )
  // }

  // Si l'utilisateur n'est pas connecté → afficher le formulaire de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <LoginForm />
      </div>
    )
  }

  // Si connecté → afficher le tableau de bord
  return (
    <div className="min-h-screen bg-background">
      <AdminDashboard />
    </div>
  )
}
