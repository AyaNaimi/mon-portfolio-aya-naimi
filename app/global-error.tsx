'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="fr">
      <body>
        <main style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          backgroundColor: '#0a0a0a',
          color: '#fafafa'
        }}>
          <div style={{ maxWidth: '28rem', width: '100%', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '6rem', fontWeight: 'bold', opacity: 0.2, marginBottom: '1rem' }}>500</h1>
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Une erreur critique est survenue
              </h2>
              <p style={{ color: '#a1a1aa' }}>
                Désolé, quelque chose s'est mal passé. Veuillez réessayer.
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={reset}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Réessayer
              </button>
              
              <a 
                href="/"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: '#fafafa',
                  border: '1px solid #27272a',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '1rem'
                }}
              >
                Retour à l'accueil
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
