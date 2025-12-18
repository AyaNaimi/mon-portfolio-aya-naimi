import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { Suspense } from "react"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { AdvancedAnimationProvider } from "@/components/advanced-animation-provider"
import { LoaderWrapper } from "@/components/loader-wrapper"
import "@/components/ui/advanced-scroll-animations.css"
import "@/components/ui/styled-titles.css"
import "./globals.css"

// ✅ Police Google Geist
const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Aya Naimi - Développeuse Full-Stack & Créatrice d'Expériences Digitales",
    template: "%s | Aya Naimi Portfolio"
  },
  description: "Portfolio professionnel d'Aya Naimi, développeuse full-stack spécialisée en React, Next.js, TypeScript et technologies modernes. Création d'applications web performantes et d'expériences utilisateur exceptionnelles.",
  keywords: [
    "Aya Naimi", "développeuse full-stack", "React", "Next.js", "TypeScript", "Node.js", 
    "portfolio développeur", "développement web", "frontend", "backend", "UI/UX", 
    "application web", "JavaScript", "typescript", "développeuse web", "créatrice digitale",
    "MongoDB", "PostgreSQL", "API REST", "GraphQL", "Tailwind CSS", "développeur marocain"
  ],
  authors: [{ name: "Aya Naimi", url: "https://mon-portfolio-aya-naimi.vercel.app" }],
  creator: "Aya Naimi",
  publisher: "Aya Naimi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mon-portfolio-aya-naimi.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mon-portfolio-aya-naimi.vercel.app",
    title: "Aya Naimi - Développeuse Full-Stack & Créatrice d'Expériences Digitales",
    description: "Portfolio professionnel d'Aya Naimi, développeuse full-stack spécialisée en React, Next.js, TypeScript et technologies modernes.",
    siteName: "Portfolio Aya Naimi",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio d'Aya Naimi - Développeuse Full-Stack",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Aya Naimi - Développeuse Full-Stack",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aya Naimi - Développeuse Full-Stack & Créatrice d'Expériences Digitales",
    description: "Portfolio professionnel d'Aya Naimi, développeuse full-stack spécialisée en React, Next.js, TypeScript et technologies modernes.",
    creator: "@ayanaimi_dev",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "rTALs6rInnGNKGs5TFps-aoD7uwgGv4l--6aL9g3sgQ",
  },
  icons: {
    icon: "/application.png",
    shortcut: "/application.png",
    apple: "/application.png",
  },
  manifest: "/manifest.json",
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
<script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MQ8CTDKN');`,
      }}
    />
           
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Aya Naimi",
              "jobTitle": "Développeuse Full-Stack",
              "description": "Développeuse full-stack spécialisée en React, Next.js, TypeScript et technologies modernes",
              "url": "https://mon-portfolio-aya-naimi.vercel.app",
              "image": "https://mon-portfolio-aya-naimi.vercel.app/profile-image.jpg",
              "sameAs": [
                "https://linkedin.com/in/ayanaimi",
                "https://github.com/ayanaimi",
                "https://twitter.com/ayanaimi_dev"
              ],
              "knowsAbout": [
                "React", "Next.js", "TypeScript", "Node.js", "JavaScript", 
                "Frontend Development", "Backend Development", "UI/UX Design",
                "MongoDB", "PostgreSQL", "API Development", "GraphQL"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance",
                "url": "https://mon-portfolio-aya-naimi.vercel.app"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Formation en Développement Web"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MA",
                "addressRegion": "Casablanca"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Professional",
                "email": "aya.naimi@example.com",
                "availableLanguage": ["French", "English"]
              }
            }),
          }}
        />
        
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Portfolio Aya Naimi",
              "description": "Portfolio professionnel d'Aya Naimi, développeuse full-stack",
              "url": "https://mon-portfolio-aya-naimi.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mon-portfolio-aya-naimi.vercel.app/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Person",
                "name": "Aya Naimi",
                "url": "https://mon-portfolio-aya-naimi.vercel.app"
              }
            }),
          }}
        />

        {/* Hreflang for international SEO */}
        <link rel="alternate" hrefLang="fr-FR" href="https://mon-portfolio-aya-naimi.vercel.app" />
        <link rel="alternate" hrefLang="en-US" href="https://mon-portfolio-aya-naimi.vercel.app/en" />
        <link rel="alternate" hrefLang="x-default" href="https://mon-portfolio-aya-naimi.vercel.app" />
        
           <meta name="robots" content="index, follow"/>
        <meta
          name="google-site-verification"
          content="rTALs6rInnGNKGs5TFps-aoD7uwgGv4l--6aL9g3sgQ"
        />
        <style>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </head>
      <body className={`${geist.className} ${geistMono.className} antialiased`}>
<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-MQ8CTDKN"
    height={0}
    width={0}
    style={{ display: "none", visibility: "hidden" }}
  ></iframe>
</noscript>

        <Suspense fallback={null}>
          <AdvancedAnimationProvider>
            <SmoothCursor />
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              <LoaderWrapper>
                {children}
                <Toaster />
              </LoaderWrapper>
            </ThemeProvider>
          </AdvancedAnimationProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
