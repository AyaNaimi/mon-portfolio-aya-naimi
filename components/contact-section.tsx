"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle } from "lucide-react"

function ContactSection() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);

  const { toast } = useToast()
  const [messages, setMessages] = useLocalStorage<ContactMessage[]>("portfolio-messages", [])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // ✅ ajouté
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      })
      return
    }

    // ✅ Validation du numéro au format +(XXX) XXXXXX
    const phoneRegex = /^\+\(\d{1,3}\)\s?\d{6,}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Numéro invalide",
        description: "Le numéro doit être au format +(212) 612345678.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split("T")[0],
        status: "new",
      }

      setMessages((prev) => [newMessage, ...prev])

      toast({
        title: "Message envoyé !",
        description: "Je vous répondrai dans les plus brefs délais.",
      })

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setIsSubmitting(false)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "aya.naimi@example.com",
      href: "mailto:aya.naimi@example.com",
      color: "cyan",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+(212) 612345678",
      href: "tel:+212612345678",
      color: "green",
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Casablanca, Maroc",
      href: "#",
      color: "purple",
    },
    {
      icon: Clock,
      label: "Disponibilité",
      value: "Disponible pour nouveaux projets",
      href: "#",
      color: "orange",
    },
  ]

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl mb-6">
            Contactez-moi
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Vous avez un projet en tête ? Discutons-en ensemble !
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <Card className="border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                <Send className="w-6 h-6 text-primary" />
                Envoyez-moi un message
              </CardTitle>
              <p className="text-muted-foreground">Je réponds généralement sous 24h</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      name="name"
                      placeholder="Votre nom *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-ring disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Votre email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-ring disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* ✅ Champ téléphone ajouté ici */}
                <div className="space-y-2">
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Numéro de téléphone *(+(212) 612345678)"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-ring disabled:opacity-50"
                  />
                </div>

                <Input
                  name="subject"
                  placeholder="Sujet *"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-ring disabled:opacity-50"
                />

                <Textarea
                  name="message"
                  placeholder="Votre message *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-ring disabled:opacity-50"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-violet-cyan text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Informations de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => info.href !== "#" && window.open(info.href, "_blank")}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                      <info.icon className="w-6 h-6 text-primary group-hover:animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                        {info.label}
                      </p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 backdrop-blur-sm hover:from-primary/15 hover:to-accent/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center animate-pulse">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Statut actuel</h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-green-400 font-medium m-0">Disponible pour nouveaux projets</p>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">Temps de réponse moyen : 24h</p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span>{messages.length} messages reçus</span>
                    <span>•</span>
                    <span>100% de réponse</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  date: string
  status: "new" | "read" | "replied" | "closed"
}

export { ContactSection }
export default ContactSection
