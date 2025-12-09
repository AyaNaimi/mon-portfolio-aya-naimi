import { type NextRequest, NextResponse } from "next/server"
import { verifyJWT, getTokenFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const user = verifyJWT(token)

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    console.log("[v0] Token verified for user:", user.username)
    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    console.error("[v0] Token verification error:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
