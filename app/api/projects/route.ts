import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server" // assure-toi que ce chemin est correct

// ✅ GET – Récupérer tous les projets
export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    console.error("❌ [GET /api/projects] Erreur :", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// ✅ POST – Ajouter un projet
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { title, description, image, technologies, category, demo_url, github_url, featured } = body

    const { data, error } = await supabase.from("projects").insert([
      {
        title,
        description,
        image,
        technologies,
        category,
        demo_url,
        github_url,
        featured,
      },
    ])

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error("❌ [POST /api/projects] Erreur :", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// ✅ PUT – Modifier un projet
export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 })
    }

    const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select()

    if (error) throw error
    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    console.error("❌ [PUT /api/projects] Erreur :", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// ✅ DELETE – Supprimer un projet
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 })
    }

    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true, message: "Projet supprimé avec succès" }, { status: 200 })
  } catch (error: any) {
    console.error("❌ [DELETE /api/projects] Erreur :", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
