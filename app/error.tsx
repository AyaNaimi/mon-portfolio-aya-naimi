'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-6 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20 mb-4">500</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Une erreur est survenue
            </h2>
            <p className="text-muted-foreground">
              Désolé, quelque chose s'est mal passé. Veuillez réessayer.
            </p>
          </div>

          <div className="space-y-4">
            <Button onClick={reset} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
