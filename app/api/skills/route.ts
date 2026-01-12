import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

interface Skill {
  id: string
  name: string
  category: string
  level: number
  order: number
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: skills, error } = await supabase.from("skills").select("*").order("order", { ascending: true })

    if (error) {
      console.error("[v0] Supabase error:", error)
      throw error
    }

    if (!skills) {
      console.log("[v0] No skills found, returning empty array")
      return NextResponse.json([])
    }

    return NextResponse.json(skills)
  } catch (error) {
    console.error("[v0] Error fetching skills:", error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { name, category, level, order } = body

    if (!name || !category) {
      return NextResponse.json({ error: "Name and category are required" }, { status: 400 })
    }

    const { data: skill, error } = await supabase
      .from("skills")
      .insert([
        {
          name,
          category,
          level: level || 3,
          order: order || 0,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating skill:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { id, name, category, level, order } = body

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 })
    }

    const { data: skill, error } = await supabase
      .from("skills")
      .update({
        name,
        category,
        level,
        order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(skill)
  } catch (error) {
    console.error("[v0] Error updating skill:", error)
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 })
    }

    const { error } = await supabase.from("skills").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Skill deleted" })
  } catch (error) {
    console.error("[v0] Error deleting skill:", error)
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 })
  }
}
