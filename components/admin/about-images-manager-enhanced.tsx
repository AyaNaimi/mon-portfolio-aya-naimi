"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { AboutImagesGallery } from "@/components/about-images-gallery"
import { 
  Upload, 
  Trash2, 
  Image, 
  User, 
  Camera, 
  RefreshCw,
  Download,
  Grid3X3,
  Settings,
  Info
} from "lucide-react"

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

export function AboutImagesManagerEnhanced() {
  const [currentImage, setCurrentImage] = useState<AboutImage | null>(null)
  const [allImages, setAllImages] = useState<AboutImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("manage")
  
  // Image manipulation states
  const [brightness, setBrightness] = useState([100])
  const [contrast, setContrast] = useState([100])
  const [saturation, setSaturation] = useState([100])
  const [blur, setBlur] = useState([0])
  const [rotation, setRotation] = useState([0])
  const [zoom, setZoom] = useState([100])
  
  // Filter preset
  const [filterPreset, setFilterPreset] = useState<string>("none")
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadCurrentImage()
    loadAllImages()
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

  const loadAllImages = async () => {
    try {
      const response = await fetch('/api/about-images/all')
      const data = await response.json()
      
      if (data.success && data.data) {
        setAllImages(data.data)
      }
    } catch (error) {
      console.error('Error loading all images:', error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Normalize and validate file type
    let normalizedMimeType = file.type.toLowerCase()
    if (normalizedMimeType === 'image/jpg') {
      normalizedMimeType = 'image/jpeg'
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(normalizedMimeType)) {
      toast({
        title: "Type de fichier invalide",
        description: `Type détecté: ${file.type}. Seuls les fichiers JPG, PNG et WebP sont acceptés`,
        variant: "destructive",
      })
      return
    }

    // Validate file size (5MB for manipulation)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "La taille du fichier ne doit pas dépasser 5MB",
        variant: "destructive",
      })
      return
    }

    // Create a new file with normalized MIME type
    const normalizedFile = new File([file], file.name, { type: normalizedMimeType })
    setSelectedFile(normalizedFile)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    resetManipulationSettings()
  }

  const resetManipulationSettings = () => {
    setBrightness([100])
    setContrast([100])
    setSaturation([100])
    setBlur([0])
    setRotation([0])
    setZoom([100])
    setFilterPreset("none")
  }

  const applyFilterPreset = (preset: string) => {
    setFilterPreset(preset)
    switch (preset) {
      case "vintage":
        setBrightness([110])
        setContrast([120])
        setSaturation([80])
        setBlur([0])
        break
      case "bw":
        setBrightness([100])
        setContrast([110])
        setSaturation([0])
        break
      case "warm":
        setBrightness([105])
        setContrast([100])
        setSaturation([110])
        break
      case "cool":
        setBrightness([100])
        setContrast([105])
        setSaturation([90])
        break
      case "vibrant":
        setBrightness([100])
        setContrast([115])
        setSaturation([130])
        break
      default:
        resetManipulationSettings()
    }
  }

  const processImage = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    try {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) return

      const img = new window.Image()
      img.onload = () => {
        // Set canvas size
        canvas.width = img.width
        canvas.height = img.height

        // Apply transformations
        ctx.save()
        
        // Move to center for rotation
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((rotation[0] * Math.PI) / 180)
        ctx.scale(zoom[0] / 100, zoom[0] / 100)
        ctx.translate(-canvas.width / 2, -canvas.height / 2)

        // Apply filters
        ctx.filter = `
          brightness(${brightness[0]}%) 
          contrast(${contrast[0]}%) 
          saturate(${saturation[0]}%) 
          blur(${blur[0]}px)
        `

        // Draw image
        ctx.drawImage(img, 0, 0)

        ctx.restore()

        // Convert to blob and upload
        canvas.toBlob(async (blob) => {
          if (blob) {
            // Ensure we maintain the original file extension and MIME type
            const fileName = selectedFile.name
            const mimeType = selectedFile.type
            
            console.log('Processing file:', {
              originalType: mimeType,
              blobType: blob.type,
              fileName: fileName,
              blobSize: blob.size
            })
            
            const processedFile = new File([blob], fileName, {
              type: mimeType
            })
            
            console.log('Processed file:', {
              type: processedFile.type,
              size: processedFile.size,
              name: processedFile.name
            })
            
            await handleImageUpload(processedFile)
          }
        }, selectedFile.type === 'image/jpeg' ? 'image/jpeg' : selectedFile.type, 0.9)
      }
      img.src = previewUrl!
    } catch (error) {
      console.error('Error processing image:', error)
      toast({
        title: "Erreur de traitement",
        description: "Impossible de traiter l'image",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true)
      
      // Get the current session token from Supabase
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        // Try to get from localStorage as fallback
        const savedUser = localStorage.getItem('adminUser')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          if (userData.session?.access_token) {
            // Use the stored session token
            return await uploadWithToken(file, userData.session.access_token)
          }
        }
        
        toast({
          title: "Erreur d'authentification",
          description: "Veuillez vous connecter pour télécharger des images",
          variant: "destructive",
        })
        return
      }

      await uploadWithToken(file, session.access_token)
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: "Erreur d'upload",
        description: error instanceof Error ? error.message : "Impossible de télécharger l'image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setIsProcessing(false)
    }
  }

  const uploadWithToken = async (file: File, token: string) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/about-images', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })

    const data = await response.json()
    console.log('Upload response:', data)

    if (data.success) {
      setCurrentImage(data.data)
      setSelectedFile(null)
      setPreviewUrl(null)
      await loadAllImages()
      toast({
        title: "Succès",
        description: "Image de profil mise à jour avec succès",
      })
    } else {
      console.error('Upload failed:', data.error)
      throw new Error(data.error || 'Upload failed')
    }
  }

  const handleDeleteImage = async () => {
    if (!currentImage) return

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      return
    }

    try {
      setIsDeleting(true)
      
      // Get the current session token from Supabase
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        // Try to get from localStorage as fallback
        const savedUser = localStorage.getItem('adminUser')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          if (userData.session?.access_token) {
            // Use the stored session token
            return await deleteWithToken(userData.session.access_token)
          }
        }
        
        toast({
          title: "Erreur d'authentification",
          description: "Veuillez vous connecter pour supprimer des images",
          variant: "destructive",
        })
        return
      }

      await deleteWithToken(session.access_token)
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

  const deleteWithToken = async (token: string) => {
    const response = await fetch('/api/about-images', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })

    const data = await response.json()

    if (data.success) {
      setCurrentImage(null)
      await loadAllImages()
      toast({
        title: "Succès",
        description: "Image supprimée avec succès",
      })
    } else {
      throw new Error(data.error || 'Delete failed')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleImageActivate = async (imageId: string) => {
    try {
      const response = await fetch('/api/about-images/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      })

      const data = await response.json()

      if (data.success) {
        setCurrentImage(data.data)
        await loadAllImages()
        toast({
          title: "Image activée",
          description: "Cette image est maintenant votre image de profil active",
        })
      } else {
        throw new Error(data.error || 'Activation failed')
      }
    } catch (error) {
      console.error('Error activating image:', error)
      toast({
        title: "Erreur d'activation",
        description: error instanceof Error ? error.message : "Impossible d'activer l'image",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Gestionnaire d'Images de Profil Avancé
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
          Gestionnaire d'Images de Profil
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Gestion
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Galerie
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          {/* Gestion Tab */}
          <TabsContent value="manage" className="space-y-6">
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
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-base font-medium">Galerie d'images</Label>
                {allImages.length > 0 && (
                  <Badge variant="secondary">
                    {allImages.length} image{allImages.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              <AboutImagesGallery 
                onImageSelect={(image) => {
                  setCurrentImage(image)
                  toast({
                    title: "Image sélectionnée",
                    description: `Vous utilisez maintenant: ${image.original_filename}`,
                  })
                }}
                onImageActivate={handleImageActivate}
                selectedImageId={currentImage?.id}
                maxDisplay={12}
              />
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">
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
                <p>Taille maximale: 5MB</p>
                <p>Ratio recommandé: 1:1 (carré)</p>
              </div>
            </div>

            {/* Image Preview and Manipulation */}
            {previewUrl && (
              <div className="space-y-6 border-t pt-6">
                <Label className="text-base font-medium">Aperçu et Manipulation</Label>
                
                {/* Preview */}
                <div className="relative w-full max-w-md mx-auto">
                  <img
                    src={previewUrl}
                    alt="Aperçu"
                    className="w-full h-64 object-cover rounded-lg border"
                    ref={imageRef}
                  />
                </div>

                {/* Filter Presets */}
                <div className="space-y-4">
                  <Label>Filtres prédéfinis</Label>
                  <Select value={filterPreset} onValueChange={applyFilterPreset}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un filtre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucun filtre</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="bw">Noir & Blanc</SelectItem>
                      <SelectItem value="warm">Chaud</SelectItem>
                      <SelectItem value="cool">Froid</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Manual Adjustments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Luminosité: {brightness[0]}%</Label>
                      <Slider
                        value={brightness}
                        onValueChange={setBrightness}
                        min={0}
                        max={200}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">Contraste: {contrast[0]}%</Label>
                      <Slider
                        value={contrast}
                        onValueChange={setContrast}
                        min={0}
                        max={200}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Saturation: {saturation[0]}%</Label>
                      <Slider
                        value={saturation}
                        onValueChange={setSaturation}
                        min={0}
                        max={200}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm">Flou: {blur[0]}px</Label>
                      <Slider
                        value={blur}
                        onValueChange={setBlur}
                        min={0}
                        max={10}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm">Rotation: {rotation[0]}°</Label>
                    <Slider
                      value={rotation}
                      onValueChange={setRotation}
                      min={-180}
                      max={180}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm">Zoom: {zoom[0]}%</Label>
                    <Slider
                      value={zoom}
                      onValueChange={setZoom}
                      min={50}
                      max={200}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={resetManipulationSettings}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                  
                  <Button
                    onClick={processImage}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    {isProcessing ? 'Traitement...' : 'Appliquer et Télécharger'}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Canvas for image processing (hidden) */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Info */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Fonctionnalités avancées
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Gestion complète des images de profil</li>
            <li>• Galerie avec aperçus et sélection</li>
            <li>• Filtres prédéfinis et ajustements manuels</li>
            <li>• Aperçu en temps réel des modifications</li>
            <li>• Traitement côté client pour la confidentialité</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}