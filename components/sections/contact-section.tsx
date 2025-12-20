"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  User, 
  MessageSquare,
  Clock,
  Star,
  Sparkles,
  Zap,
  Heart,
  Shield
} from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Validation en temps réel
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Le nom doit contenir au moins 2 caractères" : undefined
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? "Veuillez entrer un email valide" : undefined
      case "phone":
        const phoneRegex = /^\+\(\d{3}\)\s?\d{9}$/
        return !phoneRegex.test(value) ? "Format: +(212) 612345678" : undefined
      case "subject":
        return value.trim().length < 3 ? "Le sujet doit contenir au moins 3 caractères" : undefined
      case "message":
        return value.trim().length < 10 ? "Le message doit contenir au moins 10 caractères" : undefined
      default:
        return undefined
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Validation en temps réel
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
    setActiveField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
    setTimeout(() => setActiveField(null), 200)
  }

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.subject.trim() &&
      formData.message.trim() &&
      Object.values(errors).every(error => !error)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation finale
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData])
      if (error) newErrors[key as keyof FormErrors] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Message envoyé ! 🎉",
          description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
        })
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setErrors({})
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        throw new Error("Erreur lors de l'envoi")
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputFields = [
    {
      name: "name",
      label: "Nom complet",
      placeholder: "Votre nom",
      icon: User,
      type: "text"
    },
    {
      name: "email", 
      label: "Email",
      placeholder: "votre@email.com",
      icon: Mail,
      type: "email"
    },
    {
      name: "phone",
      label: "Téléphone", 
      placeholder: "+(212) 612345678",
      icon: Phone,
      type: "tel"
    },
    {
      name: "subject",
      label: "Sujet",
      placeholder: "Sujet de votre message",
      icon: MessageSquare,
      type: "text"
    }
  ]

  if (isSubmitted) {
    return (
      <section ref={sectionRef} id="contact" className="pt-32 pb-20 relative overflow-hidden -mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-bounce mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Message envoyé avec succès !
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Merci pour votre message. Je vous répondrai dans les plus brefs délais.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Envoyer un autre message
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="contact" className="pt-32 pb-20 relative overflow-hidden -mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#BF1A1A]/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#BF1A1A]" />
            <span className="text-sm font-medium text-[#BF1A1A]">Contactez-moi</span>
          </div>
               
       {/* ================= TITRE ULTRA PREMIUM ================= */}
<div className="relative text-center mb-24">
  {/* AURA SOFT */}
  {/* <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    <div
      className="
        w-[480px] h-[160px]
        rounded-full
        bg-gradient-to-r
        from-indigo-500/20
        via-sky-400/25
        to-indigo-500/20
        blur-[110px]
        animate-aura-slow
      "
    />
  </div> */}

  {/* TITRE */}
  <h2
    className="
    outline-animated
    font-orbitron
    text-5xl md:text-6xl lg:text-7xl
    uppercase
    tracking-widest
    text-center
  "
  data-text="Une idée de projet ?"
  >
Une idée de projet ?

    {/* SCRIBBLE DESSINÉ */}
    {/* <svg
      className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-[115%] h-6"
      viewBox="0 0 320 40"
      fill="none"
    >
      <path
        d="M10 28 C45 20, 90 34, 135 26 C180 18, 230 32, 270 25 C290 22, 305 30, 315 27"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scribble-draw"
      />
    </svg> */}
  </h2>

  {/* LIGNE TECH FINE */}
  {/* <div className="mt-10 flex justify-center">
    <div className="relative h-px w-52 bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-scan-ultra" />
    </div>
  </div> */}

  {/* SOUS-TITRE */}
  <p className="mt-8 text-[11px] md:text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
  Discutons de vos besoins et créons quelque chose d'extraordinaire ensemble.
  </p>
</div>


        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  Restons en contact
                </h3>
                <p className="text-muted-foreground mb-8">
                  Je suis toujours ouvert aux nouvelles opportunités et collaborations passionnantes.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    value: "ayanaimi21@gmail.com",
                    bgColor: "bg-blue-500/10 border-blue-500/20",
                    iconColor: "text-blue-600",
                    hoverColor: "hover:bg-blue-500/15"
                  },
                  {
                    icon: Phone,
                    title: "Téléphone",
                    value: "+212 665 36 35 85",
                    bgColor: "bg-green-500/10 border-green-500/20",
                    iconColor: "text-green-600",
                    hoverColor: "hover:bg-green-500/15"
                  },
                  {
                    icon: MapPin,
                    title: "Localisation",
                    value: "Casablanca, Maroc",
                    bgColor: "bg-purple-500/10 border-purple-500/20",
                    iconColor: "text-purple-600",
                    hoverColor: "hover:bg-purple-500/15"
                  },
                  {
                    icon: Clock,
                    title: "Réponse",
                    value: "< 24 heures",
                    bgColor: "bg-orange-500/10 border-orange-500/20",
                    iconColor: "text-orange-600",
                    hoverColor: "hover:bg-orange-500/15"
                  }
                ].map((item, index) => (
                  <Card 
                    key={index} 
                    className={`p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group border ${item.bgColor} ${item.hoverColor} backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`relative p-3 rounded-lg ${item.bgColor} group-hover:scale-110 transition-all duration-300 border`}>
                        <item.icon className={`h-6 w-6 ${item.iconColor} relative z-10`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">{item.title}</h4>
                        <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-mono text-sm">{item.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-card/95 rounded-xl shadow-lg backdrop-blur-xl border border-border overflow-hidden">
              {/* Terminal window header */}
              <div className="flex items-center gap-2 p-3 bg-muted/50 border-b border-border text-foreground text-sm font-mono">
                <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <div className="flex-1 text-center opacity-70">ayanaimi21@gmail.com</div>
              </div>

              <div className="p-6 text-foreground font-mono">
                <p className="text-lg text-foreground">Hey there! Ready to connect? 🔗</p>
                <div className="border-b border-dashed border-border/60 my-3"></div>
                <p className="text-muted-foreground">
                  Fill out the form below to get in touch!
                </p>
                
              <form onSubmit={handleSubmit} className="space-y-6 ">
                {/* Terminal progress indicator */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
                    <span>[$] Form completion:</span>
                    <span>{Math.round((Object.values(formData).filter(v => v.trim()).length / 5) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted border border-border h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500 relative overflow-hidden"
                      style={{ width: `${(Object.values(formData).filter(v => v.trim()).length / 5) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {inputFields.map((field) => (
                    <div key={field.name} className={field.name === 'subject' ? 'md:col-span-2' : ''}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-muted-foreground mb-2 font-mono">
                        <span className="text-blue-500">$</span> {field.label.toLowerCase()}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <field.icon className={`h-5 w-5 transition-colors duration-200 ${
                            focusedField === field.name ? 'text-blue-500' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required
                          value={formData[field.name as keyof FormData]}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus(field.name)}
                          onBlur={handleBlur}
                          className={`bg-input border-border text-foreground placeholder:text-muted-foreground font-mono transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 placeholder:text-purple-500 ${
                            errors[field.name as keyof FormErrors] 
                              ? 'border-red-500 focus:border-red-400' 
                              : focusedField === field.name 
                                ? 'border-blue-500' 
                                : 'hover:border-border'
                          } ${activeField === field.name ? 'scale-[1.02]' : ''} pl-10`}
                          placeholder={field.placeholder}
                        />
                        {errors[field.name as keyof FormErrors] && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
                          </div>
                        )}
                        {!errors[field.name as keyof FormErrors] && formData[field.name as keyof FormData] && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                        )}
                      </div>
                      {errors[field.name as keyof FormErrors] && (
                        <p className="text-red-500 text-sm mt-1 animate-in slide-in-from-left-1 font-mono">
                          <span className="text-red-500">ERROR:</span> {errors[field.name as keyof FormErrors]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2 font-mono">
                    <span className="text-blue-500">$</span> message_content
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    className={`bg-input border-border text-foreground placeholder:text-muted-foreground font-mono transition-all duration-300 resize-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 placeholder:text-purple-500 ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-400' 
                        : focusedField === 'message' 
                          ? 'border-blue-500' 
                          : 'hover:border-border'
                    } ${activeField === 'message' ? 'scale-[1.01]' : ''}`}
                    placeholder="Describe your project or request in detail..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 animate-in slide-in-from-left-1 font-mono">
                      <span className="text-red-500">ERROR:</span> {errors.message}
                    </p>
                  )}
                  <div className="flex justify-between text-xs text-muted-foreground mt-1 font-mono">
                    <span>[$] help_me_understand_you()</span>
                    <span>{formData.message.length}/500</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className={`w-full transition-all duration-300 font-mono text-sm rounded-md ${
                    isFormValid() 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white border border-purple-500' 
                      : 'cursor-not-allowed opacity-50 bg-muted text-muted-foreground border border-border'
                  }`}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      [PROCESSING] transmitting_message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      $ execute_transmit_message()
                    </>
                  )}
                </Button>

                
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
