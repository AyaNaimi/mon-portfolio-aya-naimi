import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

interface JWTPayload {
  username: string
  role: string
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    const crypto = require("crypto")
    const parts = token.split(".")

    if (parts.length !== 3) {
      console.log("[v0] Invalid JWT format")
      return null
    }

    const [headerB64, payloadB64, signatureB64] = parts
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${headerB64}.${payloadB64}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")

    if (signatureB64 !== expectedSignature) {
      console.log("[v0] JWT signature verification failed")
      return null
    }

    const payload = JSON.parse(Buffer.from(payloadB64, "base64").toString("utf-8"))

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      console.log("[v0] JWT token expired")
      return null
    }

    return { username: payload.username, role: payload.role || "admin" }
  } catch (error) {
    console.error("[v0] JWT verification error:", error)
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return null
  }
  return authHeader.slice(7)
}
