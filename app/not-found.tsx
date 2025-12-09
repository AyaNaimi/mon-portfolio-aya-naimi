import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-6 text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Error Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Page non trouvée
            </h2>
            <p className="text-muted-foreground">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </div>

          {/* Navigation Options */}
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/#about" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Découvrir mon profil
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Sections populaires
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link 
                href="/#projects" 
                className="text-sm text-primary hover:underline"
              >
                Projets
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/#skills" 
                className="text-sm text-primary hover:underline"
              >
                Compétences
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                href="/#contact" 
                className="text-sm text-primary hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// Generate metadata for SEO
export const metadata = {
  title: "404 - Page non trouvée | Aya Naimi Portfolio",
  description: "La page que vous recherchez n'existe pas. Retournez au portfolio d'Aya Naimi pour découvrir ses projets et compétences en développement web.",
  robots: {
    index: false,
    follow: false,
  },
}