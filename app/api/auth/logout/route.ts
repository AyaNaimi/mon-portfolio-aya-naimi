import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Logout requested")

    const supabase = await createClient()
    await supabase.auth.signOut()

    return NextResponse.json({ success: true, message: "Déconnecté avec succès" })
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json({ error: "Erreur lors de la déconnexion" }, { status: 500 })
  }
}
