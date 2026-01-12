"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AuthUser {
  id: string
  username?: string
  email: string
  role?: string
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // ✅ Charge l'utilisateur local avant de vérifier Supabase
  useEffect(() => {
    const savedUser = localStorage.getItem("adminUser")
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setIsAuthenticated(true)
    }
    checkAuthStatus()
  }, [])

  // ✅ Vérifie la session Supabase
  async function checkAuthStatus() {
    try {
      const { data } = await supabase.auth.getSession()
      const session = data?.session

      if (session?.user) {
        const userData = await fetchAdminUser(session.user.email)
        if (userData) {
          setUser(userData)
          setIsAuthenticated(true)
          localStorage.setItem("adminUser", JSON.stringify(userData))
        } else {
          setIsAuthenticated(false)
        }
      } else {
        const savedUser = localStorage.getItem("adminUser")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de session :", error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchAdminUser(email?: string | null): Promise<AuthUser | null> {
    if (!email) return null
    const { data, error } = await supabase
      .from("admin_users")
      .select("id, username, email, role")
      .eq("email", email)
      .single()

    if (error) {
      console.warn("⚠️ Aucun admin trouvé :", error.message)
      return null
    }
    return data as AuthUser
  }

  // ✅ Login via ton endpoint `/api/admin/login`
  async function login(username: string, password: string): Promise<boolean> {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        console.error("Erreur HTTP login:", res.status)
        return false
      }

      const result = await res.json()
      if (!result.success) {
        console.warn("Login échoué :", result.error)
        return false
      }

      // ✅ Sauvegarde locale
      localStorage.setItem("adminUser", JSON.stringify(result.user))
      setUser(result.user)
      setIsAuthenticated(true)

      router.push("/admin")
      return true
    } catch (err) {
      console.error("Erreur login:", err)
      return false
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    localStorage.removeItem("adminUser")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/login")
  }

  return { isAuthenticated, isLoading, user, login, logout }
}
