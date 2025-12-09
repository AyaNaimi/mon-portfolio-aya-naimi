"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { CVPreview } from "@/components/ui/cv-preview"
import {
  Upload,
  Download,
  Trash2,
  Eye,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react"

interface CVFile {
  id: string
  filename: string
  original_filename: string
  file_size: number
  file_type: string
  uploaded_at: string
  is_active: boolean
  storage_path?: string
}

export function CVManager() {
  const [cvFiles, setCvFiles] = useState<CVFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const loadCVFiles = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("cv_files")
        .select("*")
        .order("uploaded_at", { ascending: false })

      if (error) {
        console.error("Error loading CV files:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les fichiers CV",
          variant: "destructive",
        })
        return
      }

      setCvFiles(data || [])
    } catch (error) {
      console.error("Error loading CV files:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des fichiers",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCVFiles()
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Type de fichier non supporté",
          description: "Veuillez sélectionner un fichier PDF ou DOC",
          variant: "destructive",
        })
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale autorisée est de 5MB",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)
    }
  }

  const uploadCV = async () => {
    if (!selectedFile) {
      toast({
        title: "Aucun fichier sélectionné",
        description: "Veuillez sélectionner un fichier CV",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)

      // First, upload file to Supabase Storage
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `cv/${fileName}`

      const { data: storageData, error: storageError } = await supabase.storage
        .from("portfolio-storage")
        .upload(filePath, selectedFile)

      if (storageError) {
        throw storageError
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("portfolio-storage")
        .getPublicUrl(filePath)

      // Insert CV record into database
      const { data: cvData, error: dbError } = await supabase
        .from("cv_files")
        .insert({
          filename: fileName,
          original_filename: selectedFile.name,
          file_size: selectedFile.size,
          file_type: selectedFile.type,
          storage_path: filePath,
          public_url: urlData.publicUrl,
          is_active: cvFiles.length === 0, // First CV is active by default
        })
        .select()
        .single()

      if (dbError) {
        // If DB insert fails, try to delete uploaded file
        await supabase.storage.from("portfolio-storage").remove([filePath])
        throw dbError
      }

      setCvFiles([cvData, ...cvFiles])
      setSelectedFile(null)
      
      // Reset file input
      const fileInput = document.getElementById('cv-file-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''

      toast({
        title: "CV téléchargé avec succès",
        description: `${selectedFile.name} a été ajouté à votre collection`,
      })

    } catch (error) {
      console.error("Error uploading CV:", error)
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger le fichier CV",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const setActiveCV = async (cvId: string) => {
    try {
      const response = await fetch('/api/cv/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cvId }),
      })

      if (!response.ok) {
        throw new Error('Failed to activate CV')
      }

      const result = await response.json()
      
      // Update local state
      setCvFiles(cvFiles.map(cv => ({
        ...cv,
        is_active: cv.id === cvId
      })))

      toast({
        title: "CV activé",
        description: "Le CV a été défini comme actif",
      })

    } catch (error) {
      console.error("Error setting active CV:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'activer le CV",
        variant: "destructive",
      })
    }
  }

  const deleteCV = async (cvId: string, storagePath: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce CV ?")) {
      return
    }

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("portfolio-storage")
        .remove([storagePath])

      if (storageError) {
        console.warn("Storage deletion warning:", storageError)
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from("cv_files")
        .delete()
        .eq("id", cvId)

      if (dbError) {
        throw dbError
      }

      setCvFiles(cvFiles.filter(cv => cv.id !== cvId))

      // If we deleted the active CV and there are other CVs, make the first one active
      const activeCV = cvFiles.find(cv => cv.id === cvId && cv.is_active)
      if (activeCV && cvFiles.length > 1) {
        const remainingCVs = cvFiles.filter(cv => cv.id !== cvId)
        if (remainingCVs.length > 0) {
          await setActiveCV(remainingCVs[0].id)
        }
      }

      toast({
        title: "CV supprimé",
        description: "Le CV a été supprimé avec succès",
      })

    } catch (error) {
      console.error("Error deleting CV:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le CV",
        variant: "destructive",
      })
    }
  }

  const downloadCV = async (cv: CVFile) => {
    try {
      const { data, error } = await supabase.storage
        .from("portfolio-storage")
        .download(cv.storage_path || '')

      if (error) {
        throw error
      }

      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = cv.original_filename
      a.click()
      URL.revokeObjectURL(url)

      toast({
        title: "Téléchargement commencé",
        description: `${cv.original_filename} est en cours de téléchargement`,
      })

    } catch (error) {
      console.error("Error downloading CV:", error)
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger le CV",
        variant: "destructive",
      })
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
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span className="ml-2">Chargement des fichiers CV...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Gestion des CV</h2>
        <p className="text-muted-foreground">
          Gérez vos fichiers CV, téléchargez de nouveaux documents et définissez le CV actif
        </p>
      </div>

      {/* Upload Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Télécharger un nouveau CV
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <Input
                id="cv-file-input"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Formats acceptés: PDF, DOC, DOCX (max 5MB)
              </p>
            </div>
            
            <Button 
              onClick={uploadCV}
              disabled={!selectedFile || isUploading}
              className="whitespace-nowrap"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Télécharger
                </>
              )}
            </Button>
          </div>

          {selectedFile && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">Fichier sélectionné:</p>
              <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            </div>
          )}
        </div>
      </Card>

      {/* CV Files List */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Fichiers CV ({cvFiles.length})
          </h3>

          {cvFiles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucun fichier CV téléchargé</p>
              <p className="text-sm">Commencez par télécharger votre premier CV</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cvFiles.map((cv) => (
                <div key={cv.id} className="relative">
                  <CVPreview 
                    cvFile={cv} 
                    variant="compact"
                    showActions={false}
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadCV(cv)}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    {!cv.is_active && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveCV(cv.id)}
                        className="h-8 w-8 p-0"
                        title="Définir comme actif"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCV(cv.id, cv.storage_path || '')}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}