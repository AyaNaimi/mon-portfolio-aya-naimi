"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle2, Circle, Loader, MessageCircle } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
  phone?: string // <-- ajout d’un champ optionnel pour le numéro WhatsApp
}

export function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/contact")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Message[] = await response.json()
      setMessages(data)
    } catch (error) {
      console.error("[v0] Failed to fetch messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return
    try {
      setIsLoading(true)
      const response = await fetch(`/api/contact?id=${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      setMessages(messages.filter((msg) => msg.id !== id))
    } catch (error) {
      console.error("[v0] Failed to delete message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/contact?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      setMessages(messages.map((msg) => (msg.id === id ? { ...msg, read: !currentRead } : msg)))
    } catch (error) {
      console.error("[v0] Failed to update message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Fonction pour ouvrir WhatsApp Web avec un message pré-rempli
  const handleReplyWhatsApp = (msg: Message) => {
    let phoneNumber = msg.phone
    if (!phoneNumber) {
      alert("Aucun numéro de téléphone disponible pour ce contact.")
      return
    }

    // Nettoyage du numéro (retire espaces, +, etc.)
    phoneNumber = phoneNumber.replace(/\D/g, "")

    const messageText = `Bonjour ${msg.name},\n\nJe vous réponds concernant votre message : "${msg.subject}"\n\n${msg.message}`
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`
    window.open(whatsappURL, "_blank")
  }

  const unreadCount = messages.filter((msg) => !msg.read).length

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gestion des Messages</CardTitle>
            <CardDescription>Consultez et gérez les messages reçus via le formulaire de contact.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} non lus</Badge>}
            <Button
              size="sm"
              variant="outline"
              onClick={fetchMessages}
              disabled={isLoading}
              className="glass bg-transparent"
            >
              {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : "Actualiser"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Aucun message pour le moment.</p>
        ) : (
          <div className="space-y-6">
            {messages
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((message) => (
                <Card key={message.id} className={`p-4 ${message.read ? "opacity-60" : ""}`}>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => handleToggleRead(message.id, message.read)}
                          disabled={isLoading}
                        >
                          {message.read ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-yellow-500" />
                          )}
                        </Button>
                        <h3 className="font-semibold text-lg">{message.subject}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        De : {message.name} ({message.email})
                      </p>
                      {message.phone && (
                        <p className="text-xs text-muted-foreground">📞 {message.phone}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(message.created_at), "dd MMM yyyy HH:mm", { locale: fr })}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-green-500 hover:text-green-600"
                        onClick={() => handleReplyWhatsApp(message)}
                        disabled={isLoading}
                        title="Répondre sur WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteMessage(message.id)}
                        disabled={isLoading}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm text-foreground whitespace-pre-wrap">{message.message}</p>
                </Card>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
