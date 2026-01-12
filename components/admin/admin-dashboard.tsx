"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { PermissionGuard } from "@/components/admin/permission-guard"
import { ProjectsManager } from "@/components/admin/projects-manager"
import { CertificatesManager } from "@/components/admin/CertificatesSection"
import { MessagesManager } from "@/components/admin/messages-manager"
import { CVManager } from "@/components/admin/cv-manager"
import { AboutImagesManagerEnhanced } from "@/components/admin/about-images-manager-enhanced"
import { createClient } from "@/lib/supabase/client"
import {
  LogOut,
  Settings,
  FileText,
  MessageSquare,
  BarChart3,
  Users,
  Plus,
} from "lucide-react"

export function AdminDashboard() {
  const { logout, user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    visitors: 0,
    views: 0,
  })

  const supabase = createClient()

  // 🔹 Charger les stats en temps réel
  useEffect(() => {
    const loadStats = async () => {
      try {
        const { count: projectsCount } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })

        const { count: messagesCount } = await supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true })

        // Tu peux créer une table visitors plus tard
        setStats({
          projects: projectsCount ?? 0,
          messages: messagesCount ?? 0,
          visitors: 1234, // Valeur temporaire
          views: 5678, // Valeur temporaire
        })
      } catch (error) {
        console.error("Erreur chargement statistiques:", error)
      }
    }

    loadStats()
  }, [])

  const statsDisplay = [
    {
      title: "Projets",
      value: stats.projects.toString(),
      change: "+2 ce mois",
      icon: <FileText className="h-6 w-6" />,
      color: "text-blue-500",
    },
    {
      title: "Messages",
      value: stats.messages.toString(),
      change: "+8 cette semaine",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "text-green-500",
    },
    {
      title: "Visiteurs",
      value: stats.visitors.toLocaleString(),
      change: "+15% ce mois",
      icon: <Users className="h-6 w-6" />,
      color: "text-purple-500",
    },
    {
      title: "Vues",
      value: stats.views.toLocaleString(),
      change: "+23% ce mois",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-gradient">Admin</div>
              <Badge variant="secondary" className="glass">
                {user?.username || "Admin"} • {user?.role || "admin"}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <PermissionGuard resource="settings" fallback={null}>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </PermissionGuard>
              <Button
                variant="ghost"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="cv">CV</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="certificats">Certificats</TabsTrigger>
          </TabsList>
          

          <TabsContent value="dashboard" className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">
                Tableau de bord
              </h1>
              <p className="text-muted-foreground">
                Gérez votre portfolio et suivez vos statistiques en direct
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsDisplay.map((stat, index) => (
                <Card key={index} className="glass p-6 animate-tilt">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-green-500 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-primary/20 ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="cv">
            <CVManager />
          </TabsContent>

          <TabsContent value="photos">
            <AboutImagesManagerEnhanced />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesManager />
          </TabsContent>

           <TabsContent value="certificats">
            <CertificatesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
