"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, ExternalLink, Eye, Calendar, HardDrive } from "lucide-react"

interface CVFile {
  id: string
  filename: string
  original_filename: string
  file_size: number
  file_type: string
  uploaded_at: string
  is_active: boolean
  storage_path?: string
  public_url?: string
}

interface CVPreviewProps {
  cvFile: CVFile
  variant?: "default" | "compact" | "minimal"
  showActions?: boolean
}

export function CVPreview({ cvFile, variant = "default", showActions = true }: CVPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = () => {
    switch (cvFile.file_type) {
      case 'application/pdf':
        return '📄'
      case 'application/msword':
        return '📝'
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return '📄'
      default:
        return '📎'
    }
  }

  const handlePreview = async () => {
    setIsLoading(true)
    try {
      // For demo purposes, we'll show file info instead of actual preview
      // In a real implementation, you could use PDF.js or similar for PDF preview
      setPreviewUrl(cvFile.public_url || '')
    } catch (error) {
      console.error('Error loading preview:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/cv/${cvFile.id}`)
      if (!response.ok) {
        throw new Error('Failed to download CV')
      }
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = cvFile.original_filename
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
        <span className="text-xl">{getFileIcon()}</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{cvFile.original_filename}</p>
          <p className="text-sm text-muted-foreground">{formatFileSize(cvFile.file_size)}</p>
        </div>
        {showActions && (
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getFileIcon()}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{cvFile.original_filename}</h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(cvFile.uploaded_at).toLocaleDateString('fr-FR')}
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3" />
                {formatFileSize(cvFile.file_size)}
              </span>
            </div>
          </div>
          {showActions && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-1" />
                Aperçu
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Télécharger
              </Button>
            </div>
          )}
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{getFileIcon()}</div>
            <div>
              <h3 className="text-lg font-semibold">{cvFile.original_filename}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {cvFile.file_type.split('/')[1].toUpperCase()}
                </Badge>
                {cvFile.is_active && (
                  <Badge variant="default" className="text-xs">
                    Actif
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Téléchargé le {new Date(cvFile.uploaded_at).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HardDrive className="h-4 w-4" />
            <span>Taille du fichier: {formatFileSize(cvFile.file_size)}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex gap-3">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={handlePreview} disabled={isLoading}>
                  <Eye className="h-4 w-4 mr-2" />
                  {isLoading ? "Chargement..." : "Aperçu"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Aperçu - {cvFile.original_filename}</DialogTitle>
                </DialogHeader>
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  {isLoading ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Chargement de l'aperçu...</p>
                    </div>
                  ) : previewUrl ? (
                    <div className="text-center space-y-4">
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">
                        L'aperçu du CV s'ouvrira dans un nouvel onglet
                      </p>
                      <Button onClick={() => window.open(previewUrl, '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ouvrir dans un nouvel onglet
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Aperçu non disponible pour ce type de fichier
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Les aperçus sont disponibles pour les fichiers PDF
                      </p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Télécharger le CV
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}