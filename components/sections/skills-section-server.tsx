import { createClient } from "@/lib/supabase/server"
import { SkillsClient } from "@/components/skills-client"

export async function SkillsSectionServer() {
  try {
    const supabase = await createClient()

    const { data: skills, error: skillsError } = await supabase
      .from("skills")
      .select("*")
      .order("order", { ascending: true })

    const { data: allSkills } = await supabase.from("skills").select("*")

    if (skillsError) {
      console.error("[SkillsSectionServer] Error fetching skills:", skillsError)
    }

    // Group skills by category
    const groupedSkills = skills
      ? skills.reduce(
          (acc, skill) => {
            if (!acc[skill.category]) {
              acc[skill.category] = []
            }
            acc[skill.category].push(skill)
            return acc
          },
          {} as Record<string, typeof skills>,
        )
      : {}

    return <SkillsClient skillsData={groupedSkills} />
  } catch (error) {
    console.error("[SkillsSectionServer] Error:", error)
    // Return empty skills data - client component will handle gracefully
    return <SkillsClient skillsData={{}} />
  }
}
