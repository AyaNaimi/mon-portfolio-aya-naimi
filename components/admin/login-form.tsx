"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const { toast } = useToast()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!credentials.username || !credentials.password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Tentative de connexion avec Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.username, // ou remplace par "credentials.username" si c’est un email
        password: credentials.password,
      })

      if (error || !data.user) {
        console.log("[Supabase] Login failed:", error)
        toast({
          title: "Erreur de connexion",
          description: "Nom d'utilisateur ou mot de passe incorrect.",
          variant: "destructive",
        })
        setCredentials((prev) => ({ ...prev, password: "" }))
      } else {
        console.log("[Supabase] Login successful:", data.user)
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${data.user.email}`,
        })
        // Rediriger vers /admin
        window.location.href = "/admin"
      }
    } catch (error) {
      console.error("[Login error]:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/10 animate-float" />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-secondary/10 animate-float"
        style={{ animationDelay: "2s" }}
      />

      <Card className="glass w-full max-w-md p-8 animate-tilt z-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full gradient-violet-cyan flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gradient mb-2 font-heading">Administration</h1>
          <p className="text-muted-foreground">Connectez-vous pour accéder au panneau d'administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Email ou nom d'utilisateur
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleInputChange}
                disabled={isLoading}
                className="glass pl-10 border-primary/30 focus:border-primary"
                placeholder="admin@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={credentials.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className="glass pl-10 pr-10 border-primary/30 focus:border-primary"
                placeholder="••••••••"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !credentials.username || !credentials.password}
            className="w-full gradient-violet-cyan text-white hover:opacity-90 transition-opacity"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </Card>
    </div>
  )
}
