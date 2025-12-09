"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X, Loader, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Certificate {
  issuer: string | undefined;
  image: string | undefined;
  issue_date: string | undefined;
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  certificate_url?: string;
  organization?: string; // front-end mapping vers issuer
  date?: string; // front-end mapping vers issue_date
}

export function CertificatesManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: "",
    organization: "",
    date: "",
    image_url: "",
    description: "",
    certificate_url: "",
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/certificates");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: Certificate[] = await response.json();

      // Mapping DB -> front
      const mapped = data.map((c) => ({
        ...c,
        organization: c.organization || c.organization || c.issuer,
        date: c.date || c.date || c.issue_date,
        image_url: c.image_url || c.image,
      }));

      setCertificates(mapped);
    } catch (error) {
      console.error("Erreur fetch certificates:", error);
      toast({ title: "Erreur", description: "Échec du chargement des certificats.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((prev) => ({ ...prev, image_url: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.organization || !formData.date) {
      toast({ title: "Erreur", description: "Titre, organisation et date sont obligatoires.", variant: "destructive" });
      return;
    }

    try {
      setIsLoading(true);

      const payload: any = {
        title: formData.title,
        description: formData.description || "",
        image_url: formData.image_url || "",
        issuer: formData.organization,
        issue_date: formData.date,
        certificate_url: formData.certificate_url || null,
      };

      if (editingCertificate) payload.id = editingCertificate.id;

      const response = await fetch("/api/certificates", {
        method: editingCertificate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error || `HTTP error! status: ${response.status}`);
      }

      toast({ title: "Succès", description: `Certificat ${editingCertificate ? "mis à jour" : "créé"} avec succès.` });
      resetForm();
      await fetchCertificates();
    } catch (error: any) {
      console.error("Erreur handleSubmit:", error);
      toast({ title: "Erreur", description: `Échec de l'enregistrement : ${error.message}`, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (cert: Certificate) => {
    setEditingCertificate(cert);
    setFormData({
      title: cert.title,
      organization: cert.organization,
      date: cert.date,
      image_url: cert.image_url,
      description: cert.description,
      certificate_url: cert.certificate_url,
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce certificat ?")) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/certificates?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      toast({ title: "Certificat supprimé", description: "Le certificat a été supprimé avec succès." });
      await fetchCertificates();
    } catch (error) {
      console.error("Erreur handleDelete:", error);
      toast({ title: "Erreur", description: "Échec de la suppression du certificat.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditingCertificate(null);
    setIsCreating(false);
    setFormData({ title: "", organization: "", date: "", image_url: "", description: "", certificate_url: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-heading">Gestion des certificats</h1>
          <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez vos certificats</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gradient-violet-cyan text-white" disabled={isLoading}>
          <Plus className="h-4 w-4 mr-2" /> Nouveau certificat
        </Button>
      </div>

      {isCreating && (
        <Card className="glass p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">{editingCertificate ? "Modifier le certificat" : "Nouveau certificat"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm} disabled={isLoading}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <Input name="title" value={formData.title} onChange={handleInputChange} required className="glass" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Organisation</label>
                <Input name="organization" value={formData.organization} onChange={handleInputChange} required className="glass" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input name="date" type="date" value={formData.date} onChange={handleInputChange} required className="glass" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <Input type="file" accept="image/*" onChange={handleFileChange} className="glass" />
                {formData.image_url && (
                  <div className="mt-2 relative w-32 h-32 overflow-hidden rounded-md">
                    <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="glass" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Lien du certificat</label>
              <Input name="certificate_url" value={formData.certificate_url} onChange={handleInputChange} className="glass" placeholder="https://exemple.com/certificat" />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="gradient-violet-cyan text-white" disabled={isLoading}>
                {isLoading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                {editingCertificate ? "Mettre à jour" : "Créer"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm} className="glass bg-transparent" disabled={isLoading}>
                Annuler
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && certificates.length === 0 ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          certificates.map((cert) => (
            <Card key={cert.id} className="glass overflow-hidden">
              <div className="relative">
                <Image src={cert.image_url || "/placeholder.svg"} alt={cert.title} width={400} height={200} className="w-full h-48 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.organization}</p>
                <p className="text-xs text-muted-foreground mb-2">{cert.date}</p>
                <p className="text-sm mb-3 line-clamp-2">{cert.description}</p>
                <div className="flex justify-between items-center">
                  <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-500" onClick={() => handleEdit(cert)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500" onClick={() => handleDelete(cert.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
