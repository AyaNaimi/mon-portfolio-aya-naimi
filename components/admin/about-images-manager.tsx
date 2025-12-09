"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload, Trash2, Image, User, Camera, RefreshCw } from "lucide-react"

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

export function AboutImagesManager() {
  const [currentImage, setCurrentImage] = useState<AboutImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadCurrentImage()
  }, [])

  const loadCurrentImage = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/about-images')
      const data = await response.json()
      
      if (data.success) {
        setCurrentImage(data.data)
      } else {
        console.error('Failed to load image:', data.error)
      }
    } catch (error) {
      console.error('Error loading image:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger l'image actuelle",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Type de fichier invalide",
        description: "Seuls les fichiers JPG, PNG et WebP sont acceptés",
        variant: "destructive",
      })
      return
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 2MB",
        variant: "destructive",
      })
      return
    }

    handleImageUpload(file)
  }

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true)
      
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/about-images', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setCurrentImage(data.data)
        toast({
          title: "Succès",
          description: "Image de profil mise à jour avec succès",
        })
        // Refresh the page to show the new image
        window.location.reload()
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: "Erreur d'upload",
        description: error instanceof Error ? error.message : "Impossible de télécharger l'image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteImage = async () => {
    if (!currentImage) return

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      return
    }

    try {
      setIsDeleting(true)
      
      const response = await fetch('/api/about-images', {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setCurrentImage(null)
        toast({
          title: "Succès",
          description: "Image supprimée avec succès",
        })
        // Refresh the page to show the placeholder
        window.location.reload()
      } else {
        throw new Error(data.error || 'Delete failed')
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      toast({
        title: "Erreur de suppression",
        description: error instanceof Error ? error.message : "Impossible de supprimer l'image",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Gestion des Images de Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="ml-2">Chargement...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Gestion des Images de Profil (Section About)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Image Display */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Image actuelle</Label>
          
          {currentImage ? (
            <div className="space-y-4">
              <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden border-2 border-border">
                <img
                  src={currentImage.public_url}
                  alt="Image de profil actuelle"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  {currentImage.original_filename}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(currentImage.file_size)} • {currentImage.file_type}
                </p>
                <p className="text-xs text-muted-foreground">
                  Téléchargée le {new Date(currentImage.uploaded_at).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteImage}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Supprimer
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucune image de profil</p>
              <p className="text-sm text-muted-foreground">
                L'image par défaut (icône utilisateur) sera affichée
              </p>
            </div>
          )}
        </div>

        {/* Upload Section */}
        <div className="border-t pt-6">
          <Label className="text-base font-medium mb-4 block">
            {currentImage ? 'Remplacer l\'image' : 'Ajouter une image de profil'}
          </Label>
          
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isUploading ? 'Upload en cours...' : 'Sélectionner une image'}
            </Button>
          </div>
          
          <div className="mt-2 text-sm text-muted-foreground">
            <p>Formats acceptés: JPG, PNG, WebP</p>
            <p>Taille maximale: 2MB</p>
            <p>Ratio recommandé: 1:1 (carré)</p>
          </div>
        </div>

        {/* Preview Info */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Image className="h-4 w-4" />
            Aperçu sur le site
          </h4>
          <p className="text-sm text-muted-foreground">
            Cette image sera affichée dans la section "À propos" de votre portfolio,
            dans la carte de profil avec les informations personnelles.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}