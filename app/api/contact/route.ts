import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  phone?: string
  created_at: string
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const newMessage = await request.json()

    const { data: message, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: newMessage.name,
          email: newMessage.email,
          subject: newMessage.subject,
          message: newMessage.message,
          phone: newMessage.phone,
          read: false,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error("[v0] Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: messages, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(messages || [])
  } catch (error) {
    console.error("[v0] Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 })
    }

    const { data: message, error } = await supabase
      .from("contact_messages")
      .update({ read: body.read })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(message)
  } catch (error) {
    console.error("[v0] Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 })
    }

    const { error } = await supabase.from("contact_messages").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Message deleted" })
  } catch (error) {
    console.error("[v0] Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
