import { createClient as createServerClient } from "@/lib/supabase/server"

export async function authenticateAdmin(username: string, password: string) {
  try {
    const supabase = await createServerClient()

    // Check if username exists in admin_users table
    const { data: adminUser, error: userError } = await supabase
      .from("admin_users")
      .select("id, username, email, role")
      .eq("username", username)
      .single()

    if (userError || !adminUser) {
      console.log("[v0] Admin user not found:", username)
      return null
    }

    // Use Supabase Auth for actual password verification
    const { data, error } = await supabase.auth.signInWithPassword({
      email: adminUser.email,
      password,
    })

    if (error || !data?.session) {
      console.log("[v0] Auth failed for admin:", username, error?.message)
      return null
    }

    console.log("[v0] Admin authenticated successfully:", username)

    return {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role,
      session: data.session,
    }
  } catch (error) {
    console.error("[v0] Error authenticating admin:", error)
    return null
  }
}

export async function verifyAdminSession(token: string) {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data?.user) {
      console.log("[v0] Invalid session token")
      return null
    }

    // Get admin details
    const { data: adminUser, error: userError } = await supabase
      .from("admin_users")
      .select("id, username, email, role")
      .eq("email", data.user.email)
      .single()

    if (userError || !adminUser) {
      console.log("[v0] Admin user not found in database")
      return null
    }

    return {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role,
    }
  } catch (error) {
    console.error("[v0] Error verifying session:", error)
    return null
  }
}
