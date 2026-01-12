import { type NextRequest, NextResponse } from "next/server"
import { authenticateAdmin } from "@/lib/supabase/admin-auth"

const RATE_LIMIT_ATTEMPTS = 5
const RATE_LIMIT_WINDOW = 15 * 60 * 1000

const loginAttempts = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const attempt = loginAttempts.get(ip)

  if (!attempt || now > attempt.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (attempt.count >= RATE_LIMIT_ATTEMPTS) {
    return false
  }

  attempt.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    if (!checkRateLimit(ip)) {
      console.log("[v0] Rate limit exceeded for IP:", ip)
      return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 })
    }

    const body = await request.json()
    const { username, password } = body

    console.log("[v0] Login attempt for:", username)

    // Authenticate admin and get session
    const result = await authenticateAdmin(username, password)

    if (!result) {
      console.log("[v0] Authentication failed for:", username)
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    console.log("[v0] Login successful for:", username)

    return NextResponse.json({
      success: true,
      user: {
        id: result.id,
        username: result.username,
        email: result.email,
        role: result.role,
      },
      session: result.session,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
