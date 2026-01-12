"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Accueil", href: "#hero" },
  { name: "À propos", href: "#about" },
  { name: "Compétences", href: "#skills" },
  { name: "Certificats", href: "#certificates" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-3 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/20 backdrop-blur-3xl border border-white/20 shadow-xl/10 rounded-4xl scale-105"
          : "bg-background/20 backdrop-blur-[24px] border border-white/10 shadow-xl/10 rounded-4xl scale-100"
      }`}
      style={{
        backdropFilter: "blur(10px) saturate(180%)",
        WebkitBackdropFilter: "blur(10px) saturate(180%)",
      }}
      aria-label="Navigation principale"
      role="navigation"
    >
      <div className="container-responsive">
        <div className="flex justify-between items-center py-2 px-2 sm:px-3">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-foreground font-medium hover:text-primary transition-colors duration-200 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Nav Toggle - icône à droite */}
          <div className="md:hidden flex justify-end ">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-muted/30 transition-all w-4 h-4"
              aria-label={isOpen ? "Fermer le menu mobile" : "Ouvrir le menu mobile"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="md:hidden fixed top-0 right-0 h-screen w-72 z-50 transition-all duration-300 bg-background/95 backdrop-blur-[18px] border-l border-white/15 rounded-l-2xl shadow-2xl/50 p-6 flex flex-col items-end gap-4"
            style={{
              animation: "slideInRight .35s cubic-bezier(.4,0,.2,1) 1",
            }}
          >
            <div className="flex justify-between items-center mb-6 w-full">
              <span className="font-bold text-lg">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted/30 transition-all"
                aria-label="Fermer le menu mobile"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex flex-col gap-2 w-full">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted/30 rounded-lg transition-all duration-200 font-medium text-base text-right"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  )
}
