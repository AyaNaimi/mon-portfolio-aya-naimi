import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// 🟢 GET – Liste des certificats
export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issue_date", { ascending: false }) // ✅ cohérent avec ton modèle (issue_date)

  if (error) {
    console.error("Erreur GET /api/certificates:", error.message)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // ✅ Toujours renvoyer un tableau
  return NextResponse.json(Array.isArray(data) ? data : [])
}

// 🟡 POST – Créer un certificat
export async function POST(req: Request) {
  const supabase = await createClient()
  const body = await req.json()

  if (!body || !body.title) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 })
  }

  const { data, error } = await supabase.from("certificates").insert([body]).select()

  if (error) {
    console.error("Erreur POST /api/certificates:", error.message)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

// 🔵 PUT – Mettre à jour un certificat
export async function PUT(req: Request) {
  const supabase = await createClient()
  const body = await req.json()

  if (!body?.id) {
    return NextResponse.json({ error: "ID manquant pour la mise à jour." }, { status: 400 })
  }

  const { data, error } = await supabase.from("certificates").update(body).eq("id", body.id).select()

  if (error) {
    console.error("Erreur PUT /api/certificates:", error.message)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

// 🔴 DELETE – Supprimer un certificat
export async function DELETE(req: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID manquant pour la suppression." }, { status: 400 })
  }

  const { error } = await supabase.from("certificates").delete().eq("id", id)

  if (error) {
    console.error("Erreur DELETE /api/certificates:", error.message)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
