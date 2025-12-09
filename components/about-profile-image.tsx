"use client"

import { useEffect, useState } from "react"
import { User } from "lucide-react"

interface AboutImage {
  id: string
  filename: string
  original_filename: string
  file_size: number
  file_type: string
  storage_path?: string
  public_url?: string
  is_active: boolean
  uploaded_at: string
}

interface AboutProfileImageProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  showBorder?: boolean
  fallbackClassName?: string
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
  xl: "w-48 h-48"
}

export function AboutProfileImage({ 
  className = "", 
  size = "lg", 
  showBorder = true,
  fallbackClassName = ""
}: AboutProfileImageProps) {
  const [image, setImage] = useState<AboutImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    loadProfileImage()
  }, [])

  const loadProfileImage = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/about-images')
      const data = await response.json()
      
      if (data.success && data.data) {
        setImage(data.data)
      } else {
        setImage(null)
      }
    } catch (error) {
      console.error('Error loading profile image:', error)
      setImage(null)
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClass = sizeClasses[size]
  const borderClass = showBorder ? "border-2 border-border" : ""

  if (isLoading) {
    return (
      <div className={`${sizeClass} ${borderClass} rounded-lg overflow-hidden bg-muted animate-pulse ${className}`} />
    )
  }

  if (!image || imageError) {
    return (
      <div className={`${sizeClass} ${borderClass} rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center ${className} ${fallbackClassName}`}>
        <User className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : 'w-24 h-24'} text-muted-foreground`} />
      </div>
    )
  }

  return (
    <div className={`${sizeClass} ${borderClass} rounded-lg overflow-hidden ${className}`}>
      <img
        src={image.public_url}
        alt="Image de profil"
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  )
}