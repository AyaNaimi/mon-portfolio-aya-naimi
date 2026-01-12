import { createClient } from "@/lib/supabase/server"
import { AboutClient } from "@/components/about-client"

export async function AboutSectionServer() {
  try {
    const supabase = await createClient()

    const { data: aboutInfo } = await supabase.from("about_info").select("*").single()

    const { data: timeline } = await supabase.from("timeline").select("*").order("order", { ascending: true })

    return <AboutClient aboutInfo={aboutInfo} timeline={timeline || []} />
  } catch (error) {
    console.error("[AboutSectionServer] Error fetching data:", error)
    // Return component with null data - client component will use fallbacks
    return <AboutClient aboutInfo={null} timeline={[]} />
  }
}
