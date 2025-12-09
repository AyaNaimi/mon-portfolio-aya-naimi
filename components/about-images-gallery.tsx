"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Eye, EyeOff, Trash2, Zap } from "lucide-react"

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

interface AboutImagesGalleryProps {
  onImageSelect?: (image: AboutImage) => void
  onImageActivate?: (imageId: string) => void
  selectedImageId?: string
  showActions?: boolean
  maxDisplay?: number
  allowActivation?: boolean
}

export function AboutImagesGallery({ 
  onImageSelect, 
  onImageActivate,
  selectedImageId,
  showActions = true,
  maxDisplay = 8,
  allowActivation = true
}: AboutImagesGalleryProps) {
  const [images, setImages] = useState<AboutImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(maxDisplay)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/about-images/all')
      const data = await response.json()
      
      if (data.success && data.data) {
        // Sort by upload date, most recent first
        const sortedImages = data.data.sort((a: AboutImage, b: AboutImage) => 
          new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
        )
        setImages(sortedImages)
      }
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageClick = (image: AboutImage) => {
    if (onImageSelect) {
      onImageSelect(image)
    }
  }

  const handleActivateImage = async (imageId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (!allowActivation || !onImageActivate) return
    
    try {
      await onImageActivate(imageId)
    } catch (error) {
      console.error('Error activating image:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const displayImages = images.slice(0, visibleCount)
  const hasMore = images.length > visibleCount

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: maxDisplay }).map((_, index) => (
          <Card key={index} className="aspect-square bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aucune image de profil trouvée</p>
          <p className="text-sm">Les images que vous téléchargerez apparaîtront ici</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayImages.map((image, index) => (
          <Card
            key={image.id}
            className={`
              group relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105
              ${selectedImageId === image.id ? 'ring-2 ring-primary ring-offset-2' : ''}
              ${image.is_active ? 'ring-2 ring-green-500' : ''}
            `}
            onClick={() => handleImageClick(image)}
          >
            <CardContent className="p-0 h-full">
              <img
                src={image.public_url}
                alt={image.original_filename}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white space-y-2">
                  {selectedImageId === image.id && (
                    <div className="mb-2">
                      <Check className="w-6 h-6 mx-auto text-green-400" />
                    </div>
                  )}
                  {image.is_active ? (
                    <Badge className="bg-green-500/80 text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  ) : allowActivation && (
                    <Button
                      size="sm"
                      onClick={(e) => handleActivateImage(image.id, e)}
                      className="bg-primary/80 hover:bg-primary text-white"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Activer
                    </Button>
                  )}
                </div>
              </div>

              {/* Active indicator */}
              {image.is_active && (
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500 text-white rounded-full p-1">
                    <Crown className="w-3 h-3" />
                  </div>
                </div>
              )}

              {/* Selected indicator */}
              {selectedImageId === image.id && (
                <div className="absolute top-2 left-2">
                  <div className="bg-primary text-white rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show more button */}
      {hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount(prev => prev + maxDisplay)}
            className="bg-muted/50"
          >
            <Eye className="w-4 h-4 mr-2" />
            Voir plus ({images.length - visibleCount} restantes)
          </Button>
        </div>
      )}

      {/* Image details summary */}
      {images.length > 0 && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{images.length} image{images.length > 1 ? 's' : ''} au total</span>
            <span>
              {formatFileSize(images.reduce((total, img) => total + img.file_size, 0))} utilisés
            </span>
          </div>
        </div>
      )}
    </div>
  )
}