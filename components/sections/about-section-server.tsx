import { createClient } from "@/lib/supabase/server"
import { AboutClient } from "@/components/about-client"

interface AboutImage {
  id: string
  filename: string
  original_filename: string
  file_size: number
  file_type: string
  storage_path?: string
  public_url?: string
  is_active: boolean
  uploaded_at: string
}

export async function AboutSectionServer() {
  try {
    const supabase = await createClient()

    const { data: aboutInfo } = await supabase.from("about_info").select("*").single()

    const { data: timeline } = await supabase.from("timeline").select("*").order("order", { ascending: true })

    const { data: profileImage } = await supabase
      .from('about_images')
      .select('*')
      .eq('is_active', true)
      .single()

    return <AboutClient aboutInfo={aboutInfo} timeline={timeline || []} profileImage={profileImage || null} />
  } catch (error) {
    console.error("[AboutSectionServer] Error fetching data:", error)
    // Return component with null data - client component will use fallbacks
    return <AboutClient aboutInfo={null} timeline={[]} profileImage={null} />
  }
}
