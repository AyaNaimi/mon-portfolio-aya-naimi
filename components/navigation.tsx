"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Shield } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

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
  const { theme, setTheme } = useTheme()

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
        backdropFilter: 'blur(10px) saturate(180%)',
        WebkitBackdropFilter: 'blur(10px) saturate(180%)'
      }}
      aria-label="Navigation principale"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1 px-3">
          

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-foreground font-medium hover:text-primary transition-colors duration-200 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                role="menuitem"
                aria-label={`Aller à la section ${item.name}`}
                title={`Naviguer vers ${item.name}`}
              >
                {item.name}
              </a>
            ))}

            {/* Admin Icon */}
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-muted/30"
              title="Administration"
            >
              <Shield className="h-5 w-5" />
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4 relative overflow-hidden"
              aria-label={`Basculer vers le thème ${theme === "dark" ? "clair" : "sombre"}`}
              title={`Basculer vers le thème ${theme === "dark" ? "clair" : "sombre"}`}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 rounded-md hover:bg-muted/30"
            >
              <Shield className="h-5 w-5" />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-muted/30"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-muted/30 transition-all"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-background/50 backdrop-blur-[20px] border border-white/15 rounded-xl mt-3 p-4 flex flex-col gap-2 shadow-2xl/50">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 px-3 text-foreground hover:text-primary hover:bg-muted/30 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
